import { Fragment } from 'react'
import { Disparador } from '@/components/capas/Disparador'
import { capas } from '@/content/capas'
import type { Inline } from '@/content/types'

/**
 * Renderiza el texto en línea. Es el único punto donde el contenido se
 * convierte en marcado: el archivo de contenido nunca contiene JSX.
 */
export function Texto({ nodos }: { nodos: Inline[] }) {
  return (
    <>
      {nodos.map((nodo, i) => {
        if (typeof nodo === 'string') return <Fragment key={i}>{nodo}</Fragment>

        switch (nodo.t) {
          case 'enfasis':
            return <em key={i}>{nodo.texto}</em>

          case 'capa':
            return (
              <Disparador
                key={i}
                capa={nodo.capa}
                ancla={nodo.ancla}
                etiqueta={capas[nodo.capa].etiqueta}
              >
                {nodo.texto}
              </Disparador>
            )

          case 'enlace':
            return (
              <a
                key={i}
                href={nodo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-borde underline-offset-4 hover:decoration-acento"
              >
                {nodo.texto}
              </a>
            )

          case 'pendiente':
            return (
              <mark
                key={i}
                className="bg-transparent font-mono text-meta text-acento"
                title={nodo.nota}
              >
                [PENDIENTE DE REPORTERÍA]
              </mark>
            )
        }
      })}
    </>
  )
}
