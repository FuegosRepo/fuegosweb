'use client'

import dynamic from 'next/dynamic'

// Lazy load heavy components with loading fallbacks
export const DynamicGallerySection = dynamic(
  () => import('./gallery-section'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-500">Cargando galería...</div>
      </div>
    ),
    ssr: false
  }
)

export const DynamicEventCards = dynamic(
  () => import('./event-cards'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-500">Cargando eventos...</div>
      </div>
    ),
    ssr: false
  }
)

export const DynamicModernCardsSlider = dynamic(
  () => import('./modern-cards-slider'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-500">Cargando slider...</div>
      </div>
    ),
    ssr: false
  }
)

export const DynamicAccordionSlider = dynamic(
  () => import('./accordion-slider'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-500">Cargando contenido...</div>
      </div>
    ),
    ssr: false
  }
)

export const DynamicNotreEquipe = dynamic(
  () => import('./notre-equipe'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-500">Cargando equipo...</div>
      </div>
    ),
    ssr: false
  }
)

// Catering components - these are heavy and should be loaded only when needed
export const DynamicCateringForm = dynamic(
  () => import('./catering/catering-form').then((m) => m.CateringForm),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-500">Cargando formulario...</div>
      </div>
    ),
    ssr: false
  }
)

// Image lightbox - only load when needed
export const DynamicImageLightbox = dynamic(
  () => import('./image-lightbox'),
  {
    loading: () => null, // No loading state needed for lightbox
    ssr: false
  }
)

// Elfsight Reviews - heavy third-party widget
export const DynamicElfsightReviews = dynamic(
  () => import('./elfsight-reviews'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <div className="text-gray-500">Cargando reseñas...</div>
      </div>
    ),
    ssr: false
  }
)