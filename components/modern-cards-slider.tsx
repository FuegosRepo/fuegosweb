'use client'

import { useState, useEffect, memo } from 'react'
import { OptimizedImage } from './ui/optimized-image'

interface CardItem {
  id: string
  number: string
  title: string
  description: string
  image: string
  alt: string
}

interface ModernCardsSliderProps {
  items: CardItem[]
  className?: string
}

function ModernCardsSlider({ items, className = '' }: ModernCardsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div
      className={`modern-cards-slider relative ${className}`}
    >
      {/* Main Cards Container */}
      <div className="relative overflow-hidden">
        {isMobile ? (
          // Mobile: Stack cards vertically (No Framer Motion animations)
          <div className="flex flex-col space-y-6">
            {items.map((item, index) => (
              <MobileCard
                key={item.id}
                item={item}
                isActive={index === currentIndex}
                onClick={() => goToSlide(index)}
                priority={index < 2}
              />
            ))}
          </div>
        ) : (
          // Desktop: Grid layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
            {items.map((item, index) => (
              <DesktopCard
                key={item.id}
                item={item}
                variant={index === currentIndex ? "main" : "side"}
                isActive={index === currentIndex}
                onClick={() => goToSlide(index)}
                priority={index < 2}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .modern-cards-slider {
          --primary-color: #D18F43;
          --secondary-color: #f97316;
        }
      `}</style>
    </div>
  )
}

// Desktop Card Component (Optimized)
const DesktopCard = memo(({
  item,
  variant: _variant,
  isActive: _isActive,
  onClick,
  priority = false
}: {
  item: CardItem
  variant?: string
  isActive?: boolean
  onClick?: () => void
  priority?: boolean
}) => {
  // Props variant y isActive se aceptan para compatibilidad de tipos pero no se usan actualmente
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = { _variant, _isActive }
  // Evitar re-renders innecesarios
  return (
    <div className="relative h-[400px] overflow-hidden rounded-3xl">
      <div
        className="relative w-full h-full cursor-pointer group hover:-translate-y-5 transition-transform duration-500 ease-out"
        onClick={onClick}
      >
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <OptimizedImage
            src={item.image}
            alt={item.alt}
            fill
            imageClassName="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={65}
            fetchPriority={priority ? "high" : "low"}
            priority={priority}
            placeholder="empty"
          />

          {/* Overlay - Más oscuro por defecto, menos oscuro en hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 group-hover:from-black/80 group-hover:via-black/30 group-hover:to-transparent transition-all duration-500" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          {/* Título siempre visible */}
          <div className="mb-4">
            <div
              className="text-3xl font-bold mb-2 opacity-90"
              style={{ color: '#e2943a' }}
            >
              {item.number}
            </div>
            <h3
              className="text-xl font-bold text-white"
            >
              {item.title}
            </h3>
          </div>

          {/* Descripción que aparece en hover (solo desktop) */}
          <div
            className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-300 ease-out"
          >
            <p className="text-white/90 text-base leading-relaxed pt-2">
              {item.description}
            </p>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div
          className="absolute inset-0 rounded-3xl border-2 border-[#e2943a]/0 group-hover:border-[#e2943a]/50 transition-all duration-300"
        />
      </div>
    </div>
  )
})
DesktopCard.displayName = 'DesktopCard'

// Mobile Card Component (Optimized for performance)
const MobileCard = memo(({
  item,
  isActive,
  onClick,
  priority = false
}: {
  item: CardItem
  isActive: boolean
  onClick: () => void
  priority?: boolean
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${isActive ? 'h-80' : 'h-24'
        }`}
      onClick={onClick}
      style={{
        transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: isActive ? 'height' : 'auto'
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={item.image}
          alt={item.alt}
          fill
          imageClassName="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={60}
          placeholder="empty"
          fetchPriority={priority ? "high" : "low"}
          priority={priority}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: isActive ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.7)',
            transition: 'background-color 0.3s ease'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center p-6">
        {isActive ? (
          <div className="space-y-4">
            <div
              className="text-4xl font-bold"
              style={{ color: '#e2943a' }}
            >
              {item.number}
            </div>
            <h3
              className="text-2xl font-bold"
              style={{ color: '#e2943a' }}
            >
              {item.title}
            </h3>
            <p className="text-white/90 leading-relaxed">
              {item.description}
            </p>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div
              className="text-2xl font-bold"
              style={{ color: '#e2943a' }}
            >
              {item.number}
            </div>
            <h4 className="text-lg font-semibold text-white">
              {item.title}
            </h4>
          </div>
        )}
      </div>

      {/* Active Indicator */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600"
        style={{
          transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'transform 0.3s ease'
        }}
      />
    </div>
  )
})
MobileCard.displayName = 'MobileCard'

export default memo(ModernCardsSlider)