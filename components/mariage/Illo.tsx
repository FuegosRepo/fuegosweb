import Image from 'next/image'
import type { Icon } from '@/app/mariage/(landing)/content'

/**
 * Ilustración de línea con peso visual igualado.
 *
 * Si todos los iconos van en la misma caja cuadrada, los finos y altos (copa,
 * cubiertos) se ven diminutos y los anchos (olas) chatos. Escalamos según la
 * proporción: cuanto más estrecho, más alto, y al revés. El exponente 0.35 es
 * un término medio entre "misma altura" (0) y "misma área" (0.5).
 */
export function illoSize(icon: Icon, base: number) {
  const ratio = icon.width / icon.height
  const height = Math.round(base * Math.pow(ratio, -0.35))
  const width = Math.round(height * ratio)
  const maxWidth = base * 2
  if (width > maxWidth) {
    return { width: maxWidth, height: Math.round(maxWidth / ratio) }
  }
  return { width, height }
}

type Props = {
  icon: Icon
  /** Lado de referencia en px para un icono cuadrado. */
  base?: number
  /**
   * 'pictogram': acompaña un título (Signature, Services), opacidad plena.
   * 'deco': ilustración decorativa de sección, tratamiento común tenue.
   */
  variant?: 'pictogram' | 'deco'
  className?: string
}

export function Illo({ icon, base = 72, variant = 'pictogram', className = '' }: Props) {
  const { width, height } = illoSize(icon, base)
  return (
    <span className={`illo illo--${variant} ${className}`} aria-hidden="true">
      <Image src={icon.src} alt="" width={width} height={height} style={{ width, height }} />
    </span>
  )
}
