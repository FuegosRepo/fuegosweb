'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const hide = () => setVisible(false)

    // Oculta tras timeout de seguridad
    const timeout = setTimeout(hide, 1800)

    // Oculta en cuanto el Hero esté listo
    const onHeroReady = () => hide()
    window.addEventListener('hero-ready', onHeroReady)

    // Oculta en idle si el navegador está libre
    if ('requestIdleCallback' in window) {
      ;(window as Window & { requestIdleCallback: (cb: () => void, options?: { timeout: number }) => void }).requestIdleCallback(() => hide(), { timeout: 1600 })
    }

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('hero-ready', onHeroReady)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 transition-opacity duration-700 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/logo/minilogo.webp"
          alt="Fuegos d'Azur"
          width={140}
          height={140}
          priority
          className="drop-shadow-lg"
        />
        <div className="mt-6 h-8 w-8 rounded-full border-2 border-white/60 border-t-transparent animate-spin" />
      </div>
    </div>
  )
}