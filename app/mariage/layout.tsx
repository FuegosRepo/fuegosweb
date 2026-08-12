import type { Metadata } from 'next'
import { Cormorant_Garamond, Great_Vibes, Montserrat } from 'next/font/google'
import './mariage.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Fuegos d'Azur Mariages — Traiteur brasero pour votre mariage sur la Côte d'Azur",
  description: "L'expérience Fuegos d'Azur pour votre mariage : gastronomie au feu de bois, brasero en direct et service sur mesure sur la Côte d'Azur.",
}

export default function MariageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`mariage-wrapper ${cormorant.variable} ${greatVibes.variable} ${montserrat.variable} min-h-screen`}>
      {children}
    </div>
  )
}

