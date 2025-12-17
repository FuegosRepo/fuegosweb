import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { sendEmail } from '@/lib/emailService'
import { BudgetData } from '@/lib/types/budget'
import { logger } from '@/lib/logger'

// API para generar presupuesto con IA
export async function POST(request: NextRequest) {
  try {
    const { orderId, contactData, menuType, entrees, viandes, dessert, extras } = await request.json()

    if (!orderId || !contactData) {
      return NextResponse.json(
        { error: 'Order ID y datos de contacto son requeridos' },
        { status: 400 }
      )
    }

    logger.log(`🤖 Generando presupuesto con IA para orden ${orderId}`)

    // Generar presupuesto con IA
    const budgetData = await generateBudgetWithAI({
      contactData,
      menuType,
      entrees,
      viandes,
      dessert,
      extras
    })

    // Guardar presupuesto en la base de datos
    const { data: budget, error: insertError } = await supabase
      .from('budgets')
      .insert([{
        order_id: orderId,
        budget_data: budgetData,
        status: 'pending_review',
        created_at: new Date().toISOString(),
        version: 1
      }])
      .select()
      .single()

    if (insertError) {
      logger.error('Error guardando presupuesto:', insertError)
      return NextResponse.json(
        { error: 'Error al guardar presupuesto', details: insertError.message },
        { status: 500 }
      )
    }

    logger.log('✅ Presupuesto generado y guardado, ID:', budget.id)

    // Actualizar pedido con precio estimado para trazabilidad
    try {
      await supabase
        .from('catering_orders')
        .update({
          estimated_price: (budgetData.totals?.totalTTC ?? null),
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
    } catch (updateErr) {
      logger.warn('⚠️ No se pudo actualizar estimated_price en el pedido:', updateErr as any)
    }

    // Email al admin eliminado por solicitud del usuario (se centraliza en send-order-emails)
    // Anteriormente enviaba "💰 Nouveau Presupuesto Généré"

    return NextResponse.json({
      success: true,
      budget: budget,
      budgetId: budget.id
    })

  } catch (error) {
    logger.error('Error generando presupuesto:', error)
    return NextResponse.json(
      { error: 'Error inesperado al generar presupuesto' },
      { status: 500 }
    )
  }
}

// Función para generar presupuesto con IA
async function generateBudgetWithAI(data: {
  contactData: {
    email: string
    name: string
    phone: string
    eventDate: string
    eventType: string
    address: string
    guestCount: number
  }
  menuType: string | null
  entrees: string[]
  viandes: string[]
  dessert: string | null
  extras: {
    wines: boolean
    equipment: string[]
    decoration: boolean
    specialRequest: string
  }
}): Promise<BudgetData> {
  const { contactData, menuType, entrees, viandes, dessert, extras } = data

  // Precios base por persona según el tipo de menú
  const basePrice = menuType === 'dejeuner' ? 35 : 42
  const guestCount = contactData.guestCount

  // Crear items del menú con formato BudgetMenuItem
  const entreesItems = entrees.map(name => ({
    name,
    quantity: guestCount,
    pricePerUnit: 3, // Precio estimado por entrée
    total: 3 * guestCount
  }))

  const viandesItems = viandes.map(name => ({
    name,
    quantity: guestCount,
    pricePerUnit: 8, // Precio estimado por viande
    total: 8 * guestCount
  }))

  const dessertItem = {
    name: dessert || 'Dessert',
    quantity: guestCount,
    pricePerUnit: 4, // Precio estimado por dessert
    total: 4 * guestCount
  }

  // Calcular precio del menú
  const menuPricePerPerson = basePrice
  const menuTotalHT = menuPricePerPerson * guestCount
  const menuTVA = menuTotalHT * 0.1
  const menuTotalTTC = menuTotalHT + menuTVA

  // Calcular descuento si es déjeuner
  let discount = null
  if (menuType === 'dejeuner') {
    const discountAmount = menuTotalTTC * 0.1
    discount = {
      percentage: 10,
      amount: discountAmount,
      reason: `Événement à midi - 10%`
    }
  }

  // Calcular material si hay
  let material = null
  if (extras.equipment && extras.equipment.length > 0) {
    const materialCostPerPerson = 5
    const materialPricePerUnit = materialCostPerPerson

    // Crear items de material con el formato correcto
    const materialItems = extras.equipment.map(equipmentName => ({
      name: equipmentName,
      quantity: guestCount,
      pricePerUnit: materialPricePerUnit,
      total: materialPricePerUnit * guestCount
    }))

    const materialTotalHT = materialCostPerPerson * guestCount * extras.equipment.length
    const materialTVA = materialTotalHT * 0.2
    const materialTotalTTC = materialTotalHT + materialTVA

    material = {
      items: materialItems,
      totalHT: materialTotalHT,
      tvaPct: 20,
      tva: materialTVA,
      totalTTC: materialTotalTTC
    }
  }

  // Calcular totales finales
  const totalHT = menuTotalHT + (material?.totalHT || 0)
  const totalTVA = menuTVA + (material?.tva || 0)
  let totalTTC = menuTotalTTC + (material?.totalTTC || 0)

  // Aplicar descuento al total
  if (discount) {
    totalTTC = totalTTC - discount.amount
  }

  // Construir el presupuesto
  const budget: BudgetData = {
    generatedAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 días

    clientInfo: {
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      eventDate: contactData.eventDate,
      eventType: contactData.eventType,
      address: contactData.address,
      guestCount: contactData.guestCount,
      menuType: (menuType || 'diner') as 'dejeuner' | 'diner'
    },

    menu: {
      pricePerPerson: menuPricePerPerson,
      totalPersons: guestCount,
      entrees: entreesItems,
      viandes: viandesItems,
      dessert: dessertItem,
      accompagnements: ['Salade', 'Pain', 'Sauces maison'],
      totalHT: menuTotalHT,
      tva: menuTVA,
      tvaPct: 10,
      totalTTC: menuTotalTTC,
      selectedItems: {
        entrees: entrees,
        viandes: viandes,
        desserts: dessert ? [dessert] : []
      }
    },

    material: material || undefined,

    totals: {
      totalHT,
      totalTVA,
      totalTTC,
      discount: discount || undefined
    }
  }

  return budget
}

// Template de email para notificación al admin (SIMPLIFICADO - sin botones)
function getAdminBudgetNotificationEmail(data: {
  budgetId: string
  clientName: string
  eventType: string
  guestCount: number
  totalTTC: number
  adminPanelUrl: string
  budgetData?: BudgetData
}): string {
  const budget = data.budgetData

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouveau Presupuesto - Fuegos d'Azur</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 700px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .email-container {
          background-color: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #d97706;
        }
        .logo {
          font-size: 36px;
          font-weight: bold;
          color: #d97706;
          margin: 0;
        }
        .alert-box {
          background-color: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .info-section {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .highlight-box {
          background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
          color: white;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          margin: 30px 0;
        }
        .amount {
          font-size: 48px;
          font-weight: bold;
          margin: 10px 0;
        }
        .cta-button {
          display: inline-block;
          background-color: #d97706;
          color: white;
          padding: 16px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          margin: 20px 0;
        }
        .section {
          margin: 30px 0;
        }
        .section h2 {
          color: #d97706;
          font-size: 20px;
          margin-bottom: 15px;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1 class="logo">💰 Nouveau Presupuesto Généré</h1>
          <p style="color: #6b7280; margin: 8px 0 0 0;">Système Automatique - Fuegos d'Azur</p>
        </div>
        
        <div class="alert-box">
          <p style="margin: 0; font-weight: 600; color: #92400e;">
            ⚠️ ACTION REQUISE: Nouveau presupuesto à réviser
          </p>
        </div>

        <div class="info-section">
          <h2 style="margin-top: 0; color: #d97706;">👤 Client</h2>
          <div class="info-row">
            <span><strong>Nom:</strong></span>
            <span>${data.clientName}</span>
          </div>
          <div class="info-row">
            <span><strong>Type d'événement:</strong></span>
            <span>${data.eventType}</span>
          </div>
          <div class="info-row">
            <span><strong>Nombre d'invités:</strong></span>
            <span>${data.guestCount} personnes</span>
          </div>
          ${budget?.clientInfo?.eventDate ? `
          <div class="info-row">
            <span><strong>Date:</strong></span>
            <span>${new Date(budget.clientInfo.eventDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          ` : ''}
        </div>

        ${budget ? `
        <div class="info-section">
          <h2 style="margin-top: 0; color: #10b981;">🍽️ Menu</h2>
          <div class="info-row">
            <span><strong>Entrées:</strong></span>
            <span>${budget.menu.entrees.map(e => e.name).join(', ')}</span>
          </div>
          <div class="info-row">
            <span><strong>Viandes:</strong></span>
            <span>${budget.menu.viandes.map(v => v.name).join(', ')}</span>
          </div>
          <div class="info-row">
            <span><strong>Dessert:</strong></span>
            <span>${budget.menu.dessert.name}</span>
          </div>
          <div class="info-row">
            <span><strong>Prix par personne:</strong></span>
            <span>${budget.menu.pricePerPerson.toFixed(2)} €</span>
          </div>
          <div class="info-row">
            <span><strong>Personnes:</strong></span>
            <span>${budget.menu.totalPersons}</span>
          </div>
        </div>
        ` : ''}

        <div class="highlight-box">
          <p style="margin: 0 0 10px 0; font-size: 18px; opacity: 0.95;">MONTANT TOTAL</p>
          <div class="amount">${data.totalTTC.toFixed(2)} €</div>
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">TTC</p>
          ${budget?.totals?.discount && budget.totals.discount.amount > 0 ? `
            <div style="margin-top: 10px; padding: 10px; background-color: rgba(255,255,255,0.2); border-radius: 6px;">
              <p style="margin: 0; font-size: 13px;">✨ ${budget.totals.discount.reason}</p>
              <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: bold;">-${budget.totals.discount.percentage}% (-${budget.totals.discount.amount.toFixed(2)} €)</p>
            </div>
          ` : ''}
        </div>

        <div style="text-align: center; margin: 40px 0;">
          <p style="margin-bottom: 20px; font-size: 16px; color: #374151;">
            <strong>Veuillez réviser et approuver ce presupuesto depuis le Panel Admin</strong>
          </p>
          
          <a href="${data.adminPanelUrl}/budgets/${data.budgetId}" 
             class="cta-button">
            🔍 Ouvrir dans le Panel Admin
          </a>
          
          <p style="margin-top: 15px; font-size: 13px; color: #6b7280;">
            ID: ${data.budgetId}
          </p>
        </div>

        <div class="section">
          <h2>✏️ Actions Possibles dans le Panel</h2>
          <ul style="margin: 10px 0; padding-left: 20px; color: #4b5563;">
            <li>Réviser tous les prix et quantités</li>
            <li>Modifier les montants si nécessaire</li>
            <li>Ajouter des notes personnalisées</li>
            <li>Générer et télécharger le PDF</li>
            <li>Approuver et envoyer au client</li>
          </ul>
        </div>

        <div class="footer">
          <p><strong>Fuegos d'Azur - Panel Admin</strong></p>
          <p style="margin-top: 10px; font-size: 11px;">
            © ${new Date().getFullYear()} Fuegos d'Azur. Sistema automatizado de presupuestos.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

