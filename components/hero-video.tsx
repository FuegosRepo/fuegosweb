'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { OptimizedImage } from './ui/optimized-image'

export function HeroVideo() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    // Preload video
  }, [])

  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          onLoad={() => {
            setIsVideoLoaded(true)
            try {
              // Avisar al SplashScreen que el hero está listo
              window.dispatchEvent(new Event('hero-ready'))
            } catch {}
          }}
          className={cn(
            "absolute w-full h-full z-0 transition-opacity duration-500",
            isVideoLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100vw',
            height: '56.25vw', // 16:9 aspect ratio
            minHeight: '100vh',
            minWidth: '177.77vh', // 16:9 aspect ratio
            pointerEvents: 'none'
          }}
          src="https://www.youtube.com/embed/twy3V-Xakts?autoplay=1&mute=1&loop=1&playlist=twy3V-Xakts&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
          title="Fuegos d'Azur Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      {/* Dark Overlay (slightly darker for white logo contrast) */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      {/* Content (no glass effect) */}
      <div className="relative z-20 flex items-center justify-center w-full h-full px-2 sm:px-4 md:px-6 lg:px-8 pb-12">
        {/* Hero image replacing texts - Recortada */}
        <OptimizedImage
          src="/img-hero/Traiteur.webp"
          alt="Fuegos d'Azur - Traiteur événementiel sur la Côte d'Azur"
          width={600}
          height={800}
          sizes="(max-width: 640px) 95vw, (max-width: 768px) 60vw, (max-width: 1024px) 35vw, (max-width: 1280px) 28vw, 24vw"
          imageClassName="mx-auto h-auto w-[95vw] sm:w-[60vw] md:w-[35vw] lg:w-[28vw] xl:w-[24vw] max-w-[450px] object-contain"
          priority
          quality={80}
          placeholder="empty"
        />
      </div>
    </section>
  )
}