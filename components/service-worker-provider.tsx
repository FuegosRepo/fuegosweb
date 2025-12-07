'use client'

import { useServiceWorker, useOfflineStatus } from '@/hooks/use-service-worker'
import { useEffect, useState } from 'react'

interface ServiceWorkerProviderProps {
  children: React.ReactNode
}

export function ServiceWorkerProvider({ children }: ServiceWorkerProviderProps) {
  const { isWaiting, error } = useServiceWorker()
  const isOffline = useOfflineStatus()
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)

  useEffect(() => {
    if (isWaiting) {
      setShowUpdatePrompt(true)
    }
  }, [isWaiting])

  const handleUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.controller?.postMessage({ type: 'SKIP_WAITING' })
      setShowUpdatePrompt(false)
    }
  }

  return (
    <>
      {children}
      
      {/* Offline indicator */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 z-50">
          <p className="text-sm font-medium">
            Vous êtes hors ligne. Certaines fonctionnalités peuvent être limitées.
          </p>
        </div>
      )}

      {/* Update prompt */}
      {showUpdatePrompt && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
          <div className="flex items-start">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                Mise à jour disponible
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Une nouvelle version de l&apos;application est disponible.
              </p>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={handleUpdate}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Mettre à jour
            </button>
            <button
              onClick={() => setShowUpdatePrompt(false)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Plus tard
            </button>
          </div>
        </div>
      )}

      {/* Service Worker error */}
      {error && process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-sm z-50">
          <strong className="font-bold">Service Worker Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
    </>
  )
}