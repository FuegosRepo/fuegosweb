import { Navbar } from '@/components/mariage/Navbar'
import { Footer } from '@/components/mariage/Footer'

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
