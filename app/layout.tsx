import type { Metadata, Viewport } from 'next'
import { Crimson_Pro, Knewave, Ephesis } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ServiceWorkerProvider } from '@/components/service-worker-provider'
import SplashScreen from '@/components/splash-screen'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fuegos d\'Azur - Service Traiteur Brasero Argentin Côte d\'Azur | Asado Authentique',
  description: 'Service traiteur spécialisé en brasero argentin sur la Côte d\'Azur. Asado authentique, viande premium, événements privés et professionnels. Devis gratuit.',
  keywords: 'traiteur brasero, asado argentin, barbecue argentin, côte d\'azur, événements, mariage, viande argentine, grillades, service traiteur, nice, cannes, antibes',
  authors: [{ name: 'Fuegos d\'Azur' }],
  creator: 'Fuegos d\'Azur',
  publisher: 'Fuegos d\'Azur',
  robots: 'index, follow',
  openGraph: {
    title: 'Fuegos d\'Azur - Service Traiteur Brasero Argentin Côte d\'Azur',
    description: 'Service traiteur spécialisé en brasero argentin sur la Côte d\'Azur. Asado authentique pour vos événements.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Fuegos d\'Azur',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fuegos d\'Azur - Service Traiteur Brasero Argentin',
    description: 'Service traiteur spécialisé en brasero argentin sur la Côte d\'Azur.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-crimson-pro',
  display: 'swap',
})

const knewave = Knewave({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-knewave',
  display: 'swap',
})

const ephesis = Ephesis({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-ephesis',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${crimsonPro.className} ${crimsonPro.variable} ${GeistMono.variable} ${knewave.variable} ${ephesis.variable}`}>
        <ServiceWorkerProvider>
          <SplashScreen />
          {children}
        </ServiceWorkerProvider>
        <Analytics />
      </body>
    </html>
  )
}
