import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import ModernNavigation from "@/components/modern-navigation"
import { DynamicNotreEquipe } from "@/components/dynamic-components"
import { Footer } from "@/components/ui/footer"

export default function NotreHistoirePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Modern Navigation */}
      <ModernNavigation currentPage="histoire" />

      {/* Hero Section */}
      <section className="py-6 bg-[#e2943a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal  text-white sm:mb-6 leading-tight">
            Notre Histoire
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white sm:mb-6 mx-auto">
          Découvrez l&apos;essence de l&apos;Argentine et l&apos;Uruguay à travers notre passion commune pour <span className="font-medium">&ldquo;El Asado&rdquo;</span>.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-orange-50 to-orange-100 border-t border-orange-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
              <div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                  Nous sommes trois amis, unis par l&apos;amour pour le rugby et nos cultures vibrantes. Notre histoire a commencé sur le terrain du Stade Niçois, où pendant quatre années, nous avons partagé des moments intenses, des victoires glorieuses et une amitié indéfectible.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                  Le rugby a forgé notre lien, mais notre véritable passion va au-delà du terrain. Nous sommes fiers de partager avec vous notre amour pour l&apos;asado, l&apos;art traditionnel argentin et uruguayen du barbecue. C&apos;est autour du feu que naissent les conversations profondes, les liens durables et les saveurs inoubliables.
                </p>
              </div>
              <div className="relative h-64 sm:h-80 lg:h-96">
                <Image
                  src="/img-historia/historia1.webp"
                  alt="Asado traditionnel"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
              <div className="relative h-64 sm:h-80 lg:h-96 lg:order-1">
                <Image
                  src="/img-historia/historia2.webp"
                  alt="Partage et convivialité"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="lg:order-2">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                  Nous avons décidé de transformer notre passion en entreprise, avec l&apos;idée de vous faire découvrir notre culture à travers l&apos;asado.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8">
                  Chez Fuegos d&apos;Azur l&apos;amitié, le sport et la cuisine de trois pays se fusionnent pour créer une expérience unique. Rejoignez-nous dans cette aventure, Vamos ! à table !
                </p>
                <Link href="/catering">
                  <Button variant="brandOutline" className="px-6 sm:px-8 py-2 sm:py-3 font-medium text-sm sm:text-base text-black border-black border-2">
                    DEMANDER UN DEVIS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Équipe Section */}
      <DynamicNotreEquipe />

      <Footer />
    </div>
  )
}