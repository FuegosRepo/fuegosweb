'use client'

import { useEffect } from 'react'

// Se muestra solo si falla el layout raíz; reemplaza todo el documento,
// por eso usa estilos inline en lugar de Tailwind/globals.css.
export default function GlobalError({
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
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#fff7ed' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ maxWidth: 420, width: '100%', textAlign: 'center', background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 32 }}>
            <h1 style={{ color: '#e2943a', fontSize: 24, margin: '0 0 12px' }}>
              Oups, une erreur est survenue
            </h1>
            <p style={{ color: '#374151', margin: '0 0 8px' }}>
              Nous sommes désolés, la page n&apos;a pas pu s&apos;afficher correctement.
            </p>
            <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 24px' }}>
              Si vous utilisez la traduction automatique de votre navigateur, essayez de la désactiver puis réessayez.
            </p>
            <button
              onClick={reset}
              style={{ height: 44, padding: '0 24px', background: '#e2943a', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 8, cursor: 'pointer' }}
            >
              Réessayer
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
