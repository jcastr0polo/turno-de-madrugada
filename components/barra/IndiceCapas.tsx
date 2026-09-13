'use client'

import { useRef } from 'react'
import { useCapas } from '@/components/capas/CapasProvider'
import type { MetaCapa } from '@/components/capas/Panel'

/**
 * Índice de las cinco capas en la barra lateral. Da acceso no lineal al
 * hipertexto: quien no quiera cazar las palabras marcadas dentro del texto
 * puede entrar a cualquier capa desde aquí.
 */
export function IndiceCapas({ meta }: { meta: MetaCapa[] }) {
  const { abierta, abrir, cerrar } = useCapas()
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  return (
    <ul className="space-y-px">
      {meta.map((capa) => {
        const activa = abierta === capa.id
        return (
          <li key={capa.id}>
            <button
              ref={(nodo) => {
                refs.current[capa.id] = nodo
              }}
              type="button"
              aria-expanded={activa}
              aria-controls="panel-capa"
              onClick={() => {
                const nodo = refs.current[capa.id]
                if (activa) cerrar()
                else if (nodo) abrir(capa.id, nodo)
              }}
              className={`flex w-full items-baseline gap-3 border-l-2 py-2 pl-3 text-left transition-colors ${
                activa
                  ? 'border-l-acento text-acento'
                  : 'border-l-borde text-apagado hover:border-l-trazo hover:text-texto'
              }`}
            >
              <span className="text-[0.9375rem] leading-snug">{capa.etiqueta}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
