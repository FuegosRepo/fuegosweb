'use client'

import { useState, useEffect, useRef } from 'react'

interface UseLazyComponentOptions {
  rootMargin?: string
  threshold?: number
  triggerOnce?: boolean
}

export function useLazyComponent(options: UseLazyComponentOptions = {}) {
  const {
    rootMargin = '100px',
    threshold = 0.1,
    triggerOnce = true
  } = options

  const [shouldLoad, setShouldLoad] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsIntersecting(entry.isIntersecting)
        
        if (entry.isIntersecting) {
          setShouldLoad(true)
          
          if (triggerOnce) {
            observer.unobserve(element)
          }
        }
      },
      {
        rootMargin,
        threshold
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [rootMargin, threshold, triggerOnce])

  return {
    elementRef,
    shouldLoad,
    isIntersecting
  }
}

// Higher-order component for lazy loading
export function withLazyLoading<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: React.ReactNode,
  options?: UseLazyComponentOptions
) {
  return function LazyComponent(props: T) {
    const { elementRef, shouldLoad } = useLazyComponent(options)

    if (!shouldLoad) {
      return (
        <div ref={elementRef} className="min-h-[200px] flex items-center justify-center">
          {fallback || (
            <div className="animate-pulse bg-gray-200 rounded-lg w-full h-48 flex items-center justify-center">
              <div className="text-gray-500">Cargando...</div>
            </div>
          )}
        </div>
      )
    }

    return <Component {...props} />
  }
}

