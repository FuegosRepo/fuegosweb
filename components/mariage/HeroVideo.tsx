'use client'

import { useEffect, useRef, useState } from 'react'

type Props = { src: string }

/**
 * Video decorativo del hero: se reproduce UNA vez y al terminar se desvanece,
 * dejando visible la foto que está debajo (renderizada en el servidor).
 *
 * - Sin atributo `poster`: el video arranca invisible (opacity 0), así que el
 *   poster nunca se vería y solo sumaría una descarga. El "poster" real es la
 *   foto del hero, optimizada por next/image.
 * - Si el video falla, tarda o el navegador bloquea el autoplay, nunca queda
 *   invisible nada importante: la foto y el contenido viven fuera del <video>.
 * - React no escribe `muted` como atributo HTML (solo como propiedad), y algunos
 *   navegadores deciden el autoplay mirando el atributo. Lo forzamos por ref
 *   ANTES de llamar a play().
 */
export function HeroVideo({ src }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState<'idle' | 'playing' | 'done'>('idle')

  // Montamos el video después de hidratar para que no compita con la foto
  // (LCP). NO lo condicionamos a prefers-reduced-motion: en Windows esa
  // preferencia se activa sola cuando "Mostrar animaciones" está apagado, y
  // así el video no aparecía para una parte grande de las visitas. Es mudo,
  // dura 14 s, se reproduce una vez y vuelve a la foto.
  useEffect(() => {
    setEnabled(true)
  }, [])

  useEffect(() => {
    const video = ref.current
    if (!enabled || !video) return

    video.muted = true
    video.defaultMuted = true
    video.setAttribute('muted', '')

    let timer: ReturnType<typeof setTimeout> | undefined
    const onPlaying = () => setState('playing')
    const onEnded = () => {
      setState('done')
      // Esperamos el fade-out (0.8s) antes de pausar en el último frame.
      timer = setTimeout(() => video.pause(), 900)
    }
    video.addEventListener('playing', onPlaying)
    video.addEventListener('ended', onEnded)
    void video.play().catch(() => {
      /* autoplay bloqueado: queda la foto, que es el comportamiento esperado */
    })

    return () => {
      clearTimeout(timer)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('ended', onEnded)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <video
      ref={ref}
      className={`hero-video ${state === 'playing' ? 'is-playing' : ''}`}
      src={src}
      autoPlay
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
