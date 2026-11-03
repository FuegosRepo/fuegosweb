import type { Metadata } from 'next'
import { Navbar } from '@/components/mariage/Navbar'
import { Footer } from '@/components/mariage/Footer'

const TITLE = "Fuegos d'Azur Mariages — Traiteur brasero pour votre mariage sur la Côte d'Azur"
const DESCRIPTION =
  "L'expérience Fuegos d'Azur pour votre mariage : gastronomie au feu de bois, brasero en direct et service sur mesure sur la Côte d'Azur."
// TODO(fotos-cliente): reemplazar por la foto de los novios sirviéndose o la del château (1200x630).
const OG_IMAGE = '/images/mariage/og-mariage.jpg'

// Open Graph propio de la landing. Sin esto, /mariage heredaba el de la web
// general ("Service Traiteur Brasero Argentin", og:url apuntando a la home).
// Va en este layout y no en app/mariage/layout.tsx para no afectar /mariage/form.
export const metadata: Metadata = {
  alternates: { canonical: '/mariage/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://fuegosdazur.com/mariage/',
    siteName: "Fuegos d'Azur Mariages",
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Fuegos d'Azur Mariages — French Riviera" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function MariageLandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
