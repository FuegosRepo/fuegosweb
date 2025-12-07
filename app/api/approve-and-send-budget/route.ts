import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { sendEmail } from '@/lib/emailService'

export async function POST(request: NextRequest) {
  try {
    const { budgetId, clientEmail, clientName } = await request.json()

    if (!budgetId || !clientEmail) {
      return NextResponse.json(
        { error: 'Budget ID y email del cliente son requeridos' },
        { status: 400 }
      )
    }

    console.log(`📧 Aprobando y enviando presupuesto ${budgetId} a ${clientEmail}`)

    // 1. Obtener el presupuesto y su PDF
    const { data: budget, error: fetchError } = await supabase
      .from('budgets')
      .select('*')
      .eq('id', budgetId)
      .single()

    if (fetchError || !budget) {
      console.error('Error obteniendo presupuesto:', fetchError)
      return NextResponse.json(
        { error: 'Presupuesto no encontrado' },
        { status: 404 }
      )
    }

    // Verificar que tenga PDF
    if (!budget.pdf_url) {
      return NextResponse.json(
        { error: 'El presupuesto no tiene PDF generado. Por favor, genere el PDF primero.' },
        { status: 400 }
      )
    }

    // 2. Actualizar estado a 'approved' y guardar timestamp
    const { error: updateError } = await supabase
      .from('budgets')
      .update({
        status: 'approved',
        approved_at: new Date().toISOString(),
        approved_by: 'admin',
        sent_at: new Date().toISOString()
      })
      .eq('id', budgetId)

    if (updateError) {
      console.error('Error actualizando presupuesto:', updateError)
      return NextResponse.json(
        { error: 'Error al actualizar estado del presupuesto' },
        { status: 500 }
      )
    }

    // 3. Enviar email al cliente con el PDF adjunto
    try {
      const budgetData = budget.budget_data
      const totalTTC = budgetData.totals?.totalTTC || 0

      await sendEmail({
        to: clientEmail,
        toName: clientName,
        subject: `Votre Devis Fuegos d'Azur - ${totalTTC.toFixed(2)}€`,
        html: getBudgetApprovedEmail({
          clientName,
          totalTTC,
          pdfUrl: budget.pdf_url,
          eventDate: budgetData.clientInfo?.eventDate,
          guestCount: budgetData.clientInfo?.guestCount
        })
      })

      console.log('✅ Email con presupuesto enviado al cliente')
    } catch (emailError) {
      console.error('Error enviando email:', emailError)
      // Rollback del estado si falla el envío
      await supabase
        .from('budgets')
        .update({
          status: 'pending_review',
          sent_at: null
        })
        .eq('id', budgetId)
      
      return NextResponse.json(
        { error: 'Error al enviar el email al cliente. El presupuesto no se marcó como enviado.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Presupuesto aprobado y enviado exitosamente'
    })

  } catch (error) {
    console.error('Error en approve-and-send-budget:', error)
    return NextResponse.json(
      { error: 'Error inesperado al procesar la solicitud' },
      { status: 500 }
    )
  }
}

// Template de email para enviar presupuesto aprobado al cliente
function getBudgetApprovedEmail(data: {
  clientName: string
  totalTTC: number
  pdfUrl: string
  eventDate?: string
  guestCount?: number
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
        .tagline {
          color: #6b7280;
          margin: 8px 0 0 0;
          font-size: 14px;
        }
        .content {
          margin-bottom: 30px;
          line-height: 1.8;
        }
        .content p {
          margin-bottom: 16px;
        }
        .highlight-box {
          background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
          color: white;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          margin: 30px 0;
        }
        .highlight-box h2 {
          margin: 0 0 10px 0;
          font-size: 28px;
        }
        .highlight-box p {
          margin: 5px 0;
          opacity: 0.95;
        }
        .info-box {
          background-color: #fef3c7;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #d97706;
          margin: 20px 0;
        }
        .info-box strong {
          color: #92400e;
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
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .cta-button:hover {
          background-color: #b45309;
        }
        .details-section {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .details-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .details-row:last-child {
          border-bottom: none;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
        }
        .contact-info {
          margin-top: 15px;
        }
        .contact-info a {
          color: #d97706;
          text-decoration: none;
        }
        .brand-values {
          text-align: center;
          color: #d97706;
          font-weight: 600;
          font-size: 14px;
          margin-top: 20px;
          letter-spacing: 1px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1 class="logo">🔥 Fuegos d'Azur</h1>
          <p class="tagline">Service Traiteur - Asado Argentin</p>
        </div>
        
        <div class="content">
          <p><strong>Bonjour${data.clientName ? ' ' + data.clientName : ''},</strong></p>
          
          <p>Nous sommes ravis de vous présenter votre <strong>devis personnalisé</strong> pour votre événement !</p>
          
          <div class="highlight-box">
            <h2>${data.totalTTC.toFixed(2)} €</h2>
            <p>Montant Total TTC</p>
          </div>

          ${data.eventDate && data.guestCount ? `
            <div class="details-section">
              <div class="details-row">
                <span><strong>📅 Date:</strong></span>
                <span>${new Date(data.eventDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div class="details-row">
                <span><strong>👥 Invités:</strong></span>
                <span>${data.guestCount} personnes</span>
              </div>
            </div>
          ` : ''}
          
          <div style="text-align: center;">
            <a href="${data.pdfUrl}" class="cta-button" target="_blank">
              📄 Télécharger le Devis PDF
            </a>
          </div>
          
          <div class="info-box">
            <p style="margin: 0;"><strong>✨ Prochaines étapes:</strong></p>
            <p style="margin: 10px 0 0 0;">
              Pour confirmer votre réservation, contactez-nous par téléphone ou email. 
              Nous serons heureux de répondre à toutes vos questions !
            </p>
          </div>
          
          <p>Notre équipe reste à votre disposition pour personnaliser davantage votre menu ou discuter de détails supplémentaires.</p>
          
          <p style="margin-top: 30px;"><strong>À très bientôt autour du feu,</strong></p>
          <p style="margin-top: 5px;">L'équipe Fuegos d'Azur</p>
          
          <p class="brand-values">Authenticité — Élégance — Feu</p>
        </div>
        
        <div class="footer">
          <p><strong>Fuegos d'Azur</strong></p>
          <div class="contact-info">
            <p>📞 <a href="tel:+33750853599">07 50 85 35 99</a> • <a href="tel:+33670659784">06 70 65 97 84</a></p>
            <p>📧 <a href="mailto:fuegosdazur@proton.me">fuegosdazur@proton.me</a></p>
            <p>📍 Côte d'Azur, France</p>
            <p style="margin-top: 15px;">
              📱 Suivez-nous sur <a href="https://instagram.com/fuegosdazur" target="_blank">@fuegosdazur</a>
            </p>
          </div>
          <p style="margin-top: 20px; font-size: 11px;">
            © ${new Date().getFullYear()} Fuegos d'Azur. Tous droits réservés.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

