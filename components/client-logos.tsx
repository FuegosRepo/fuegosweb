'use client'

import { useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const brands = [
  { src: '/brands/lambo.webp', alt: 'Lamborghini' },
  { src: '/brands/Ineos.webp', alt: 'Ineos' },
  { src: '/brands/sophia.webp', alt: 'Sophia Antipolis' },
  { src: '/brands/universite.webp', alt: 'Université' },
  { src: '/brands/dumez.webp', alt: 'Dumez' },
  { src: '/brands/Nicois.webp', alt: 'Nicois' },
  { src: '/brands/opio.webp', alt: 'Opio' },
]

export default function ClientLogos() {
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
          {brands.map((brand) => (
            <div key={brand.alt} className="flex items-center justify-center min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] h-16 sm:h-20 lg:h-24 flex-shrink-0 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <Image
                src={brand.src}
                alt={brand.alt}
                width={120}
                height={60}
                className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
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
  )
}
