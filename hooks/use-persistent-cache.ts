'use client'

import { useCallback } from 'react'

interface CacheEntry<T> {
  data: T
  timestamp: number
}

export function usePersistentCache<T>(
  key: string,
  duration: number = 5 * 60 * 1000 // 5 minutos por defecto
) {
  const getCachedData = useCallback((): T | null => {
    if (typeof window === 'undefined') return null
    
    try {
      const cached = localStorage.getItem(key)
      if (!cached) return null
      
      const parsedCache: CacheEntry<T> = JSON.parse(cached)
      
      // Verificar si el caché sigue siendo válido
      if (Date.now() - parsedCache.timestamp > duration) {
        localStorage.removeItem(key)
        return null
      }
      
      return parsedCache.data
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Error al leer caché para ${key}:`, error)
      }
      localStorage.removeItem(key)
      return null
    }
  }, [key, duration])

  const setCachedData = useCallback((data: T) => {
    if (typeof window === 'undefined') return
    
    try {
      const cacheEntry: CacheEntry<T> = {
        data,
        timestamp: Date.now()
      }
      localStorage.setItem(key, JSON.stringify(cacheEntry))
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Error al guardar caché para ${key}:`, error)
      }
    }
  }, [key])

  const clearCache = useCallback(() => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  }, [key])

  return {
    getCachedData,
    setCachedData,
    clearCache
  }
}