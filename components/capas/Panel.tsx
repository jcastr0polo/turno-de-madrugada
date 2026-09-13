'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import type { CapaId } from '@/content/types'
import { useCapas } from './CapasProvider'

export interface MetaCapa {
  id: CapaId
  etiqueta: string
  titulo: string
  sumario: string
}

const FOCALIZABLES =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Capa complementaria. En escritorio entra como panel derecho; en móvil, como
 * hoja inferior. Se cierra con Escape, con clic fuera y con el botón visible.
 *
 * Los cinco cuerpos están siempre en el HTML (renderizados en el servidor) y
 * solo se muestra el activo: no hay ninguna petición al abrir una capa.
 */
export function Panel({
  meta,
  paneles,
}: {
  meta: MetaCapa[]
  paneles: Record<CapaId, ReactNode>
}) {
  const { abierta, ancla, cerrar } = useCapas()
  const panelRef = useRef<HTMLDivElement>(null)
  const cierreRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!abierta) return

    cierreRef.current?.focus()

    // Trampa de foco: el tabulador circula dentro del panel mientras está abierto.
    function alTeclear(evento: KeyboardEvent) {
      if (evento.key === 'Escape') {
        evento.preventDefault()
        cerrar()
        return
      }
      if (evento.key !== 'Tab' || !panelRef.current) return

      const focalizables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCALIZABLES),
      ).filter((nodo) => nodo.offsetParent !== null)
      if (focalizables.length === 0) return

      const primero = focalizables[0]
      const ultimo = focalizables[focalizables.length - 1]

      if (evento.shiftKey && document.activeElement === primero) {
        evento.preventDefault()
        ultimo.focus()
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault()
        primero.focus()
      }
    }

    // Clic fuera del panel.
    function alApuntar(evento: PointerEvent) {
      if (panelRef.current && !panelRef.current.contains(evento.target as Node)) {
        cerrar()
      }
    }

    document.addEventListener('keydown', alTeclear)
    document.addEventListener('pointerdown', alApuntar)
    const desbordeAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', alTeclear)
      document.removeEventListener('pointerdown', alApuntar)
      document.body.style.overflow = desbordeAnterior
    }
  }, [abierta, cerrar])

  // Si la palabra apuntaba a una entrada concreta, la capa abre en ella.
  useEffect(() => {
    if (!abierta || !ancla || !panelRef.current) return
    const destino = panelRef.current.querySelector(`[data-ancla="${ancla}"]`)
    destino?.scrollIntoView({ block: 'start', behavior: 'auto' })
  }, [abierta, ancla])

  const activa = meta.find((capa) => capa.id === abierta) ?? null

  return (
    <div className="fixed inset-0 z-50" hidden={!abierta}>
      <div className="velo-entra absolute inset-0 bg-fondo/75" aria-hidden="true" />

      <div
        ref={panelRef}
        id="panel-capa"
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-capa-titulo"
        className="panel-entra absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-xl border-t-2 border-t-acento bg-superficie md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[min(30rem,46vw)] md:rounded-none md:border-l md:border-l-borde"
      >
        <div className="flex items-start justify-between gap-4 border-b border-borde px-5 py-4 md:px-7 md:py-6">
          <div className="min-w-0">
            {activa && (
              <>
                <p className="font-mono text-meta tracking-[0.14em] text-acento uppercase">
                  {activa.etiqueta}
                </p>
                <h2
                  id="panel-capa-titulo"
                  className="mt-2 font-titular text-xl leading-tight font-semibold text-balance md:text-2xl"
                >
                  {activa.titulo}
                </h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-apagado">
                  {activa.sumario}
                </p>
              </>
            )}
          </div>

          <button
            ref={cierreRef}
            type="button"
            onClick={cerrar}
            className="shrink-0 rounded-md border border-borde px-3 py-2 font-mono text-meta text-apagado transition-colors hover:border-acento hover:text-texto"
          >
            Cerrar
            <span className="sr-only"> la capa complementaria</span>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-7">
          {meta.map((capa) => (
            <div key={capa.id} hidden={capa.id !== abierta}>
              {paneles[capa.id]}
            </div>
          ))}
        </div>

        <p className="hidden border-t border-borde px-5 py-3 font-mono text-meta text-apagado md:block md:px-7">
          Esc para cerrar
        </p>
      </div>
    </div>
  )
}
