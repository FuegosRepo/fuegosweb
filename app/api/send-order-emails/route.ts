import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, getClientConfirmationEmail, getAdminNotificationEmail } from '@/lib/emailService'
import { rateLimit, checkHoneypot } from '@/lib/rate-limiter'
import { z } from 'zod'

const emailRequestSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  eventType: z.string().optional(),
  guestCount: z.number().optional(),
  address: z.string().optional(),
  menuType: z.string().nullable().optional(),
  entrees: z.array(z.string()).optional(),
  viandes: z.array(z.string()).optional(),
  dessert: z.string().nullable().optional(),
  extras: z.record(z.unknown()).optional(),
}).passthrough()

export async function POST(request: NextRequest) {
  try {
    const rateLimited = rateLimit(request, { maxRequests: 3, windowMs: 60_000 })
    if (rateLimited) return rateLimited

    const body = await request.json()

    const honeypot = checkHoneypot(body)
    if (honeypot) return honeypot

    const parsed = emailRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données invalides', issues: parsed.error.issues.map(i => i.message) },
        { status: 400 }
      )
    }
    const { name, email } = parsed.data

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
        subject: 'Demande reçue ! Nous préparons votre proposition sur mesure - Fuegos d\'Azur',
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
        subject: '🔥 Nouvelle Demande de Devis',
        html: getAdminNotificationEmail()
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

