'use client'

import { useRef } from 'react'
import type { CapaId } from '@/content/types'
import { useCapas } from './CapasProvider'

/**
 * Palabra marcada dentro del texto. Es un <button> real: funciona con teclado,
 * anuncia su estado con aria-expanded y apunta al panel con aria-controls.
 */
export function Disparador({
  capa,
  ancla,
  etiqueta,
  children,
}: {
  capa: CapaId
  ancla?: string
  etiqueta: string
  children: string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const { abierta, abrir, cerrar } = useCapas()
  const activa = abierta === capa

  return (
    <button
      ref={ref}
      type="button"
      className="disparador"
      aria-expanded={activa}
      aria-controls="panel-capa"
      onClick={() => {
        if (activa) {
          cerrar()
        } else if (ref.current) {
          abrir(capa, ref.current, ancla)
        }
      }}
    >
      {children}
      <span className="sr-only"> — abre la capa {etiqueta}</span>
    </button>
  )
}
