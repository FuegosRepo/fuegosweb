'use client'

import { useState, useEffect } from 'react'
import { OptimizedImage } from './ui/optimized-image'
import { motion, AnimatePresence } from 'framer-motion'

interface AccordionItem {
  id: string
  number: string
  title: string
  description: string
  image: string
  alt: string
}

interface AccordionSliderProps {
  items: AccordionItem[]
  className?: string
}

export default function AccordionSlider({ items, className = '' }: AccordionSliderProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener with debounce
    let timeoutId: NodeJS.Timeout
    const debouncedCheck = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 100)
    }
    
    window.addEventListener('resize', debouncedCheck)
    
    return () => {
      window.removeEventListener('resize', debouncedCheck)
      clearTimeout(timeoutId)
    }
  }, [])

  const handlePanelInteraction = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div 
      className={`accordion-slider ${className}`}
      onMouseLeave={() => !isMobile && setActiveIndex(null)}
    >
      <div className={`
        ${isMobile 
          ? 'flex flex-col space-y-1 h-auto' 
          : 'flex h-72 sm:h-80 md:h-96'
        } 
        ${isMobile ? 'rounded-xl' : 'rounded-2xl'} overflow-hidden shadow-2xl
      `}>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={`accordion-panel relative cursor-pointer ${
              isMobile ? 'w-full' : 'flex-1'
            }`}
            onMouseEnter={() => !isMobile && setActiveIndex(index)}
            onClick={() => handlePanelInteraction(index)}
            initial={false}
            animate={isMobile ? {
              height: index === activeIndex ? 320 : 80,
            } : {
              flex: index === activeIndex ? 4 : 1,
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
            style={{ willChange: isMobile ? 'height' : 'flex' }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 will-change-transform">
              <OptimizedImage
                src={item.image}
                alt={item.alt}
                fill
                imageClassName="object-cover transition-transform duration-500 ease-out"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                placeholder="empty"
              />
              {/* Overlay */}
              <motion.div 
                className="absolute inset-0"
                initial={false}
                animate={{
                  backgroundColor: index === activeIndex 
                    ? 'rgba(0, 0, 0, 0.3)' 
                    : 'rgba(0, 0, 0, 0.7)'
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{ willChange: 'background-color' }}
              />
            </div>

            {/* Content */}
            <div className={`relative z-10 h-full flex flex-col ${
              isMobile ? 'justify-center px-4 py-3' : 'justify-end p-6'
            }`}>
              {/* Content Container - All elements animate together */}
              <AnimatePresence mode="sync">
                {index === activeIndex && (
                  <motion.div
                    initial={{ opacity: 0, y: isMobile ? 6 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: isMobile ? -6 : -10 }}
                    transition={{ 
                      duration: 0.3,
                      delay: 0.15,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{ willChange: 'opacity, transform' }}
                  >
                    {/* Number */}
                    <div
                      className={`font-bold mb-1 ${
                        isMobile ? 'text-xl' : 'text-4xl md:text-6xl'
                      }`}
                      style={{ color: '#e2943a' }}
                    >
                      {item.number}
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-bold mb-2 ${
                        isMobile ? 'text-base' : 'text-2xl md:text-3xl'
                      }`}
                      style={{ color: '#e2943a' }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-white/90 leading-relaxed ${
                      isMobile ? 'text-sm max-w-full' : 'text-sm md:text-base max-w-md'
                    }`}>
                      {item.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Title for collapsed panels */}
              <AnimatePresence mode="sync">
                {index !== activeIndex && (
                  <motion.div
                    className={`absolute ${
                      isMobile 
                        ? 'left-3 top-1/2 transform -translate-y-1/2 right-3' 
                        : 'left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90'
                    } ${isMobile ? '' : 'whitespace-nowrap'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 0.2,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{ willChange: 'opacity' }}
                  >
                    <span className={`text-white font-semibold tracking-wider vertical-title ${
                      isMobile ? 'text-sm leading-tight' : 'text-xs xs:text-sm sm:text-sm'
                    } ${isMobile ? 'block truncate' : ''}`}>
                      {isMobile ? item.title : item.title.toUpperCase()}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hover indicator */}
            <motion.div
              className={`absolute bg-gradient-to-r from-[#e2943a] to-[#e2943a] ${
                isMobile 
                  ? 'top-0 left-0 bottom-0 w-1' 
                  : 'bottom-0 left-0 right-0 h-1'
              }`}
              initial={isMobile ? { scaleY: 0 } : { scaleX: 0 }}
              animate={isMobile 
                ? { scaleY: index === activeIndex ? 1 : 0 }
                : { scaleX: index === activeIndex ? 1 : 0 }
              }
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ 
                transformOrigin: isMobile ? 'top' : 'left',
                willChange: 'transform'
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className={`flex justify-center mt-6 ${
        isMobile ? 'space-x-2' : 'space-x-2'
      }`}>
        {items.map((_, index) => (
          <button
            key={index}
            onMouseEnter={() => !isMobile && setActiveIndex(index)}
            onClick={() => handlePanelInteraction(index)}
            className={`nav-dot w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-[#e2943a] scale-125 active' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Ir al panel ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .accordion-slider {
          --primary-color: #e2943a;
          --secondary-color: #f97316;
        }
        
        .accordion-panel {
          position: relative;
          overflow: hidden;
          min-height: ${isMobile ? '80px' : 'auto'};
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        
        .accordion-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(226, 148, 58, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 5;
          pointer-events: none;
        }
        
        .accordion-panel:hover::before {
          opacity: ${isMobile ? '0' : '1'};
        }
        
        @media (max-width: 767px) {
          .accordion-panel {
            border-radius: 8px;
            margin-bottom: 0;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .accordion-panel:not(:last-child) {
            margin-bottom: 4px;
          }
          
          .vertical-title {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}