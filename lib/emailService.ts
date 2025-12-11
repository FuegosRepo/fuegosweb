import { Resend } from 'resend'
import { OrderExtras } from './types/budget'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailParams {
  to: string
  toName: string
  subject: string
  html: string
}

/**
 * Enviar email con Resend
 */
export async function sendEmail(params: EmailParams) {
  const { to, subject, html } = params

  try {
    const fromEmail = process.env.EMAIL_FROM || 'contact@fuegosdazur.com'
    const fromName = process.env.EMAIL_FROM_NAME || "Fuegos d'Azur"

    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [to],
      subject: subject,
      html: html
    })

    if (error) {
      console.error('Error enviando email con Resend:', error)
      throw new Error(`Error al enviar email: ${error.message}`)
    }

    console.log('✅ Email enviado correctamente:', data?.id)

    return {
      success: true,
      messageId: data?.id,
      recipient: to
    }
  } catch (error) {
    console.error('Error inesperado al enviar email:', error)
    throw error
  }
}

/**
 * Template de email de confirmación al cliente
 */
export function getClientConfirmationEmail(clientName: string): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmation de demande - Fuegos d'Azur</title>
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
        .highlight {
          background-color: #fef3c7;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #d97706;
          margin: 20px 0;
        }
        .social {
          text-align: center;
          margin: 30px 0;
          padding: 20px;
          background-color: #f9fafb;
          border-radius: 8px;
        }
        .social a {
          color: #d97706;
          text-decoration: none;
          font-weight: 600;
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
          <p><strong>Bonjour${clientName ? ' ' + clientName : ''},</strong></p>
          
          <p>Nous vous remercions chaleureusement pour votre demande de devis et pour l'intérêt que vous portez à <strong>Fuegos d'Azur</strong>.</p>
          
          <div class="highlight">
            <p style="margin: 0;"><strong>✅ Votre demande a bien été reçue</strong> et notre équipe la traite avec attention.</p>
          </div>
          
          <p>Nous reviendrons vers vous <strong>sous 48 heures maximum</strong> avec une proposition personnalisée, adaptée à votre événement.</p>
          
          <div class="social">
            <p style="margin-bottom: 10px;">En attendant, n'hésitez pas à nous suivre sur nos réseaux sociaux pour découvrir nos dernières réalisations autour du feu 🔥</p>
            <p style="margin: 0;"><a href="https://instagram.com/fuegosdazur" target="_blank">@fuegosdazur</a></p>
          </div>
          
          <p style="margin-top: 30px;"><strong>À très bientôt,</strong></p>
          <p style="margin-top: 5px;">L'équipe Fuegos d'Azur</p>
          
          <p class="brand-values">Authenticité — Élégance — Feu</p>
        </div>
        
        <div class="footer">
          <p><strong>Fuegos d'Azur</strong></p>
          <div class="contact-info">
            <p>📞 <a href="tel:+33750853599">07 50 85 35 99</a> • <a href="tel:+33670659784">06 70 65 97 84</a></p>
            <p>📧 <a href="mailto:fuegosdazur@proton.me">fuegosdazur@proton.me</a></p>
            <p>📍 Côte d'Azur, France</p>
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

/**
 * Template de email de notificación al administrador
 */
export function getAdminNotificationEmail(orderData: {
  name: string
  email: string
  phone: string
  eventDate: string
  eventType: string
  guestCount: number
  address: string
  menuType: string | null
  entrees: string[]
  viandes: string[]
  dessert: string | null
  extras: OrderExtras
}): string {
  const { name, email, phone, eventDate, eventType, guestCount, address, menuType, entrees, viandes, dessert, extras } = orderData

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouveau Devis - Fuegos d'Azur</title>
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
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .section {
          margin-bottom: 25px;
          padding: 20px;
          background-color: #f9fafb;
          border-radius: 8px;
          border-left: 4px solid #d97706;
        }
        .section h2 {
          margin-top: 0;
          color: #d97706;
          font-size: 18px;
        }
        .info-row {
          display: flex;
          margin-bottom: 12px;
        }
        .info-label {
          font-weight: 600;
          min-width: 140px;
          color: #6b7280;
        }
        .info-value {
          flex: 1;
          color: #1f2937;
        }
        .list-items {
          list-style: none;
          padding: 0;
        }
        .list-items li {
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .list-items li:last-child {
          border-bottom: none;
        }
        .urgent-badge {
          display: inline-block;
          background-color: #ef4444;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>🔥 Nouvelle Demande de Devis</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px;">Reçue le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
        </div>

        <div class="section">
          <h2>👤 Informations Client</h2>
          <div class="info-row">
            <span class="info-label">Nom:</span>
            <span class="info-value"><strong>${name}</strong></span>
          </div>
          <div class="info-row">
            <span class="info-label">Email:</span>
            <span class="info-value"><a href="mailto:${email}">${email}</a></span>
          </div>
          <div class="info-row">
            <span class="info-label">Téléphone:</span>
            <span class="info-value"><a href="tel:${phone}">${phone}</a></span>
          </div>
        </div>

        <div class="section">
          <h2>📅 Détails de l'Événement</h2>
          <div class="info-row">
            <span class="info-label">Type:</span>
            <span class="info-value"><strong>${eventType}</strong></span>
          </div>
          <div class="info-row">
            <span class="info-label">Date:</span>
            <span class="info-value"><strong>${new Date(eventDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong></span>
          </div>
          <div class="info-row">
            <span class="info-label">Nombre d'invités:</span>
            <span class="info-value"><strong>${guestCount} personnes</strong></span>
          </div>
          <div class="info-row">
            <span class="info-label">Lieu:</span>
            <span class="info-value">${address}</span>
          </div>
        </div>

        <div class="section">
          <h2>🍽️ Menu Sélectionné</h2>
          <div class="info-row">
            <span class="info-label">Type de menu:</span>
            <span class="info-value"><strong>${menuType === 'dejeuner' ? 'Déjeuner' : menuType === 'diner' ? 'Dîner' : 'Non spécifié'}</strong></span>
          </div>
          
          ${entrees.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong>Entrées:</strong>
              <ul class="list-items">
                ${entrees.map(e => `<li>• ${e}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${viandes.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong>Viandes:</strong>
              <ul class="list-items">
                ${viandes.map(v => `<li>• ${v}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${dessert ? `
            <div style="margin-top: 15px;">
              <strong>Dessert:</strong> ${dessert}
            </div>
          ` : ''}
        </div>

        ${extras && (extras.wines || extras.equipment?.length > 0 || extras.decoration || extras.specialRequest) ? `
          <div class="section">
            <h2>✨ Services Extras</h2>
            ${extras.wines ? '<div class="info-row"><span class="info-label">Vins:</span><span class="info-value">✅ Oui</span></div>' : ''}
            ${extras.decoration ? '<div class="info-row"><span class="info-label">Décoration:</span><span class="info-value">✅ Oui</span></div>' : ''}
            ${extras.equipment?.length > 0 ? `
              <div style="margin-top: 10px;">
                <strong>Matériel demandé:</strong>
                <ul class="list-items">
                  ${extras.equipment.map((e: string) => `<li>• ${e}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            ${extras.specialRequest ? `
              <div style="margin-top: 10px;">
                <strong>Demande spéciale:</strong>
                <p style="margin: 5px 0; padding: 10px; background-color: white; border-radius: 4px;">${extras.specialRequest}</p>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #fef3c7; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">
            <strong>⏱️ Action requise:</strong> Répondre au client sous 48 heures
          </p>
        </div>

        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            Accédez au panel admin pour gérer cette demande
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

