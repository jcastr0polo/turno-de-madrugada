'use client'

import { useEffect, useState } from 'react'

interface Seccion {
  id: string
  etiqueta: string
}

/**
 * Raíl de navegación fijo. En una lectura larga sirve de índice y de barra de
 * posición: la sección visible queda marcada con una línea de acento en el
 * borde derecho.
 */
export function Navegacion({ secciones }: { secciones: Seccion[] }) {
  const [activa, setActiva] = useState<string>(secciones[0].id)

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((entrada) => entrada.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActiva(visible.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )

    for (const seccion of secciones) {
      const nodo = document.getElementById(seccion.id)
      if (nodo) observador.observe(nodo)
    }
    return () => observador.disconnect()
  }, [secciones])

  return (
    <div className="sticky top-0 hidden h-screen w-20 shrink-0 border-r border-borde sm:block lg:w-24">
      <nav aria-label="Secciones de la crónica" className="flex h-full items-center">
        <ul className="w-full">
          {secciones.map((seccion) => {
            const esActiva = activa === seccion.id
            return (
              <li key={seccion.id}>
                <a
                  href={`#${seccion.id}`}
                  aria-current={esActiva ? 'true' : undefined}
                  className={`relative flex h-11 items-center justify-center px-2 text-center font-mono text-[0.6875rem] tracking-[0.08em] uppercase transition-colors ${
                    esActiva
                      ? 'rail-activo text-acento'
                      : 'text-apagado hover:text-texto'
                  }`}
                >
                  {seccion.etiqueta}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
