// Constantes centralizadas para Fuegos d'Azur
export const CONTACT_INFO = {
  phones: {
    primary: '07 50 85 35 99',
    secondary: '06 70 65 97 84'
  },
  email: 'contact@fuegosdazur.fr',
  address: 'Côte d\'Azur, France',
  team: 'Agustin Ormaechea, Jeronimo Negrotto, Martin Freytes'
} as const

export const COMPANY_INFO = {
  name: 'Fuegos d\'Azur',
  description: 'Service traiteur spécialisé dans l\'asado argentin sur la Côte d\'Azur',
  logo: '/logo/minilogo.webp',
  founders: ['Agustin Ormaechea', 'Jeronimo Negrotto', 'Martin Freytes', 'Équipe Fuegos d\'Azur'],
  copyright: '© 2024 Fuegos d\'Azur. Tous droits réservés.'
} as const

export const NAVIGATION_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/notre-histoire', label: 'Notre Histoire' },
  { href: '/service-traiteur', label: 'Service Traiteur' },
  { href: '/catering', label: 'Devis Gratuit' },
  { href: '/faq', label: 'FAQ' }
] as const

export const BRAND_COLORS = {
  primary: '#e2943a',
  primaryRgb: '226, 148, 58',
  secondary: '#F5E6D3',
  dark: '#1c1917', // stone-900
  light: '#f5f5f4' // stone-100
} as const

export const GOOGLE_PLACES = {
  placeId: 'ChIJA9DLimaPZk4Rss-Lx9t7V10',
  defaultRating: 4.8
} as const

export const SEO_DEFAULTS = {
  siteName: 'Fuegos d\'Azur',
  defaultTitle: 'Fuegos d\'Azur - Traiteur Asado Argentin sur la Côte d\'Azur',
  defaultDescription: 'Service traiteur spécialisé dans l\'asado argentin. Événements privés et professionnels sur la Côte d\'Azur. Cuisine au feu de bois, produits de qualité.',
  keywords: ['traiteur', 'asado', 'argentin', 'côte d\'azur', 'barbecue', 'événements', 'mariage', 'entreprise'],
  author: 'Fuegos d\'Azur',
  locale: 'fr_FR'
} as const
