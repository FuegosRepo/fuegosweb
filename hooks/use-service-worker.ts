'use client'

import { useEffect, useState } from 'react'

// Extend ServiceWorkerRegistration to include sync property
interface SyncManager {
  register(tag: string): Promise<void>
  getTags(): Promise<string[]>
}

interface ServiceWorkerRegistrationWithSync extends ServiceWorkerRegistration {
  sync?: SyncManager
}

interface ServiceWorkerState {
  isSupported: boolean
  isRegistered: boolean
  isInstalling: boolean
  isWaiting: boolean
  isControlling: boolean
  error: string | null
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: false,
    isRegistered: false,
    isInstalling: false,
    isWaiting: false,
    isControlling: false,
    error: null
  })

  useEffect(() => {
    // Check if service workers are supported
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      setState(prev => ({ ...prev, isSupported: false }))
      return
    }

    setState(prev => ({ ...prev, isSupported: true }))

    // Register service worker
    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        })

        if (process.env.NODE_ENV === 'development') {
          console.log('Service Worker registered successfully:', registration)
        }

        // Handle installation
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            setState(prev => ({ ...prev, isInstalling: true }))

            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {
                setState(prev => ({ 
                  ...prev, 
                  isInstalling: false,
                  isWaiting: navigator.serviceWorker.controller ? true : false,
                  isRegistered: true
                }))
              }
            })
          }
        })

        // Check if there's already a controlling service worker
        if (navigator.serviceWorker.controller) {
          setState(prev => ({ 
            ...prev, 
            isControlling: true,
            isRegistered: true
          }))
        }

        // Listen for controller changes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          setState(prev => ({ ...prev, isControlling: true }))
          // Reload the page to ensure all resources are served from the cache
          window.location.reload()
        })

      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Service Worker registration failed:', error)
        }
        setState(prev => ({ 
          ...prev, 
          error: error instanceof Error ? error.message : 'Registration failed'
        }))
      }
    }

    registerSW()
  }, [])

  // Function to skip waiting and activate new service worker
  const skipWaiting = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' })
    }
  }

  // Function to check for updates
  const checkForUpdates = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        registration.update()
      }
    }
  }

  return {
    ...state,
    skipWaiting,
    checkForUpdates
  }
}

// Hook for offline detection
export function useOfflineStatus() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    // Set initial state
    setIsOffline(!navigator.onLine)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOffline
}

// Hook for caching form data when offline
export function useOfflineFormSync() {
  const isOffline = useOfflineStatus()

  const submitForm = async (url: string, data: any) => {
    if (isOffline) {
      // Store form data for later sync
      const formData = {
        id: Date.now().toString(),
        url,
        data,
        timestamp: new Date().toISOString()
      }

      // Store in localStorage (in a real app, consider IndexedDB)
      const pendingForms = JSON.parse(localStorage.getItem('pendingForms') || '[]')
      pendingForms.push(formData)
      localStorage.setItem('pendingForms', JSON.stringify(pendingForms))

      // Register for background sync if supported
      if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        const registration = await navigator.serviceWorker.ready as ServiceWorkerRegistrationWithSync
        await registration.sync?.register('catering-form')
      }

      return { success: true, offline: true }
    } else {
      // Submit normally
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })

        return { success: response.ok, offline: false }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Form submission failed:', error)
        }
        return { success: false, offline: false, error }
      }
    }
  }

  return { submitForm, isOffline }
}