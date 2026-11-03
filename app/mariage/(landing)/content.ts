/**
 * Contenido de la landing /mariage: textos, fotos e iconos en un solo lugar.
 *
 * - Para cambiar una foto, solo hay que tocar `src` (y `width`/`height` reales)
 *   aquí: la página no tiene rutas hardcodeadas.
 * - Separar el contenido del markup deja la puerta abierta a una versión en
 *   inglés (content.en.ts) sin rehacer los componentes.
 *
 * Tipografía francesa: antes de ? ! : ; y dentro de « » va un espacio fino
 * irrompible (U+202F). Usamos la constante NNBSP para que se vea en el código.
 */

export const NNBSP = ' ' // espacio fino irrompible
export const NBSP = ' ' // espacio irrompible (evita palabra sola al final)

export type Photo = {
  src: string
  alt: string
  width: number
  height: number
  /** Encuadre cuando la foto se recorta (object-position). */
  focus?: string
}

export type Icon = {
  src: string
  /** Tamaño real del PNG (recortado), usado para igualar el peso visual. */
  width: number
  height: number
}

// ---------------------------------------------------------------------------
// Iconos (public/images/mariage/icons). Lógica de color del cliente:
// dorado = fuego y lugares · azul = mar y lo fresco · negro = figuras y mesa.
// ---------------------------------------------------------------------------
const icon = (name: string, width: number, height: number): Icon => ({
  src: `/images/mariage/icons/il-${name}.png`,
  width,
  height,
})

export const ICONS = {
  couple: icon('couple', 400, 348), // dorado — L'Expérience
  flammes: icon('flammes', 400, 305), // dorado — Signature: feu de bois
  chef: icon('chef', 289, 400), // negro — Signature: en direct
  olives: icon('olives', 400, 378), // dorado — Signature: produits
  vagues: icon('vagues', 400, 104), // azul — Signature: sur mesure + footer
  champagne: icon('champagne', 128, 400), // azul — Services: apéritif
  brochette: icon('brochette', 400, 246), // dorado — Services: brasero
  artichaut: icon('artichaut', 357, 400), // azul — Services: accompagnements
  gateau: icon('gateau', 238, 400), // negro — Services: desserts
  chateau: icon('chateau', 399, 400), // dorado — Lieux
  couverts: icon('couverts', 170, 400), // negro — FAQ
  candelabre: icon('candelabre', 217, 400), // dorado — CTA final
} as const

// ---------------------------------------------------------------------------
// Fotos. V2 = fotos nuevas del cliente (public/images/mariage/v2, webp ≤2200px).
// TODO(fotos-cliente): las marcadas "FALTA" usan provisoriamente otra foto
// nueva (sin carne cruda) hasta que llegue la definitiva.
// ---------------------------------------------------------------------------
const V2 = '/images/mariage/v2'
const OLD = '/images/mariage'

export const HERO = {
  // Poster: "las carnes doradas sobre las papas, con el paisaje detrás".
  poster: {
    src: `${V2}/hero-carnes-paysage.webp`,
    alt: '',
    width: 2200,
    height: 1238,
    focus: 'center 55%',
  } satisfies Photo,
  video: '/videos/mariage-hero.mp4',
  logo: { src: '/images/mariage/logoHero.webp', width: 400, height: 500 },
  title: 'Votre mariage autour du feu',
  subtitle: `Traiteur brasero sur la Côte d'Azur — une expérience culinaire vivante, élégante et sur${NBSP}mesure.`,
  cta: 'Demander un devis',
  trust: ['De Monaco à Saint-Tropez', 'De 20 à 300 convives', 'Réponse sous 48 h'],
}

export const HIGHLIGHT_QUOTE = {
  quote: `C'était tout simplement parfait.`,
  author: `Laure-Sophie, mariée sur la Côte d'Azur`,
}

export const BIENVENUE = {
  // El cliente no pidió reemplazo para este bloque; la foto anterior era carne
  // cruda, así que usamos la del asador con las montañas detrás.
  main: {
    src: `${V2}/chef-brasero.webp`,
    alt: "L'asador de Fuegos d'Azur au brasero, face aux montagnes",
    width: 1467,
    height: 2200,
    focus: 'center 30%',
  } satisfies Photo,
  accent: {
    src: `${OLD}/IMG_1703.jpg`,
    alt: "L'asador au brasero",
    width: 1326,
    height: 1988,
  } satisfies Photo,
}

export const SIGNATURE = [
  {
    icon: ICONS.flammes,
    title: 'Cuisson au feu de bois',
    desc: `L'authenticité de l'asado, le goût unique du${NBSP}feu.`,
  },
  {
    icon: ICONS.chef,
    title: 'Une expérience en direct',
    desc: `L'asador cuisine devant vos invités, au cœur de la${NBSP}réception.`,
  },
  {
    icon: ICONS.olives,
    title: 'Produits sélectionnés',
    desc: `Viandes d'exception et produits de saison, choisis avec${NBSP}exigence.`,
  },
  {
    icon: ICONS.vagues,
    title: 'Un service sur mesure',
    desc: `Pensé pour votre lieu, votre format et votre${NBSP}histoire.`,
  },
]

export const SERVICES: {
  photo: Photo
  icon: Icon
  title: string
  desc: string
}[] = [
  {
    // Nueva: tabla de charcutería con jamón, salame, chorizo, uvas y frutas.
    photo: { src: `${V2}/svc-charcuterie.webp`, alt: "Planche de charcuterie et fruits pour l'apéritif", width: 1365, height: 2048 },
    icon: ICONS.champagne,
    title: 'Apéritif & Entrées',
    desc: `Pendant le cocktail, nos entrées circulent en format finger food${NNBSP}: des bouchées élégantes, préparées à la minute au brasero et à la plancha, servies au plus près de vos invités. Une première rencontre avec le feu, conviviale et${NBSP}raffinée.`,
  },
  {
    // Nueva: fuego con comida en la parrilla + invitado de traje azul claro.
    photo: { src: `${V2}/svc-brasero-invite.webp`, alt: 'Le brasero en pleine cuisson, un invité en costume bleu clair en arrière-plan', width: 1753, height: 2200, focus: 'center 35%' },
    icon: ICONS.brochette,
    title: 'Le Brasero — Plats principaux',
    desc: `Le moment signature. Les viandes sont cuites en direct, présentées et découpées face au brasero. Chacun choisit sa cuisson, échange avec l'asador et vit le spectacle du feu de${NBSP}près.`,
  },
  {
    // Nueva: caprese de tomates de colores con mozzarella y albahaca.
    photo: { src: `${V2}/svc-caprese.webp`, alt: 'Salade caprese de tomates anciennes, mozzarella et basilic', width: 2200, height: 1651 },
    icon: ICONS.artichaut,
    title: 'Accompagnements',
    desc: `Les accompagnements sont présentés en buffet${NNBSP}: une table généreuse et soignée, aux couleurs de saison, qui accompagne les viandes et s'adapte à tous les${NBSP}goûts.`,
  },
  {
    // Plato servido con las cacerolas de cobre, luz dorada.
    photo: { src: `${V2}/svc-dessert-cuivre.webp`, alt: 'Assiette servie à côté des casseroles en cuivre, lumière dorée', width: 2200, height: 2120 },
    icon: ICONS.gateau,
    title: 'Desserts',
    desc: `Pour clore le repas${NNBSP}: nos desserts signature préparés en direct à la plancha, dont les incontournables panqueques au dulce de leche et crumble caramélisé de noix et${NBSP}spéculoos.`,
  },
]

export const REEL = {
  // Hasta que llegue la versión horizontal se muestra como reel vertical.
  // Versión web: 720p, índice al principio (faststart), 4,6 MB (el original
  // pesa 37 MB y lo sigue usando /service-traiteur).
  // OJO: el original trae marca de agua "clideo.com"; la versión nueva del
  // cliente debería venir sin ella.
  src: '/video-historia/reel-fuegos-d-azur-web.mp4',
  // Portada: los novios bajo el árbol (seg. 11), sin la marca de agua.
  poster: '/images/mariage/reel-poster-maries.jpg',
  vertical: true,
}

/**
 * Galería: el orden cuenta una historia (fiesta, novios, mesa, fuego, entorno, postre).
 * Se muestran enteras, en su proporción (sin recorte cuadrado).
 */
export const GALLERY: (Photo & { caption: string })[] = [
  // 1. Novio en andas, brazos arriba, guirnaldas de noche.
  { src: `${V2}/gal-invites-marie.webp`, width: 1467, height: 2200, caption: 'Invités & Ambiance', alt: 'Le marié porté par ses invités sous les guirlandes lumineuses' },
  // 2. Novios sirviéndose, él abrazándola, luz violeta.
  { src: `${V2}/gal-maries-brasero.webp`, width: 1467, height: 2200, caption: 'Les Mariés au brasero', alt: 'Les mariés se servent au brasero' },
  // 3. Mesa de noche con velas, copas y flores blancas.
  { src: `${V2}/gal-table-nuit.webp`, width: 1467, height: 2200, caption: 'Tables & Décoration', alt: 'Table dressée de nuit avec bougies, verres et fleurs blanches' },
  // 4. Asador de noche, fuego en la cara, pinza en la mano.
  { src: `${V2}/gal-asador-nuit.webp`, width: 1467, height: 2200, caption: "L'Asador — Cuisson au feu", alt: "L'asador au travail, le visage éclairé par le feu" },
  // 5. Pueblo medieval al fondo, guirnaldas, invitados abajo. Vertical: NO recortar.
  { src: `${V2}/village-guirlandes-invites.webp`, width: 1467, height: 2200, caption: "Un soir sur la Côte d'Azur", alt: 'Invités sous les guirlandes, village médiéval en arrière-plan' },
  // 6. Mano con guante negro espolvoreando crumble sobre el helado.
  { src: `${V2}/dessert-crumble.webp`, width: 1651, height: 2200, caption: 'Desserts en direct', alt: 'Crumble saupoudré en direct sur une glace' },
]

export const LIEUX: (Photo & { tag: string; name: string })[] = [
  // 1. Château de Crémat (castillo rojo) sobre viñedos en terrazas.
  { src: `${V2}/lieu-chateau-cremat.webp`, width: 1651, height: 2200, tag: 'Châteaux & Domaines', name: 'Château de Crémat, Nice', alt: 'Le Château de Crémat au-dessus des vignes en terrasses' },
  // 2. Pueblo medieval horizontal, sin gente. TODO: nombre confirmado por el cliente.
  { src: `${V2}/lieu-village.webp`, width: 2200, height: 1467, tag: 'Villages perchés', name: 'À confirmer', alt: 'Village médiéval perché', focus: '60% center' },
  // 3. FALTA: vista a viñedos y castillo desde la mesa, cacerola de cobre. TODO: nombre.
  // Provisoria: las carnes doradas con el paisaje detrás.
  { src: `${V2}/hero-carnes-paysage.webp`, width: 2200, height: 1238, tag: 'Vue sur les vignes', name: 'À confirmer', alt: 'Vue sur les vignes et le château depuis la table' },
]

export const EQUIPE = {
  // FALTA: los tres del equipo trabajando juntos en el brasero.
  // Provisoria: dos del equipo sirviendo de noche.
  photo: { src: `${V2}/equipe-service.webp`, alt: "L'équipe Fuegos d'Azur au service", width: 1467, height: 2200 } satisfies Photo,
  title: 'Les hommes derrière le feu',
  text: `Trois amis venus d'Argentine et d'Uruguay, installés sur la Côte d'Azur, réunis par la même passion${NNBSP}: le feu, le partage et la table. Nous cuisinons chez vous comme nous cuisinons chez${NBSP}nous.`,
}

export const TESTIMONIALS = [
  {
    quote: `C'était tout simplement parfait. La cuisson au brasero en direct devant nos invités a apporté une magie unique et chaleureuse à notre réception. Merci pour votre professionnalisme et votre${NBSP}gentillesse.`,
    author: `Laure-Sophie V. — Mariage sur la Côte d'Azur`,
  },
  {
    quote: `Le cocktail et le repas brasero ont marqué tous nos invités. Un service impeccable, une viande d'une tendreté exceptionnelle et une ambiance conviviale inoubliable pour notre${NBSP}mariage.`,
    author: 'Jenna T. — Mariage & Brunch',
  },
]

const q = (text: string) => text.replace(/ ([?!:;])/g, `${NNBSP}$1`)

export const FAQ = [
  {
    q: q(`Combien d'invités pouvez-vous accueillir ?`),
    a: `Nous travaillons pour des mariages de 20 à 300 convives. Chaque prestation est dimensionnée à la taille de votre${NBSP}événement.`,
  },
  {
    q: q('Où intervenez-vous ?'),
    a: `Sur toute la Côte d'Azur — de Monaco à Saint-Tropez — et au-delà sur${NBSP}demande.`,
  },
  {
    q: q('Que comprend votre service ?'),
    a: `L'équipe de cuisine et de service, tout le matériel de cuisson, la mise en place et le déroulé complet du repas, de l'apéritif au${NBSP}dessert.`,
  },
  {
    q: q(`Comment fonctionne le brasero ? Est-ce adapté à tous les lieux ?`),
    a: `Notre brasero est autonome et s'installe en extérieur, sur la plupart des terrains. Nous validons l'emplacement en amont avec vous et avec le lieu de${NBSP}réception.`,
  },
  {
    q: q('Quand arrivez-vous et combien de temps dure le service ?'),
    a: `Nous arrivons plusieurs heures avant le début pour l'installation et l'allumage du feu. Le service s'adapte ensuite au déroulé de votre${NBSP}journée.`,
  },
  {
    q: q('Que se passe-t-il en cas de pluie ?'),
    a: `Nous prévoyons toujours une solution de repli avec vous et le lieu${NNBSP}: espace couvert, tente ou adaptation du${NBSP}dispositif.`,
  },
  {
    q: q('Proposez-vous des options végétariennes ou adaptées aux restrictions alimentaires ?'),
    a: `Oui. Tous nos menus s'adaptent à vos besoins${NNBSP}: végétarien, sans gluten, allergies${NBSP}alimentaires.`,
  },
  {
    q: q('Fournissez-vous la vaisselle et le mobilier ?'),
    a: `Nous assurons tout le matériel de cuisson. Pour la vaisselle, le mobilier et la décoration, nous travaillons en coordination avec vos prestataires ou vous recommandons nos partenaires de${NBSP}confiance.`,
  },
]

export const CTA = {
  // Mesa con velas y flores al anochecer, bajo el árbol.
  photo: { src: `${V2}/cta-table-arbre.webp`, alt: '', width: 1467, height: 2200 } satisfies Photo,
}
