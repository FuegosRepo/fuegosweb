'use client'

import { useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ModernNavigation from "@/components/modern-navigation"
import { HeroVideo } from "@/components/hero-video"
import {
  DynamicModernCardsSlider,
  DynamicGallerySection,
  DynamicElfsightReviews
} from "@/components/dynamic-components"
import { Footer } from "@/components/ui/footer"

export default function HomePage() {
  const logosContainerRef = useRef<HTMLDivElement>(null)

  const scrollLogos = useCallback((direction: 'left' | 'right') => {
    if (logosContainerRef.current) {
      const scrollAmount = 200
      logosContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Modern Navigation */}
      <ModernNavigation currentPage="home" />

      <HeroVideo />

      {/* Breve descripción bajo el video principal */}
      <section className="py-8 sm:py-10 text-white" style={{ backgroundColor: '#e2943a' }}>
        <div className="container mx-auto px-4 text-center">
          <p className="font-ephesis font-semibold tracking-wider text-2xl sm:text-3xl md:text-4xl mb-2" style={{ color: '#000' }}>
            Bienvenue
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white px-2">
            <span className="font-medium inline-block">NOUS VOUS INVITONS À VENIR DÉCOUVRIR &ldquo;EL ASADO&rdquo;. TRAITEUR BRASERO ARGENTIN, AVEC UNE TOUCHE RÉGIONALE.</span>
          </p>
        </div>
      </section>


      {/* Events Section with Accordion Slider */}
      <section
        className="py-12 sm:py-16 lg:py-20 bg-orange-200 relative overflow-hidden"
        style={{
          backgroundImage: `url('/ground-overlay-01.png')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        {/* Background text effect */}
        <div className="absolute inset-0 flex items-start pt-8 sm:pt-12 lg:pt-16 opacity-10 overflow-hidden">
          <div className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white whitespace-nowrap marquee-text">
            ÉVÉNEMENTS • ÉVÉNEMENTS • ÉVÉNEMENTS • ÉVÉNEMENTS • ÉVÉNEMENTS • ÉVÉNEMENTS •
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <p className="font-ephesis font-semibold mb-3 sm:mb-4 tracking-wider text-2xl sm:text-3xl md:text-4xl text-black">Événements</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 lg:mb-8 text-[#e2943a]">Événements Que Nous Couvrons</h2>
            <p className=" mx-auto text-base sm:text-lg text-black px-4">Découvrez nos services de traiteur pour tous types d&apos;événements avec l&apos;authenticité de l&apos;asado argentin</p>
          </div>

          <DynamicModernCardsSlider
            items={[
              {
                id: 'corporatif',
                number: '01',
                title: 'Corporatif',
                description: 'Menu simple pour événements d&apos;entreprise.',
                image: '/img-eventos/corporatif.webp',
                alt: 'Événement Corporate'
              },
              {
                id: 'weddings',
                number: '02',
                title: 'Mariages',
                description: 'Menu plus complet et personnalisé, avec option de serveurs et de bar.',
                image: '/img-eventos/mariage.webp',
                alt: 'Mariage'
              },
              {
                id: 'parties',
                number: '03',
                title: 'Fêtes Privées',
                description: 'Menu sur mesure, avec possibilité de location de matériel et d\'extras.',
                image: '/img-eventos/fetes-prives.webp',
                alt: 'Fête Privée'
              }
            ]}
            className="max-w-7xl mx-auto"
          />

          {/* Button to Service Traiteur */}
          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <Link href="/service-traiteur">
              <Button variant="brandOutlineLight" className="px-6 sm:px-8 py-2.5 sm:py-3 font-medium text-base sm:text-lg text-black  border-black border-2">
                <span className="font-medium">DÉCOUVRIR NOS SERVICES</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* Quality Section */}
      <section className="py-12 sm:py-16 lg:py-20 text-white" style={{ backgroundColor: '#e2943a' }}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src="/img-qualite/calidad.webp"
                alt="Ingrédients de qualité"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="font-ephesis font-semibold mb-4 tracking-wide text-2xl sm:text-3xl md:text-4xl" style={{ color: '#000' }}>Qualité Supérieure</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Ingrédients de Haute Qualité</h2>
              <p className="mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base" style={{ color: '#F5E6D3' }}>
                Nous sélectionnons rigoureusement nos viandes et ingrédients pour vous offrir une expérience culinaire
                authentique. Chaque produit est choisi pour sa qualité exceptionnelle et son origine contrôlée.
              </p>
              <p className="mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base" style={{ color: '#F5E6D3' }}>
                Notre savoir-faire argentin combiné aux produits locaux de la Côte d&apos;Azur crée une fusion unique qui
                ravira vos invités et marquera vos événements.
              </p>
              <Link href="/catering">
                <Button variant="brandOutlineLight" className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base border-2">
                  DEMANDER UN DEVIS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Gallery Section with Lightbox */}
      <DynamicGallerySection />

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 text-white" style={{ backgroundColor: '#e2943a' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-black">Contactez-nous pour un devis personnalisé</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8" style={{ color: '#F5E6D3' }}>Transformez votre événement en expérience inoubliable</p>
          <Link href="/catering">
            <Button variant="brandOutlineLight" className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 text-base sm:text-lg border-2 text-black border-black">
              ASADO SUR-MESURE
            </Button>
          </Link>
        </div>
      </section>

      {/* Client Logos Section (movido al final) */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-orange-50 to-orange-100 border-t border-orange-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block px-3 sm:px-4 py-2 text-2xl sm:text-3xl md:text-4xl font-ephesis font-semibold tracking-wider mb-3 sm:mb-4" text-black>
              Confiance
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-3 sm:mb-4" style={{ color: '#e2943a' }}>
              Ils Nous Font Confiance
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg px-4 sm:px-0">
              Des marques prestigieuses et des clients satisfaits qui témoignent de notre professionnalisme et de la
              qualité exceptionnelle de nos services d&apos;asado argentin.
            </p>
          </div>

          {/* Horizontal Scroll Logo Section - Mobile & Desktop */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scrollLogos('left')}
              className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg p-2 sm:p-2.5 lg:p-3 transition-all duration-300 hover:scale-110 border-2 border-[#e2943a] rounded-lg"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#e2943a' }} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scrollLogos('right')}
              className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg p-2 sm:p-2.5 lg:p-3 transition-all duration-300 hover:scale-110 border-2 border-[#e2943a] rounded-lg"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#e2943a' }} />
            </button>

            <div ref={logosContainerRef} className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 sm:gap-6 lg:gap-8 pb-4 px-4 sm:px-6 lg:px-8 min-w-max">
                <div className="flex items-center justify-center min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] h-16 sm:h-20 lg:h-24 flex-shrink-0 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <Image
                    src="/brands/lambo.webp"
                    alt="Lamborghini"
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="flex items-center justify-center min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] h-16 sm:h-20 lg:h-24 flex-shrink-0 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <Image
                    src="/brands/Ineos.webp"
                    alt="Ineos"
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="flex items-center justify-center min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] h-16 sm:h-20 lg:h-24 flex-shrink-0 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <Image
                    src="/brands/sophia.webp"
                    alt="Sophia Antipolis"
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="flex items-center justify-center min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] h-16 sm:h-20 lg:h-24 flex-shrink-0 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <Image
                    src="/brands/universite.webp"
                    alt="Université"
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="flex items-center justify-center min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] h-16 sm:h-20 lg:h-24 flex-shrink-0 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <Image
                    src="/brands/dumez.webp"
                    alt="Dumez"
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="flex items-center justify-center min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] h-16 sm:h-20 lg:h-24 flex-shrink-0 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <Image
                    src="/brands/Nicois.webp"
                    alt="Nicois"
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="flex items-center justify-center min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] h-16 sm:h-20 lg:h-24 flex-shrink-0 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <Image
                    src="/brands/opio.webp"
                    alt="Opio"
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Scroll indicator for mobile */}
            <div className="flex justify-center mt-4 md:hidden">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span>←</span>
                Faites défiler pour voir plus
                <span>→</span>
              </p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 md:mt-16">
            {/* Mobile Layout - Horizontal Cards */}
            <div className="md:hidden space-y-3">
              <div className="flex items-center bg-black/80 backdrop-blur-sm rounded-xl p-4 shadow-md group hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#e2943a' }}>
                  <Image src="/icons/star.png" alt="Star icon" width={24} height={24} className="object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base text-[#e2943a] mb-1">Qualité Garantie</h3>
                  <p className="text-[#e2943a] text-xs leading-tight">Ingrédients premium et service professionnel</p>
                </div>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md group hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#e2943a' }}>
                  <Image src="/icons/telefono.png" alt="Phone icon" width={24} height={24} className="object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base text-[#e2943a] mb-1">Service Personnalisé</h3>
                  <p className="text-[#e2943a] text-xs leading-tight">Accompagnement sur-mesure pour chaque événement</p>
                </div>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md group hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#e2943a' }}>
                  <Image src="/icons/fireworks.png" alt="Fireworks icon" width={24} height={24} className="object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base text-[#e2943a] mb-1">Expérience Authentique</h3>
                  <p className="text-[#e2943a] text-xs leading-tight">Tradition argentine avec une touche régionale</p>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Original Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#e2943a' }}>
                  <Image src="/icons/star.png" alt="Star icon" width={40} height={40} className="object-contain" />
                </div>
                <h3 className="font-bold mb-3 text-xl text-[#e2943a]">Qualité Garantie</h3>
                <p className="text-black">Ingrédients premium et service professionnel</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#e2943a' }}>
                  <Image src="/icons/telefono.png" alt="Phone icon" width={40} height={40} className="object-contain" />
                </div>
                <h3 className="font-bold mb-3 text-xl text-[#e2943a]">Service Personnalisé</h3>
                <p className="text-black">Accompagnement sur-mesure pour chaque événement</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#e2943a' }}>
                  <Image src="/icons/fireworks.png" alt="Fireworks icon" width={40} height={40} className="object-contain" />
                </div>
                <h3 className="font-bold mb-3 text-xl text-[#e2943a]">Expérience Authentique</h3>
                <p className="text-black">Tradition argentine avec une touche régionale</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elfsight Reviews Section (movido al final) */}
      <section className="py-12 sm:py-16 lg:py-20 text-white" style={{ backgroundColor: '#e2943a' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block px-3 sm:px-4 py-2 text-2xl sm:text-3xl md:text-4xl font-ephesis font-semibold  tracking-wider mb-3 sm:mb-4 text-black">
              Témoignages
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-3 sm:mb-4 text-white">
              Ce que disent nos clients
            </h2>
            <p className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-black">
              Découvrez les avis authentiques de nos clients satisfaits
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <DynamicElfsightReviews />
          </div>

          {/* CTA après les avis */}
          <div className="text-center mt-12 sm:mt-16">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal mb-4">
              Rejoignez Nos Clients Satisfaits
            </h3>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base max-w-2xl mx-auto text-black">
              Faites confiance à notre expertise pour votre prochain événement et découvrez pourquoi nos clients nous recommandent
            </p>
            <Link href="/catering">
              <Button
                variant="brandOutlineLight"
                className="px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-medium border-2 border-black text-black"
              >
                OBTENIR MON DEVIS GRATUIT
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
