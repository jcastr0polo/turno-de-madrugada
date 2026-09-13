import type { ReactNode } from 'react'

/**
 * Envoltura de sección. Concentra el ritmo vertical y el rótulo monoespaciado
 * para que ninguna sección invente su propio espaciado.
 */
export function Seccion({
  id,
  rotulo,
  titulo,
  descripcion,
  ancho = 'medida',
  children,
}: {
  id: string
  rotulo: string
  titulo: string
  descripcion?: string
  ancho?: 'medida' | 'ancho'
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="border-t border-borde px-5 py-16 sm:px-8 md:py-24"
    >
      <div className={`mx-auto ${ancho === 'medida' ? 'max-w-medida' : 'max-w-ancho'}`}>
        <p className="font-mono text-meta tracking-[0.14em] text-acento uppercase">{rotulo}</p>
        <h2
          id={`${id}-titulo`}
          className="mt-4 font-titular text-2xl leading-tight font-semibold text-balance sm:text-3xl"
        >
          {titulo}
        </h2>
        {descripcion && (
          <p className="mt-4 max-w-medida text-[1rem] leading-[1.7] text-apagado">{descripcion}</p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
