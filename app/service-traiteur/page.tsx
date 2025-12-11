import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, MapPin, Utensils, ChefHat, Cookie } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ModernNavigation from "@/components/modern-navigation"
import { Footer } from "@/components/ui/footer"
import {
  DynamicGallerySection,
  DynamicEventCards
} from "@/components/dynamic-components"
import { VideoWithLoader } from "@/components/video-with-loader"

export default function ServiceTraiteurPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Modern Navigation */}
      <ModernNavigation currentPage="services" />

      {/* Hero Section with Text and Video */}
      <section className="relative min-h-[80vh] sm:min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Text Content - Left Side */}
            <div className="space-y-8 text-center">
              <div className="space-y-8">
                {/* Fire Icon */}
                <div className="flex justify-center mb-10">
                  <Image
                    src="/service-trateur/fire.webp"
                    alt="Fire icon"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight mb-10 text-center" style={{ color: '#e2943a' }}>
                  Service Traiteur
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-md md:max-w-lg mb-8 mx-auto text-center">
                  Le plaisir de partager un moment ensemble.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md md:max-w-lg mb-10 mx-auto text-center">
                  Service Traiteur Brasero. Découvrez l&apos;art authentique de l&apos;asado argentin avec notre équipe passionnée.
                </p>

                {/* Waves Icon */}
                <div className="flex justify-center mt-20">
                  <Image
                    src="/service-trateur/waves.webp"
                    alt="Waves icon"
                    width={200}
                    height={100}
                    className="object-contain "
                  />
                </div>
              </div>


            </div>

            {/* Video - Right Side */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <VideoWithLoader
                  src="/video-historia/reel-fuegos-d-azur_QDgl6rhj.mp4"
                  poster="/social/og-image.png"
                  videoClassName="max-h-[600px]"
                />

                {/* Video Overlay for better integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-12 sm:py-16 text-white" style={{ backgroundColor: '#e2943a' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
            <p className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md md:max-w-lg mx-auto" style={{ color: '#F5E6D3' }}>
              Chez Fuegos d&apos;Azur, nous vous proposons un service traiteur unique basé sur un concept de buffet au brasero,
              idéal pour tous vos événements dans les Alpes-Maritimes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
            <div className="max-w-md md:max-w-lg">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <h3 className="text-xl sm:text-2xl font-normal text-white">Installation & Préparation</h3>
              </div>
              <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4" style={{ color: '#F5E6D3' }}>
                Nous arrivons sur place 2 heures avant le début du service afin de préparer chaque détail avec soin.
              </p>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#F5E6D3' }}>
                Nous apportons tout notre matériel et nous protégeons systématiquement le sol pour garantir un espace propre après notre départ.
              </p>
            </div>
            <div className="relative h-64 sm:h-72 lg:h-80">
              <Image
                src="/service-trateur/preparation.webp"
                alt="Installation du service"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-orange-50 to-orange-100 border-t border-orange-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal mb-4 sm:mb-6" style={{ color: '#e2943a' }}>
              Un menu gourmand et convivial!
            </h3>
            <p className="text-base sm:text-lg text-gray-700 max-w-md md:max-w-lg mx-auto">
              Notre formule comprend les entrées, les différents morceaux de viande et accompagnements pour le plat principal,
              nos sauces maison et nos desserts. Tout cuisiné au brasero pour une saveur authentique et inimitable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-8 sm:mb-12">
            {/* Entrées */}
            <Card className="p-4 sm:p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-[#e2943a]" />
                <h4 className="text-lg sm:text-xl font-normal" style={{ color: '#e2943a' }}>Entrées</h4>
              </div>
              <div className="relative h-36 sm:h-40 mb-3 sm:mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/service-trateur/entrees.webp"
                  alt="Entrées au brasero"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-md md:max-w-lg">
                Généralement sous forme de tapas/finger foods, elles sont servies avec l&apos;apéritif pour une mise en bouche raffinée.
              </p>
            </Card>

            {/* Plats principaux */}
            <Card className="p-4 sm:p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-[#e2943a]" />
                <h4 className="text-lg sm:text-xl font-normal" style={{ color: '#e2943a' }}>Plats Principaux</h4>
              </div>
              <div className="relative h-36 sm:h-40 mb-3 sm:mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/service-trateur/plat principal.webp"
                  alt="Plats principaux au brasero"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-md md:max-w-lg">
                Un assortiment de viandes grillées au brasero, accompagnées de garnitures savoureuses et de sauces maison, à disposition sur le buffet.
              </p>
            </Card>

            {/* Desserts */}
            <Card className="p-4 sm:p-6 bg-white shadow-lg hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-[#e2943a]" />
                <h4 className="text-lg sm:text-xl font-normal" style={{ color: '#e2943a' }}>Desserts</h4>
              </div>
              <div className="relative h-36 sm:h-40 mb-3 sm:mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/service-trateur/desseert.webp"
                  alt="Desserts au brasero"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-md md:max-w-lg">
                Cuisinés au brasero et servis à l&apos;assiette, pour terminer le repas sur une note sucrée.
              </p>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative h-64 sm:h-72 lg:h-80 lg:order-1">
              <Image
                src="/service-trateur/Un-traiteur-mobile.webp"
                alt="Un traiteur mobile"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:order-2 max-w-md md:max-w-lg">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#e2943a]" />
                <h3 className="text-xl sm:text-2xl font-normal" style={{ color: '#e2943a' }}>Un traiteur mobile</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                Nous nous déplaçons dans tout le département des Alpes-Maritimes, vous offrant un service sur mesure, adapté à vos besoins et à votre événement.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8">
                <strong>Options Supplémentaires :</strong> Nous proposons également un service de location de vaisselle et de matériel pour compléter votre expérience.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                Un service traiteur brasero unique grâce à notre expertise en barbecue au feu de bois,
                nous vous garantissons une prestation gourmande et conviviale, parfaite pour vos événements privés et professionnels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12 sm:py-16 text-white" style={{ backgroundColor: '#e2943a' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal mb-4 sm:mb-6 text-white">
              Événements Que Nous Couvrons
            </h3>
            <p className="text-base sm:text-lg max-w-md md:max-w-lg mx-auto" style={{ color: '#F5E6D3' }}>
              Découvrez nos services de traiteur pour tous types d&apos;événements avec l&apos;authenticité de l&apos;asado argentin
            </p>
          </div>

          <DynamicEventCards className="max-w-6xl mx-auto" />

          {/* CTA debajo de las cards */}
          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <Link href="/catering">
              <Button
                variant="brandOutlineLight"
                className="px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg border-2"
              >
                NOS SERVICES
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <DynamicGallerySection />

      {/* Footer */}
      <Footer />
    </div>
  )
}