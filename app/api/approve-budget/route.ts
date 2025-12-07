import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { sendEmail } from '@/lib/emailService'
import { BudgetData } from '@/lib/types/budget'

export async function POST(request: NextRequest) {
  try {
    const { budgetId, approvedBy } = await request.json()

    if (!budgetId) {
      return NextResponse.json(
        { error: 'budgetId es requerido' },
        { status: 400 }
      )
    }

    console.log(`✅ Aprobando presupuesto ${budgetId}...`)

    // Obtener presupuesto
    const { data: budget, error: fetchError } = await supabase
      .from('budgets')
      .select('*, catering_orders(*)')
      .eq('id', budgetId)
      .single()

    if (fetchError || !budget) {
      console.error('Error obteniendo presupuesto:', fetchError)
      return NextResponse.json(
        { error: 'Presupuesto no encontrado' },
        { status: 404 }
      )
    }

    const budgetData = budget.budget_data as BudgetData

    // Verificar si ya tiene PDF, si no, generarlo
    let pdfUrl = budget.pdf_url
    if (!pdfUrl) {
      console.log('📄 Generando PDF antes de enviar...')
      
      const pdfResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/generate-budget-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budgetId })
      })

      if (!pdfResponse.ok) {
        throw new Error('Error al generar PDF')
      }

      const pdfResult = await pdfResponse.json()
      pdfUrl = pdfResult.pdfUrl
    }

    // Actualizar estado del presupuesto
    const { error: updateError } = await supabase
      .from('budgets')
      .update({
        status: 'approved',
        approved_by: approvedBy || 'admin',
        approved_at: new Date().toISOString(),
        sent_at: new Date().toISOString()
      })
      .eq('id', budgetId)

    if (updateError) {
      console.error('Error actualizando presupuesto:', updateError)
      return NextResponse.json(
        { error: 'Error al actualizar presupuesto', details: updateError.message },
        { status: 500 }
      )
    }

    // Enviar email al cliente con el presupuesto
    try {
      await sendEmail({
        to: budgetData.clientInfo.email,
        toName: budgetData.clientInfo.name,
        subject: `Votre Devis - Fuegos d'Azur - ${budgetData.clientInfo.eventType}`,
        html: getClientBudgetEmail({
          clientName: budgetData.clientInfo.name,
          eventType: budgetData.clientInfo.eventType,
          eventDate: budgetData.clientInfo.eventDate,
          guestCount: budgetData.clientInfo.guestCount,
          totalTTC: budgetData.totals.totalTTC,
          pdfUrl,
          validUntil: budgetData.validUntil
        })
      })

      console.log('✅ Email con presupuesto enviado al cliente')
    } catch (emailError) {
      console.error('❌ Error enviando email:', emailError)
      // Marcamos como aprobado pero informamos del error
      return NextResponse.json({
        success: true,
        warning: 'Presupuesto aprobado pero no se pudo enviar email',
        budgetId,
        pdfUrl
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Presupuesto aprobado y enviado exitosamente',
      budgetId,
      pdfUrl
    })

  } catch (error) {
    console.error('❌ Error inesperado en approve-budget:', error)
    return NextResponse.json(
      { 
        error: 'Error inesperado al aprobar presupuesto',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// Template de email para enviar presupuesto al cliente
function getClientBudgetEmail(data: {
  clientName: string
  eventType: string
  eventDate: string
  guestCount: number
  totalTTC: number
  pdfUrl: string
  validUntil: string
}): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Votre Devis - Fuegos d'Azur</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .email-container {
          background-color: white;
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #d97706;
        }
        .logo {
          font-size: 32px;
          font-weight: bold;
          color: #d97706;
          margin: 0;
        }
        .content {
          margin-bottom: 30px;
        }
        .highlight-box {
          background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          color: white;
          padding: 25px;
          border-radius: 8px;
          text-align: center;
          margin: 25px 0;
        }
        .highlight-box .amount {
          font-size: 42px;
          font-weight: bold;
          margin: 10px 0;
        }
        .info-table {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .info-label {
          font-weight: 600;
          color: #6b7280;
        }
        .cta-button {
          display: inline-block;
          background-color: #d97706;
          color: white;
          padding: 15px 30px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          margin: 10px 0;
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
          <h1 class="logo">🔥 Fuegos d'Azur</h1>
          <p style="color: #6b7280; margin: 8px 0 0 0;">Service Traiteur - Asado Argentin</p>
        </div>
        
        <div class="content">
          <p><strong>Bonjour ${data.clientName},</strong></p>
          
          <p>Nous sommes ravis de vous présenter votre <strong>devis personnalisé</strong> pour votre événement.</p>
          
          <div class="info-table">
            <div class="info-row">
              <span class="info-label">Type d'événement:</span>
              <span>${data.eventType}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Date:</span>
              <span>${new Date(data.eventDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Nombre d'invités:</span>
              <span><strong>${data.guestCount} personnes</strong></span>
            </div>
          </div>

          <div class="highlight-box">
            <p style="margin: 0; font-size: 16px; opacity: 0.95;">Montant Total</p>
            <div class="amount">${data.totalTTC.toFixed(2)} €</div>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">TTC</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.pdfUrl}" class="cta-button" download>
              📥 Télécharger le Devis Complet (PDF)
            </a>
          </div>

          <p style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <strong>⏰ Devis valable jusqu'au:</strong> ${new Date(data.validUntil).toLocaleDateString('fr-FR')}
          </p>

          <p>Notre équipe reste à votre entière disposition pour toute question ou personnalisation de votre événement.</p>

          <p style="margin-top: 30px;"><strong>À très bientôt,</strong></p>
          <p style="margin-top: 5px;">L'équipe Fuegos d'Azur</p>
          
          <p style="text-align: center; margin-top: 30px; color: #d97706; font-weight: 600; letter-spacing: 1px; font-size: 14px;">
            Authenticité — Élégance — Feu
          </p>
        </div>
        
        <div class="footer">
          <p><strong>Fuegos d'Azur</strong></p>
          <p style="margin-top: 10px;">
            📞 07 50 85 35 99 • 06 70 65 97 84<br>
            📧 fuegosdazur@proton.me<br>
            📍 Côte d'Azur, France
          </p>
          <p style="margin-top: 20px; font-size: 11px;">
            © ${new Date().getFullYear()} Fuegos d'Azur. Tous droits réservés.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

