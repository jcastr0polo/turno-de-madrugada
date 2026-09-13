import { fuentes } from '@/content/fuentes'
import type { FuenteId } from '@/content/types'

/** Pie de fuente. Si no hay URL estable, la fuente se cita sin enlace. */
export function CitaFuente({ id }: { id: FuenteId }) {
  const fuente = fuentes[id]
  if (!fuente) return null

  const texto = [fuente.entidad, fuente.documento, fuente.detalle].filter(Boolean).join(' · ')

  return (
    <p className="mt-4 font-mono text-meta text-apagado">
      <span className="text-acento">Fuente: </span>
      {fuente.url ? (
        <a
          href={fuente.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-borde underline-offset-4 transition-colors hover:decoration-acento hover:text-texto"
        >
          {texto}
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      ) : (
        texto
      )}
    </p>
  )
}
