/* ============================================================
   FUEGOS D'AZUR — MARIAGES · Form Data & Schema
   Static trilingual content for the wedding quote request form.
   ============================================================ */

export type Lang = 'fr' | 'en' | 'es';

export interface FormDataState {
  name: string;
  email: string;
  phone: string;
  date: string;
  type: string;
  guests: string;
  venue: string;
  address: string;
  apero: string;
  service: string;
  entrees: string[];
  viandes: string[];
  desserts: string[];
  services: string[];
  message: string;
}

export const INITIAL_FORM_STATE: FormDataState = {
  name: '',
  email: '',
  phone: '',
  date: '',
  type: '',
  guests: '',
  venue: '',
  address: '',
  apero: '',
  service: '',
  entrees: [],
  viandes: [],
  desserts: [],
  services: [],
  message: '',
};

export const LOCAL_STORAGE_KEY = 'fuegos_mariages_form';

export const FORM_DATA = {
  UI: {
    fr: {
      backToSite: 'Retour au site',
      kicker: 'Demande de devis · Mariages',
      title: 'Créons votre moment',
      intro: 'Chaque mariage est unique. Parlez-nous de votre projet et nous composerons ensemble une expérience autour du feu, sur mesure.',
      stepOf: (n: number, t: number) => `Étape ${n} sur ${t}`,
      prev: 'Précédent',
      next: 'Continuer',
      send: 'Envoyer la demande',
      required: 'Champ requis',
      optional: 'facultatif',
      multiHint: 'Plusieurs choix possibles',
      pickOne: 'Sélectionnez une option',
      none: '—',
      summaryTitle: 'Résumé de votre demande',
      summaryNote: 'Vérifiez vos informations avant l\u2019envoi. Nous vous répondrons sous 48 h.',
      edit: 'Modifier',
      sentTitle: 'Merci !',
      sentBody: 'Votre demande a bien été envoyée. Notre équipe vous répondra sous 48 heures à l\u2019adresse indiquée.',
      sentClose: 'Fermer',
      veggieNote: 'Option végétarienne / végane disponible — nous la définissons ensemble selon vos souhaits.',
      guestsMin: 'Minimum 10 invités requis',
      entreesExact: 'Veuillez sélectionner exactement 2 entrées',
      entreesCount: (n: number) => `${n}/2 sélectionnées`,
      viandesRange: 'Veuillez sélectionner entre 2 et 3 viandes',
      viandesCount: (n: number) => `${n}/3 sélectionnées`,
      dessertsOne: 'Veuillez sélectionner un dessert',
      dessertsCount: (n: number) => `${n}/1 sélectionné`,
    },
    en: {
      backToSite: 'Back to site',
      kicker: 'Quote request · Weddings',
      title: 'Let\u2019s create your moment',
      intro: 'Every wedding is unique. Tell us about your project and together we\u2019ll compose a bespoke experience around the fire.',
      stepOf: (n: number, t: number) => `Step ${n} of ${t}`,
      prev: 'Back',
      next: 'Continue',
      send: 'Send request',
      required: 'Required field',
      optional: 'optional',
      multiHint: 'Multiple choices possible',
      pickOne: 'Select one option',
      none: '—',
      summaryTitle: 'Summary of your request',
      summaryNote: 'Please review your details before sending. We\u2019ll reply within 48 h.',
      edit: 'Edit',
      sentTitle: 'Thank you!',
      sentBody: 'Your request has been sent. Our team will reply within 48 hours to the address you provided.',
      sentClose: 'Close',
      veggieNote: 'Vegetarian / vegan option available — we\u2019ll define it together according to your wishes.',
      guestsMin: 'Minimum 10 guests required',
      entreesExact: 'Please select exactly 2 starters',
      entreesCount: (n: number) => `${n}/2 selected`,
      viandesRange: 'Please select between 2 and 3 meats',
      viandesCount: (n: number) => `${n}/3 selected`,
      dessertsOne: 'Please select one dessert',
      dessertsCount: (n: number) => `${n}/1 selected`,
    },
    es: {
      backToSite: 'Volver al sitio',
      kicker: 'Solicitud de presupuesto · Bodas',
      title: 'Creemos tu momento',
      intro: 'Cada boda es única. Cuéntanos tu proyecto y compondremos juntos una experiencia a medida alrededor del fuego.',
      stepOf: (n: number, t: number) => `Paso ${n} de ${t}`,
      prev: 'Atrás',
      next: 'Continuar',
      send: 'Enviar solicitud',
      required: 'Campo obligatorio',
      optional: 'opcional',
      multiHint: 'Varias opciones posibles',
      pickOne: 'Selecciona una opción',
      none: '—',
      summaryTitle: 'Resumen de tu solicitud',
      summaryNote: 'Revisa tus datos antes de enviar. Te responderemos en 48 h.',
      edit: 'Modificar',
      sentTitle: '¡Gracias!',
      sentBody: 'Tu solicitud se ha enviado. Nuestro equipo te responderá en 48 horas a la dirección indicada.',
      sentClose: 'Cerrar',
      veggieNote: 'Opción vegetariana / vegana disponible — la definimos juntos según tus deseos.',
      guestsMin: 'Mínimo 10 invitados requeridos',
      entreesExact: 'Por favor selecciona exactamente 2 entrantes',
      entreesCount: (n: number) => `${n}/2 seleccionados`,
      viandesRange: 'Por favor selecciona entre 2 y 3 carnes',
      viandesCount: (n: number) => `${n}/3 seleccionadas`,
      dessertsOne: 'Por favor selecciona un postre',
      dessertsCount: (n: number) => `${n}/1 seleccionado`,
    }
  },

  STEPS: [
    { key: 'contact',  illo: 'il-champagne.png',       fr: 'Contact',             en: 'Contact',           es: 'Contacto' },
    { key: 'type',     illo: 'il-dancing-couple.png',  fr: 'Type d\u2019événement', en: 'Event type',        es: 'Tipo de evento' },
    { key: 'event',    illo: 'il-chateau.png',         fr: 'L\u2019événement',      en: 'The event',         es: 'El evento' },
    { key: 'entrees',  illo: 'il-olive.png',           fr: 'Les Entrées',         en: 'Starters',          es: 'Entrantes' },
    { key: 'viandes',  illo: 'il-flames.png',          fr: 'Viandes & Poissons',  en: 'Meats & Fish',      es: 'Carnes y Pescados' },
    { key: 'desserts', illo: 'il-cake.png',            fr: 'Desserts',            en: 'Desserts',          es: 'Postres' },
    { key: 'services', illo: 'il-fork-knife.png',      fr: 'Services',            en: 'Services',          es: 'Servicios' },
    { key: 'message',  illo: 'il-flowers.png',         fr: 'Message',             en: 'Message',           es: 'Mensaje' },
    { key: 'summary',  illo: 'il-candelabra.png',      fr: 'Résumé',              en: 'Summary',           es: 'Resumen' },
  ],

  HEAD: {
    contact: {
      fr: { t: 'Faisons connaissance', s: 'Vos coordonnées pour vous recontacter.' },
      en: { t: 'Let\u2019s get acquainted', s: 'Your details so we can get back to you.' },
      es: { t: 'Conozcámonos', s: 'Tus datos para poder contactarte.' },
    },
    type: {
      fr: { t: 'Votre célébration', s: 'Quel moment souhaitez-vous célébrer ?' },
      en: { t: 'Your celebration', s: 'Which moment would you like to celebrate?' },
      es: { t: 'Tu celebración', s: '¿Qué momento deseas celebrar?' },
    },
    event: {
      fr: { t: 'L\u2019événement', s: 'Quelques détails sur le jour J.' },
      en: { t: 'The event', s: 'A few details about the big day.' },
      es: { t: 'El evento', s: 'Algunos detalles sobre el gran día.' },
    },
    entrees: {
      fr: { t: 'Les Entrées', s: 'Composez le début du festin.' },
      en: { t: 'The Starters', s: 'Compose the beginning of the feast.' },
      es: { t: 'Los Entrantes', s: 'Compón el comienzo del festín.' },
    },
    viandes: {
      fr: { t: 'Viandes & Poissons', s: 'Le cœur du brasero.' },
      en: { t: 'Meats & Fish', s: 'The heart of the brasero.' },
      es: { t: 'Carnes y Pescados', s: 'El corazón del brasero.' },
    },
    desserts: {
      fr: { t: 'Les Desserts', s: 'La touche finale, en douceur.' },
      en: { t: 'The Desserts', s: 'The final, sweet touch.' },
      es: { t: 'Los Postres', s: 'El toque final, dulce.' },
    },
    services: {
      fr: { t: 'Les Services', s: 'Comment souhaitez-vous être accompagnés ?' },
      en: { t: 'Services', s: 'How would you like to be supported?' },
      es: { t: 'Servicios', s: '¿Cómo deseas que te acompañemos?' },
    },
    message: {
      fr: { t: 'Un mot pour nous', s: 'Tout ce qui rendra votre jour unique.' },
      en: { t: 'A word for us', s: 'Anything that will make your day unique.' },
      es: { t: 'Unas palabras', s: 'Todo lo que hará tu día único.' },
    },
    summary: {
      fr: { t: 'Résumé & Envoi', s: '' },
      en: { t: 'Summary & Send', s: '' },
      es: { t: 'Resumen & Envío', s: '' },
    },
  },

  FIELDS: {
    name:    { fr: 'Nom & Prénom',            en: 'Name & Surname',        es: 'Nombre y Apellido' },
    email:   { fr: 'Email',                   en: 'Email',                 es: 'Email' },
    phone:   { fr: 'Téléphone',               en: 'Phone',                 es: 'Teléfono' },
    date:    { fr: 'Date du mariage',         en: 'Wedding date',          es: 'Fecha de la boda' },
    guests:  { fr: 'Nombre d\u2019invités',    en: 'Number of guests',      es: 'Número de invitados' },
    venue:   { fr: 'Type de lieu',            en: 'Type of venue',         es: 'Tipo de lugar' },
    address: { fr: 'Adresse / Ville',         en: 'Address / City',        es: 'Dirección / Ciudad' },
    apero:   { fr: 'Heure de l\u2019apéritif', en: 'Apéritif time',         es: 'Hora del aperitivo' },
    service: { fr: 'Heure du service principal', en: 'Main service time',  es: 'Hora del servicio principal' },
  },

  VENUES: [
    { id: 'villa',   fr: 'Villa privée',      en: 'Private villa',     es: 'Villa privada' },
    { id: 'domaine', fr: 'Domaine & Château', en: 'Estate & Château',  es: 'Finca y Castillo' },
    { id: 'hotel',   fr: 'Hôtel',             en: 'Hotel',             es: 'Hotel' },
    { id: 'plage',   fr: 'Plage & Vue mer',   en: 'Beach & Sea view',  es: 'Playa y Vista al mar' },
    { id: 'autre',   fr: 'Autre',             en: 'Other',             es: 'Otro' },
  ],

  TYPES: [
    { id: 'welcome',  icon: '🥂',
      fr: { t: 'Welcome Dinner',        d: 'Dîner de bienvenue la veille du mariage' },
      en: { t: 'Welcome Dinner',        d: 'Welcome dinner the evening before the wedding' },
      es: { t: 'Welcome Dinner',        d: 'Cena de bienvenida la víspera de la boda' } },
    { id: 'civil',    icon: '💍',
      fr: { t: 'Mariage Civil',         d: 'Réception après la cérémonie civile' },
      en: { t: 'Civil Wedding',         d: 'Reception after the civil ceremony' },
      es: { t: 'Boda Civil',            d: 'Recepción tras la ceremonia civil' } },
    { id: 'reception', icon: '💃',
      fr: { t: 'Réception de Mariage',  d: 'Le grand banquet, la fête principale' },
      en: { t: 'Wedding Reception',     d: 'The grand banquet, the main celebration' },
      es: { t: 'Recepción de Boda',     d: 'El gran banquete, la celebración principal' } },
    { id: 'brunch',   icon: '🌅',
      fr: { t: 'Brunch Après Mariage',  d: 'Lendemain de fête, moment convivial et décontracté' },
      en: { t: 'Post-Wedding Brunch',   d: 'The day after — a relaxed, convivial moment' },
      es: { t: 'Brunch Post-Boda',      d: 'El día después — un momento distendido y conviviale' } },
    { id: 'cocktail', icon: '✨',
      fr: { t: 'Cocktail Dînatoire',    d: 'Format cocktail élégant, tapas & buffet' },
      en: { t: 'Cocktail Dinner',       d: 'Elegant cocktail format, tapas & buffet' },
      es: { t: 'Cóctel Cena',           d: 'Formato cóctel elegante, tapas y buffet' } },
  ],

  ENTREES: [
    { id: 'empanadas',
      fr: 'Empanadas, spécialité argentine (bœuf traditionnel, poulet ou option végétarienne)',
      en: 'Empanadas, Argentine specialty (traditional beef, chicken or vegetarian option)',
      es: 'Empanadas, especialidad argentina (carne tradicional, pollo u opción vegetariana)' },
    { id: 'chorizo',
      fr: 'Tapas au chorizo argentin grillé, sauce Chimichurri, pain artisanal',
      en: 'Grilled Argentine chorizo tapas, Chimichurri sauce, artisan bread',
      es: 'Tapas de chorizo argentino a la parrilla, salsa Chimichurri, pan artesanal' },
    { id: 'secreto',
      fr: 'Secreto de porc ibérique, zucchini grillé, citron, sel & poivre',
      en: 'Ibérico pork secreto, grilled zucchini, lemon, salt & pepper',
      es: 'Secreto de cerdo ibérico, calabacín a la parrilla, limón, sal y pimienta' },
    { id: 'brochettes',
      fr: 'Brochettes de jambon ibérique, tomate, melon, mozzarella, basilic',
      en: 'Ibérico ham skewers, tomato, melon, mozzarella, basil',
      es: 'Brochetas de jamón ibérico, tomate, melón, mozzarella, albahaca' },
    { id: 'miniburger',
      fr: 'Miniburger maison au brasero, salsa Fuegos, fromage, cornichons et pain brioché',
      en: 'House brasero mini-burger, Fuegos salsa, cheese, pickles and brioche bun',
      es: 'Mini hamburguesa casera al brasero, salsa Fuegos, queso, pepinillos y pan brioche' },
    { id: 'salade-tomate',
      fr: 'Salade de tomates au basilic, mozzarella di Bufala et olives',
      en: 'Tomato salad with basil, mozzarella di Bufala and olives',
      es: 'Ensalada de tomate con albahaca, mozzarella di Bufala y aceitunas' },
    { id: 'salade-artichaut',
      fr: 'Salade d\u2019artichauts grillés, huile d\u2019olive, citron et parmesan',
      en: 'Grilled artichoke salad, olive oil, lemon and parmesan',
      es: 'Ensalada de alcachofas a la parrilla, aceite de oliva, limón y parmesano' },
  ],

  VIANDES: [
    { id: 'picanha',  fr: 'Picanha', en: 'Picanha', es: 'Picanha',
      o: { fr: 'origine Argentine', en: 'origin Argentina', es: 'origen Argentina' } },
    { id: 'entrecote', fr: 'Entrecôte / Ribeye', en: 'Entrecôte / Ribeye', es: 'Entrecot / Ribeye',
      o: { fr: 'origine France', en: 'origin France', es: 'origen Francia' } },
    { id: 'cote',     fr: 'Côte de bœuf', en: 'Côte de bœuf', es: 'Chuletón de vaca',
      o: { fr: 'origine France', en: 'origin France', es: 'origen Francia' } },
    { id: 'bavette',  fr: 'Bavette', en: 'Bavette', es: 'Entraña',
      o: { fr: 'origine Irlande', en: 'origin Ireland', es: 'origen Irlanda' } },
    { id: 'magret',   fr: 'Magret de canard', en: 'Duck breast', es: 'Magret de pato',
      o: { fr: 'origine France', en: 'origin France', es: 'origen Francia' } },
    { id: 'saumon',   fr: 'Saumon grillé', en: 'Grilled salmon', es: 'Salmón a la parrilla',
      o: { fr: 'origine Norvège', en: 'origin Norway', es: 'origen Noruega' } },
  ],

  DESSERTS: [
    { id: 'panqueques',
      fr: 'Panqueques au brasero, dulce de leche fondant, glace à la vanille et crumble de pommes grillées aux noix & spéculoos',
      en: 'Brasero pancakes, molten dulce de leche, vanilla ice cream and grilled-apple crumble with nuts & speculoos',
      es: 'Panqueques al brasero, dulce de leche fundente, helado de vainilla y crumble de manzana a la parrilla con nueces y speculoos' },
    { id: 'fruits',
      fr: 'Fruits de saison grillés, flambés au Cognac, servis avec glace et crumble de noix & spéculoos',
      en: 'Grilled seasonal fruit, flambéed in Cognac, served with ice cream and nut & speculoos crumble',
      es: 'Frutas de estación a la parrilla, flambeadas al Cognac, con helado y crumble de nueces y speculoos' },
    { id: 'fromages',
      fr: 'Sélection de fromages ou pâtisseries françaises (sur demande spéciale)',
      en: 'Selection of French cheeses or pastries (on special request)',
      es: 'Selección de quesos o pastelería francesa (bajo petición especial)' },
  ],

  SERVICES: [
    { id: 'table',     fr: 'Service à table',                          en: 'Table service',                       es: 'Servicio en mesa' },
    { id: 'buffet',    fr: 'Buffet / Format libre',                    en: 'Buffet / Free format',                es: 'Buffet / Formato libre' },
    { id: 'deco',      fr: 'Mise en place & décoration de table',      en: 'Table setup & decoration',            es: 'Montaje y decoración de mesa' },
    { id: 'personnel', fr: 'Personnel de service (serveurs)',          en: 'Service staff (waiters)',             es: 'Personal de servicio (camareros)' },
    { id: 'location',  fr: 'Location matériel (tables, chaises, vaisselle)', en: 'Equipment rental (tables, chairs, tableware)', es: 'Alquiler de material (mesas, sillas, vajilla)' },
  ],

  messagePlaceholder: {
    fr: 'Informations complémentaires, demandes spéciales, questions…',
    en: 'Additional information, special requests, questions…',
    es: 'Información adicional, peticiones especiales, preguntas…',
  }
} as const;

export type StepKey = typeof FORM_DATA.STEPS[number]['key'];
export type UIStrings = typeof FORM_DATA.UI[Lang];
