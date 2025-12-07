'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  imageClassName?: string
  fill?: boolean
  priority?: boolean
  fetchPriority?: 'auto' | 'high' | 'low'
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  onLoad?: () => void
  onError?: () => void
  fallbackSrc?: string
  lazy?: boolean
  showLoader?: boolean
  showErrorFallback?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  fill = false,
  priority = false,
  fetchPriority = 'auto',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  onLoad,
  onError,
  fallbackSrc,
  lazy = true,
  showLoader = true,
  showErrorFallback = true,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(!lazy || priority)
  const [currentSrc, setCurrentSrc] = useState(src)
  const imgRef = useRef<HTMLDivElement>(null)

  // Actualizar la imagen cuando cambia el src
  useEffect(() => {
    // Resetear estados para nueva carga
    setHasError(false)
    setIsLoading(true)
    setCurrentSrc(src)
  }, [src])

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // Cargar imagen 50px antes de que sea visible
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [lazy, priority, isInView])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setHasError(false)
      setIsLoading(true)
    }
    
    onError?.()
  }

  // Generar placeholder blur simple si no se proporciona
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL
    
    // Generar un placeholder simple basado en las dimensiones
    const w = width || 400
    const h = height || 300
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect width="100%" height="100%" fill="url(#gradient)"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#e5e7eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f9fafb;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>`
    ).toString('base64')}`
  }

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        fill && 'w-full h-full',
        className
      )}
      {...props}
    >
      {/* Placeholder mientras carga o si hay error */}
      {hasError && showErrorFallback && (
        <div className={cn('absolute inset-0 bg-gray-300 flex items-center justify-center')}>
          <div className="text-gray-500 text-sm text-center p-4">
            <svg
              className="w-8 h-8 mx-auto mb-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Error al cargar imagen</span>
          </div>
        </div>
      )}

      {isLoading && showLoader && !hasError && (
        <div className={cn('absolute inset-0 bg-transparent')} />
      )}

      {/* Imagen real */}
      {isInView && !hasError && (
      <Image
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        fetchPriority={fetchPriority}
        quality={quality}
        placeholder={placeholder === 'blur' ? 'blur' : 'empty'}
        blurDataURL={placeholder === 'blur' ? getBlurDataURL() : undefined}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          imageClassName
        )}
      />
      )}
    </div>
  )
}