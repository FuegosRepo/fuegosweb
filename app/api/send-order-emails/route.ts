import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, getClientConfirmationEmail, getAdminNotificationEmail } from '@/lib/emailService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, eventDate, eventType, guestCount, address, menuType, entrees, viandes, dessert, extras } = body

    const results = {
      success: true,
      clientEmail: null as unknown,
      adminEmail: null as unknown,
      errors: [] as string[]
    }

    // 1. Enviar email al cliente
    try {
      const clientResult = await sendEmail({
        to: email,
        toName: name,
        subject: 'Confirmation de votre demande - Fuegos d\'Azur',
        html: getClientConfirmationEmail(name)
      })
      results.clientEmail = clientResult
      console.log('✅ Email de confirmación enviado al cliente:', email)
    } catch (error) {
      console.error('Error enviando email al cliente:', error)
      results.errors.push('Error enviando email al cliente')
    }

    // 2. Enviar email al admin
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'contact@fuegosdazur.com'

      const adminResult = await sendEmail({
        to: adminEmail,
        toName: 'Admin Fuegos d\'Azur',
        subject: `🔥 Nouvelle Demande: ${eventType} - ${name} (${guestCount} pers.)`,
        html: getAdminNotificationEmail({
          name,
          email,
          phone,
          eventDate,
          eventType,
          guestCount,
          address,
          menuType,
          entrees,
          viandes,
          dessert,
          extras
        })
      })
      results.adminEmail = adminResult
      console.log('✅ Email de notificación enviado al admin:', adminEmail)
    } catch (error) {
      console.error('Error enviando email al admin:', error)
      results.errors.push('Error enviando email al admin')
    }

    return NextResponse.json(results)

  } catch (error) {
    console.error('Error en send-order-emails:', error)
    return NextResponse.json(
      { success: false, error: 'Error procesando solicitud' },
      { status: 500 }
    )
  }
}

