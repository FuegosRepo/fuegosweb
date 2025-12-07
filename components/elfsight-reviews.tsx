'use client'

import React, { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

interface ElfsightReviewsProps {
  className?: string
  widgetId?: string
}

export default function ElfsightReviews({ 
  className = '', 
  widgetId = '489a10d4-89af-44b5-8dd7-10f1b299aac8'
}: ElfsightReviewsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoadScript, setShouldLoadScript] = useState(false)

  useEffect(() => {
    let observer: IntersectionObserver | null = null

    const markVisible = () => {
      const idle = (cb: () => void) => {
        if ('requestIdleCallback' in window) {
          ;(window as Window & { requestIdleCallback: (cb: () => void, options?: { timeout: number }) => void }).requestIdleCallback(cb, { timeout: 1500 })
        } else {
          setTimeout(cb, 800)
        }
      }
      idle(() => setShouldLoadScript(true))
    }

    if (containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              markVisible()
              observer?.disconnect()
              observer = null
              break
            }
          }
        },
        { rootMargin: '200px', threshold: 0.1 }
      )
      observer.observe(containerRef.current)
    }

    return () => observer?.disconnect()
  }, [])

  return (
    <>
      {shouldLoadScript && (
        <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="afterInteractive"
        />
      )}
      <div 
        ref={containerRef}
        className={`elfsight-app-${widgetId} ${className}`}
        data-elfsight-app-lazy
        style={{
          minHeight: '280px',
          contain: 'layout style paint'
        }}
      />
    </>
  )
}