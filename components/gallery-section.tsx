'use client'

import { useState, memo } from 'react'
import { OptimizedImage } from './ui/optimized-image'
import { DynamicImageLightbox } from './dynamic-components'

const galleryImages = [
  { src: '/realisation/1.webp', alt: 'Réalisation 1' },
  { src: '/realisation/2.webp', alt: 'Réalisation 2' },
  { src: '/realisation/3.jpg', alt: 'Réalisation 3' },
  { src: '/realisation/4.webp', alt: 'Réalisation 4' },
  { src: '/realisation/5.webp', alt: 'Réalisation 5' },
  { src: '/realisation/6.jpg', alt: 'Réalisation 6' },
  { src: '/realisation/7.webp', alt: 'Réalisation 7' },
  { src: '/realisation/8.jpg', alt: 'Réalisation 8' },
  { src: '/realisation/10.webp', alt: 'Réalisation 10' },
]

function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const tileHeights = ['h-64', 'h-80', 'h-56', 'h-72']

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-orange-50 to-orange-100 border-t border-orange-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#e2943a]">Nos Réalisations</h2>
            <p className="text-gray-600 text-sm sm:text-base">Découvrez quelques-uns de nos événements</p>
          </div>
          {/* Masonry columns layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 [column-fill:balance]">
            {galleryImages.map((image, index) => (
              <div key={index} className="break-inside-avoid mb-3 sm:mb-4">
                <div 
                  className={`relative ${tileHeights[index % tileHeights.length]} rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                  onClick={() => openLightbox(index)}
                >
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    imageClassName="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={60}
                    lazy={true}
                    priority={index < 3}
                  />
                  {/* Overlay on hover with title and caption */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white px-4 py-3 rounded-lg text-center">
                      <div className="text-sm sm:text-base font-semibold">{image.alt}</div>
                      <div className="text-xs sm:text-sm">Cliquez pour agrandir</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox - Lazy loaded */}
      {lightboxOpen && (
        <DynamicImageLightbox
          images={galleryImages}
          isOpen={lightboxOpen}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={previousImage}
        />
      )}
    </>
  )
}

export default memo(GallerySection)
