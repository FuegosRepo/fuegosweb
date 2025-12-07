'use client'

import { useEffect } from 'react'
import { OptimizedImage } from './ui/optimized-image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageLightboxProps {
  images: Array<{
    src: string
    alt: string
  }>
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export default function ImageLightbox({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrevious
}: ImageLightboxProps) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (event.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrevious()
          break
        case 'ArrowRight':
          onNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrevious])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !images[currentIndex]) return null

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 h-10 w-10"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Previous button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 h-12 w-12"
          onClick={(e) => { e.stopPropagation(); onPrevious(); }}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 h-12 w-12"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )}

      {/* Image container */}
      <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
          <OptimizedImage
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            imageClassName="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            priority
            quality={95}
            placeholder="blur"
          />
        </div>
      </div>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Image title */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg text-sm max-w-xs">
        {currentImage.alt}
      </div>

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  )
}
