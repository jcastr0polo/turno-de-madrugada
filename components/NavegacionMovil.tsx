'use client'

import { useEffect, useRef, useState } from 'react'
import { useCapas } from '@/components/capas/CapasProvider'
import type { MetaCapa } from '@/components/capas/Panel'

interface Seccion {
  id: string
  etiqueta: string
}

/**
 * Acceso rápido en teléfono. El raíl lateral no cabe en una pantalla estrecha,
 * y sin él lo importante quedaba al final de una lectura de siete minutos: el
 * índice de capas y, sobre todo, las líneas de ayuda.
 *
 * El índice usa un <dialog> nativo con showModal(): la trampa de foco, el
 * cierre con Escape y el fondo inerte los pone el navegador, no yo.
 */
export function NavegacionMovil({
  secciones,
  capas,
}: {
  secciones: Seccion[]
  capas: MetaCapa[]
}) {
  const { abrir } = useCapas()
  const dialogoRef = useRef<HTMLDialogElement>(null)
  const ayudaRef = useRef<HTMLButtonElement>(null)
  const [abierto, setAbierto] = useState(false)

  // El <dialog> se abre por método, no por atributo: es la única forma de
  // obtener el comportamiento modal nativo.
  useEffect(() => {
    const dialogo = dialogoRef.current
    if (!dialogo) return
    if (abierto && !dialogo.open) dialogo.showModal()
    if (!abierto && dialogo.open) dialogo.close()
  }, [abierto])

  function irA(id: string) {
    setAbierto(false)
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    })
  }

  const boton =
    'flex flex-1 items-center justify-center gap-2 py-4 font-mono text-meta tracking-[0.08em] uppercase transition-colors'

  return (
    <>
      <nav
        aria-label="Acceso rápido"
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-borde bg-superficie sm:hidden"
      >
        <button
          type="button"
          onClick={() => setAbierto(true)}
          aria-haspopup="dialog"
          className={`${boton} border-r border-borde text-apagado`}
        >
          Índice
        </button>
        <button
          ref={ayudaRef}
          type="button"
          onClick={() => ayudaRef.current && abrir('ayuda', ayudaRef.current)}
          className={`${boton} text-acento`}
        >
          Ayuda
        </button>
      </nav>

      <dialog
        ref={dialogoRef}
        aria-label="Índice de la crónica"
        onClose={() => setAbierto(false)}
        onClick={(evento) => {
          // Clic en el fondo: el propio <dialog> ocupa toda la ventana, así que
          // se distingue comparando con su caja interior.
          const caja = dialogoRef.current?.getBoundingClientRect()
          if (!caja) return
          const fuera =
            evento.clientY < caja.top ||
            evento.clientY > caja.bottom ||
            evento.clientX < caja.left ||
            evento.clientX > caja.right
          if (fuera) setAbierto(false)
        }}
        className="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[80dvh] w-full max-w-none overflow-y-auto rounded-t-xl border-t-2 border-t-acento bg-superficie p-0 text-texto backdrop:bg-fondo/75"
      >
        <div className="px-5 py-6">
          <p className="font-mono text-meta tracking-[0.14em] text-acento uppercase">
            Detrás del texto
          </p>
          <ul className="mt-4 space-y-px">
            {capas.map((capa) => (
              <li key={capa.id}>
                <button
                  type="button"
                  onClick={(evento) => {
                    setAbierto(false)
                    const origen = evento.currentTarget
                    requestAnimationFrame(() => abrir(capa.id, origen))
                  }}
                  className="w-full border-l-2 border-l-borde py-3 pl-4 text-left text-[1rem] text-apagado"
                >
                  {capa.etiqueta}
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-mono text-meta tracking-[0.14em] text-acento uppercase">
            Secciones
          </p>
          <ul className="mt-4 space-y-px">
            {secciones.map((seccion) => (
              <li key={seccion.id}>
                <button
                  type="button"
                  onClick={() => irA(seccion.id)}
                  className="w-full border-l-2 border-l-borde py-3 pl-4 text-left text-[1rem] text-apagado"
                >
                  {seccion.etiqueta}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setAbierto(false)}
            className="mt-8 w-full rounded-md border border-borde py-3 font-mono text-meta tracking-[0.08em] text-apagado uppercase"
          >
            Cerrar
          </button>
        </div>
      </dialog>
    </>
  )
}
