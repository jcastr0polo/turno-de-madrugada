import type { ReactNode } from 'react'

/**
 * Envoltura de sección. Concentra el ritmo vertical y el rótulo monoespaciado.
 * No centra nada: el ancho lo fija la rejilla de la página.
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
      className="scroll-mt-8 border-t border-borde py-14 md:py-20"
    >
      <p className="font-mono text-meta tracking-[0.14em] text-acento uppercase">{rotulo}</p>
      <h2
        id={`${id}-titulo`}
        className="mt-3 font-titular text-2xl leading-tight font-semibold text-balance sm:text-3xl"
      >
        {titulo}
      </h2>
      {descripcion && (
        <p className="mt-4 max-w-medida text-[1rem] leading-[1.7] text-apagado">{descripcion}</p>
      )}
      <div className={`mt-10 ${ancho === 'medida' ? 'max-w-medida' : ''}`}>{children}</div>
    </section>
  )
}
