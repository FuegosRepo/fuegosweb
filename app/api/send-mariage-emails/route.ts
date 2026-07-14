import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/emailService';
import { BaseLayout } from '@/lib/emails/templates/BaseLayout';
import { supabase } from '@/lib/supabaseClient';
import { z } from 'zod';

const mariageRequestSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z.string().optional(),
  date: z.string(),
  type: z.string(),
  guests: z.string().optional(),
  venue: z.string().optional(),
  address: z.string().optional(),
  apero: z.string().optional(),
  service: z.string().optional(),
  entrees: z.array(z.string()).optional().default([]),
  viandes: z.array(z.string()).optional().default([]),
  desserts: z.array(z.string()).optional().default([]),
  services: z.array(z.string()).optional().default([]),
  message: z.string().optional(),
  lang: z.enum(['fr', 'en', 'es']).optional().default('fr'),
});

const VENUE_MAP: Record<string, string> = {
  villa: 'Villa privée',
  domaine: 'Domaine & Château',
  hotel: 'Hôtel',
  plage: 'Plage & Vue mer',
  autre: 'Autre',
};

const TYPE_MAP: Record<string, string> = {
  welcome: 'Welcome Dinner (Dîner de bienvenue la veille)',
  civil: 'Mariage Civil (Réception après la cérémonie civile)',
  reception: 'Réception de Mariage (Le grand banquet)',
  brunch: 'Brunch Après Mariage (Lendemain de fête)',
  cocktail: 'Cocktail Dînatoire (Format cocktail élégant)',
};

const ENTREE_MAP: Record<string, string> = {
  empanadas: 'Empanadas argentines',
  chorizo: 'Tapas au chorizo argentin grillé',
  secreto: 'Secreto de porc ibérique',
  brochettes: 'Brochettes de jambon ibérique',
  miniburger: 'Miniburger maison au brasero',
  'salade-tomate': 'Salade de tomates, mozzarella di Bufala',
  'salade-artichaut': 'Salade d’artichauts grillés',
};

const VIANDE_MAP: Record<string, string> = {
  picanha: 'Picanha (Argentine)',
  entrecote: 'Entrecôte / Ribeye (France)',
  cote: 'Côte de bœuf (France)',
  bavette: 'Bavette (Irlande)',
  magret: 'Magret de canard (France)',
  saumon: 'Saumon grillé (Norvège)',
};

const DESSERT_MAP: Record<string, string> = {
  panqueques: 'Panqueques au brasero (dulce de leche)',
  fruits: 'Fruits de saison grillés (Cognac)',
  fromages: 'Sélection de fromages / pâtisseries françaises',
};

const SERVICE_MAP: Record<string, string> = {
  table: 'Service à table',
  buffet: 'Buffet / Format libre',
  deco: 'Mise en place & décoration',
  personnel: 'Personnel de service (serveurs)',
  location: 'Location matériel (tables, chaises, vaisselle)',
};

// Client Email Templates by Language
const CLIENT_TEMPLATES = {
  fr: {
    subject: "Votre demande de devis Mariage - Fuegos d'Azur",
    title: "Créons votre moment",
    body: (name: string) => `
      <h1 style="color: #d97706; font-size: 20px; margin-bottom: 20px; margin-top: 0; text-align: left;">Bonjour ${name},</h1>
      <p style="font-size: 15px; margin: 10px 0; color: #374151; line-height: 1.6;">
        Nous vous remercions chaleureusement pour votre demande de devis Mariage et pour l'intérêt que vous portez à <strong>Fuegos d'Azur</strong>.
      </p>
      <div style="background-color: #fff7ed; border-left: 4px solid #d97706; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <p style="margin: 0; color: #9a3412; font-weight: bold;">
          ✅ Votre demande a bien été reçue et notre équipe la traite avec attention.
        </p>
      </div>
      <p style="font-size: 15px; margin: 15px 0; color: #374151; line-height: 1.6;">
        Nous reviendrons vers vous <strong>sous 48 heures maximum</strong> avec une proposition personnalisée autour du feu, adaptée à votre célébration.
      </p>
    `,
  },
  en: {
    subject: "Your Wedding Quote Request - Fuegos d'Azur",
    title: "Let’s create your moment",
    body: (name: string) => `
      <h1 style="color: #d97706; font-size: 20px; margin-bottom: 20px; margin-top: 0; text-align: left;">Hello ${name},</h1>
      <p style="font-size: 15px; margin: 10px 0; color: #374151; line-height: 1.6;">
        Thank you very much for your Wedding quote request and for your interest in <strong>Fuegos d'Azur</strong>.
      </p>
      <div style="background-color: #fff7ed; border-left: 4px solid #d97706; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <p style="margin: 0; color: #9a3412; font-weight: bold;">
          ✅ Your request has been successfully received, and our team is carefully reviewing it.
        </p>
      </div>
      <p style="font-size: 15px; margin: 15px 0; color: #374151; line-height: 1.6;">
        We will get back to you <strong>within 48 hours maximum</strong> with a tailored proposal around the fire, designed for your celebration.
      </p>
    `,
  },
  es: {
    subject: "Tu solicitud de presupuesto de Boda - Fuegos d'Azur",
    title: "Creemos tu momento",
    body: (name: string) => `
      <h1 style="color: #d97706; font-size: 20px; margin-bottom: 20px; margin-top: 0; text-align: left;">Hola ${name},</h1>
      <p style="font-size: 15px; margin: 10px 0; color: #374151; line-height: 1.6;">
        Te agradecemos enormemente tu solicitud de presupuesto de Boda y tu interés en <strong>Fuegos d'Azur</strong>.
      </p>
      <div style="background-color: #fff7ed; border-left: 4px solid #d97706; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <p style="margin: 0; color: #9a3412; font-weight: bold;">
          ✅ Tu solicitud ha sido recibida con éxito y nuestro equipo la está revisando con atención.
        </p>
      </div>
      <p style="font-size: 15px; margin: 15px 0; color: #374151; line-height: 1.6;">
        Nos pondremos en contacto contigo en un <strong>plazo máximo de 48 horas</strong> con una propuesta personalizada alrededor del fuego para tu celebración.
      </p>
    `,
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = mariageRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données invalides', issues: parsed.error.issues.map((i) => i.message) },
        { status: 400 }
      );
    }

    const payload = parsed.data;

    // Guardar en Supabase (en la tabla catering_orders unificada con event_type = 'mariage')
    const { data: dbData, error: dbError } = await supabase
      .from('catering_orders')
      .insert({
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        event_date: payload.date || null,
        event_type: 'mariage', // Forzamos a que sea tipo mariage
        guest_count: payload.guests ? parseInt(payload.guests, 10) : null,
        address: payload.address || null,
        event_time: payload.service || null,
        entrees: payload.entrees || [],
        viandes: payload.viandes || [],
        dessert: payload.desserts[0] || null, // Guardamos el postre único
        extras: {
          wines: false,
          equipment: payload.services || [],
          decoration: payload.services ? payload.services.includes('deco') : false,
          specialRequest: payload.message || '',
          venue_type: payload.venue || null,
          apero_time: payload.apero || null,
        },
        status: 'pending',
      })
      .select()
      .single();

    if (dbError) {
      console.error('❌ Error guardando solicitud en Supabase (catering_orders):', dbError);
    } else {
      console.log('✅ Solicitud de matrimonio guardada en Supabase (catering_orders) con ID:', dbData?.id);
    }

    // Helper functions for mapping selections to text representations
    const venueText = payload.venue ? (VENUE_MAP[payload.venue] || payload.venue) : 'Non spécifié';
    const typeText = TYPE_MAP[payload.type] || payload.type;
    const entreesList = payload.entrees.map((id) => ENTREE_MAP[id] || id).join(', ') || 'Aucune';
    const viandesList = payload.viandes.map((id) => VIANDE_MAP[id] || id).join(', ') || 'Aucune';
    const dessertsList = payload.desserts.map((id) => DESSERT_MAP[id] || id).join(', ') || 'Aucun';
    const servicesList = payload.services.map((id) => SERVICE_MAP[id] || id).join(', ') || 'Aucun';

    // 1. Send Email to Admin (mariages@fuegosdazur.com)
    const adminEmail = process.env.ADMIN_EMAIL_MARIAGE || 'mariages@fuegosdazur.com';

    const adminHtml = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Nouvelle Demande de Devis Mariage</title>
      </head>
      <body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
          <h1 style="color: #1C3FBF; margin-bottom: 20px; text-align: center;">💍 Nouvelle Demande de Devis Mariage</h1>
          <p style="font-size: 16px; margin-bottom: 10px;">Une nouvelle demande a été reçue via le formulaire <strong>/mariage</strong>.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #e2e8f0;">
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; width: 180px;">Nom & Prénom</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1;">${payload.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Email</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1;"><a href="mailto:${payload.email}">${payload.email}</a></td>
            </tr>
            <tr style="background-color: #e2e8f0;">
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Téléphone</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1;">${payload.phone || 'Non renseigné'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Date du mariage</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1;">${payload.date}</td>
            </tr>
            <tr style="background-color: #e2e8f0;">
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Type d'événement</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1;">${typeText}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Nombre d'invités</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1;">${payload.guests || 'Non renseigné'}</td>
            </tr>
            <tr style="background-color: #e2e8f0;">
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Lieu & Adresse</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1;">${venueText} (${payload.address || 'Adresse non spécifiée'})</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Apéritif / Service</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1;">${payload.apero || 'N/A'} / ${payload.service || 'N/A'}</td>
            </tr>
            <tr style="background-color: #e2e8f0;">
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Les Entrées</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1;">${entreesList}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Viandes & Poissons</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1;">${viandesList}</td>
            </tr>
            <tr style="background-color: #e2e8f0;">
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Desserts</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1;">${dessertsList}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Services additionnels</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1;">${servicesList}</td>
            </tr>
            <tr style="background-color: #e2e8f0;">
              <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Message client</td>
              <td style="padding: 10px; border: 1px solid #cbd5e1; white-space: pre-wrap;">${payload.message || 'Aucun message.'}</td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `;

    const adminResult = await sendEmail({
      to: adminEmail,
      toName: 'Admin Fuegos d\'Azur',
      subject: `💍 Nouveau Devis Mariage - ${payload.name}`,
      html: adminHtml,
    });

    console.log('✅ Admin notification email sent for Mariage request to:', adminEmail);

    // 2. Send Confirmation Email to Client (Trilingual)
    const clientLang = payload.lang;
    const clientTemplate = CLIENT_TEMPLATES[clientLang];

    const EMAIL_HEADER_URL = 'https://fygptwzqzjgomumixuqc.supabase.co/storage/v1/object/public/budgets/imgemail/headerblack.png';
    const EMAIL_LOGO_URL = 'https://fygptwzqzjgomumixuqc.supabase.co/storage/v1/object/public/budgets/imgemail/minilogoblack.png';

    const clientInnerHtml = `
      ${clientTemplate.body(payload.name)}
      <div style="margin: 25px 0; padding: 15px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
        <p style="margin-bottom: 10px; font-size: 14px; color: #4b5563;">
          ${clientLang === 'es' ? 'Mientras tanto, síguenos para conocer nuestros últimos eventos 🔥' :
        clientLang === 'en' ? 'In the meantime, follow us to discover our latest creations 🔥' :
          'En attendant, suivez-nous pour découvrir nos dernières réalisations 🔥'}
        </p>
        <a href="https://instagram.com/fuegosdazur" target="_blank" style="color: #d97706; font-weight: bold; text-decoration: none;">@fuegosdazur</a>
      </div>

      <div class="signature-box" style="margin-top: 30px; padding: 15px; background-color: #f8fafc; border-radius: 8px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td valign="middle" width="90" style="padding-right: 15px;">
              <img src="${EMAIL_LOGO_URL}" alt="Fuegos d'Azur" width="70" style="display: block; width: 70px;" />
            </td>
            <td valign="middle" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #374151; line-height: 1.4;">
              <div style="margin-bottom: 5px;">
                ${clientLang === 'es' ? 'Hasta pronto,' : clientLang === 'en' ? 'See you soon,' : 'À très bientôt,'}
              </div>
              <div style="font-weight: bold; color: #d97706; font-size: 15px;">L'équipe Fuegos d'Azur</div>
              <div style="color: #9ca3af; font-size: 12px; font-style: italic; margin-top: 5px;">
                ${clientLang === 'es' ? 'Autenticidad – Elegancia – Fuego' :
        clientLang === 'en' ? 'Authenticity – Elegance – Fire' :
          'Authenticité – Élégance – Feu'}
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;

    const clientHtml = BaseLayout(clientInnerHtml, { headerUrl: EMAIL_HEADER_URL });

    const clientResult = await sendEmail({
      to: payload.email,
      toName: payload.name,
      subject: clientTemplate.subject,
      html: clientHtml,
    });

    console.log('✅ Client confirmation email sent for Mariage request to:', payload.email);

    return NextResponse.json({
      success: true,
      adminResult,
      clientResult,
    });
  } catch (error) {
    console.error('Error processing send-mariage-emails:', error);
    return NextResponse.json(
      { success: false, error: 'Error processing request' },
      { status: 500 }
    );
  }
}
