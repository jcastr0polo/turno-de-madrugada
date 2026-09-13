'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { CapaId } from '@/content/types'
import { Panel, type MetaCapa } from './Panel'

interface EstadoCapas {
  abierta: CapaId | null
  ancla?: string
  abrir: (id: CapaId, disparador: HTMLElement, ancla?: string) => void
  cerrar: () => void
}

const Contexto = createContext<EstadoCapas | null>(null)

export function useCapas(): EstadoCapas {
  const ctx = useContext(Contexto)
  if (!ctx) throw new Error('useCapas debe usarse dentro de <CapasProvider>.')
  return ctx
}

/**
 * Única isla de estado del hipertexto.
 *
 * Los cuerpos de las cinco capas llegan en `paneles` ya renderizados en el
 * servidor: el cliente solo decide cuál se muestra y gestiona el foco. Eso deja
 * el contenido de las capas en el HTML inicial y el JavaScript en lo mínimo.
 */
export function CapasProvider({
  meta,
  paneles,
  children,
}: {
  meta: MetaCapa[]
  paneles: Record<CapaId, ReactNode>
  children: ReactNode
}) {
  const [abierta, setAbierta] = useState<CapaId | null>(null)
  const [ancla, setAncla] = useState<string | undefined>(undefined)
  const disparadorRef = useRef<HTMLElement | null>(null)

  const abrir = useCallback((id: CapaId, disparador: HTMLElement, destino?: string) => {
    disparadorRef.current = disparador
    setAncla(destino)
    setAbierta(id)
  }, [])

  const cerrar = useCallback(() => {
    setAbierta(null)
    setAncla(undefined)
    // Al cerrar, el foco vuelve a la palabra que abrió la capa.
    const origen = disparadorRef.current
    if (origen) {
      requestAnimationFrame(() => origen.focus())
    }
  }, [])

  const valor = useMemo(
    () => ({ abierta, ancla, abrir, cerrar }),
    [abierta, ancla, abrir, cerrar],
  )

  return (
    <Contexto.Provider value={valor}>
      {/* Mientras la capa está abierta el resto del documento queda inerte:
          es lo que exige aria-modal para los lectores de pantalla. */}
      <div inert={abierta !== null}>{children}</div>
      <Panel meta={meta} paneles={paneles} />
    </Contexto.Provider>
  )
}
