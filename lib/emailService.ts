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
import { BaseLayout } from '@/lib/emails/templates/BaseLayout'
import { ClientConfirmationTemplate } from '@/lib/emails/templates/ClientConfirmation'

const EMAIL_HEADER_URL = 'https://fygptwzqzjgomumixuqc.supabase.co/storage/v1/object/public/budgets/imgemail/headerblack.png'
const EMAIL_LOGO_URL = 'https://fygptwzqzjgomumixuqc.supabase.co/storage/v1/object/public/budgets/imgemail/minilogoblack.png'

/**
 * Template de email de confirmación al cliente
 */
export function getClientConfirmationEmail(clientName: string): string {
  const innerHtml = ClientConfirmationTemplate(clientName, { logoUrl: EMAIL_LOGO_URL })

  return BaseLayout(innerHtml, { headerUrl: EMAIL_HEADER_URL })
}

/**
 * Template de email de notificación al administrador
 */
export function getAdminNotificationEmail(): string {
  const now = new Date()
  const dateStr = now.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const timeStr = now.toLocaleTimeString('fr-FR')

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Nouvelle Demande de Devis</title>
    </head>
    <body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center;">
        <h1 style="color: #d97706; margin-bottom: 20px;">🔥 Nouvelle Demande de Devis</h1>
        <p style="font-size: 18px; margin-bottom: 10px;">Une nouvelle demande a été reçue.</p>
        <p style="font-size: 16px; color: #666;">
          📅 Date: <strong>${dateStr}</strong><br>
          ⏰ Heure: <strong>${timeStr}</strong>
        </p>
        <p style="margin-top: 30px; font-size: 14px; color: #888;">
          Veuillez consulter le Panel Admin pour voir les détails.
        </p>
      </div>
    </body>
    </html>
  `
}

