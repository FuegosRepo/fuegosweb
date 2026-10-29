'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 px-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
        <h1 className="text-2xl font-bold text-[#e2943a] mb-3">
          Oups, une erreur est survenue
        </h1>
        <p className="text-gray-700 mb-2">
          Nous sommes désolés, la page n&apos;a pas pu s&apos;afficher correctement.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Si vous utilisez la traduction automatique de votre navigateur, essayez de la désactiver puis réessayez.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="h-11 px-6 bg-[#e2943a] hover:bg-[#d18634] text-white font-semibold rounded-lg transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="h-11 px-6 inline-flex items-center justify-center border-2 border-gray-300 hover:border-orange-300 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
