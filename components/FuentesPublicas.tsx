import { fuentes } from '@/content/fuentes'

/**
 * Lista pública de documentos. Dice qué sostiene cada papel y dónde
 * descargarlo. El contraste y el estado del consentimiento no aparecen: eso es
 * la matriz de seguimiento de fuentes, que pertenece al entregable académico y
 * no tiene lector aquí.
 */
export function FuentesPublicas() {
  const publicables = Object.values(fuentes).filter((fuente) => fuente.aporte)

  return (
    <ul className="max-w-lectura divide-y divide-borde border-t border-borde">
      {publicables.map((fuente) => (
        <li key={fuente.id} className="py-5">
          <p className="text-[0.9375rem] leading-[1.6] text-apagado">{fuente.aporte}</p>
          <p className="mt-2">
            {fuente.url ? (
              <a
                href={fuente.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[1rem] leading-snug text-acento underline decoration-borde underline-offset-4 transition-colors hover:decoration-acento"
              >
                {fuente.entidad}, {fuente.documento}
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            ) : (
              <span className="text-[1rem] leading-snug">
                {fuente.entidad}, {fuente.documento}
              </span>
            )}
            {fuente.detalle && (
              <span className="block font-mono text-meta text-apagado">{fuente.detalle}</span>
            )}
          </p>
        </li>
      ))}
    </ul>
  )
}
