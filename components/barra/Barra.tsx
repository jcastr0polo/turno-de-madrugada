import { IndiceCapas } from '@/components/barra/IndiceCapas'
import type { MetaCapa } from '@/components/capas/Panel'
import { capas } from '@/content/capas'
import { episodio } from '@/content/episodio'
import { sitio } from '@/content/sitio'

function Ficha({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-borde bg-superficie p-5">
      <h2 className="font-mono text-meta tracking-[0.12em] text-acento uppercase">{titulo}</h2>
      <div className="mt-4">{children}</div>
    </div>
  )
}

/**
 * Barra lateral derecha. Lleva lo que conviene tener siempre a la vista
 * durante la lectura: el índice de capas, la segunda pieza de la serie y las
 * líneas de ayuda.
 */
export function Barra({ meta }: { meta: MetaCapa[] }) {
  const capaAyuda = capas.ayuda

  return (
    <aside
      aria-label="Documentos y ayuda"
      className="shrink-0 space-y-5 md:sticky md:top-8 md:max-h-[calc(100dvh-4rem)] md:w-[15rem] md:self-start md:overflow-y-auto md:overscroll-contain lg:w-[18rem]"
    >
      <Ficha titulo={sitio.barra.capas.titulo}>
        <p className="mb-4 text-[0.875rem] leading-[1.6] text-apagado">
          {sitio.barra.capas.entrada}
        </p>
        <IndiceCapas meta={meta} />
      </Ficha>

      <Ficha titulo={sitio.barra.episodio.titulo}>
        <p className="font-titular text-lg leading-snug font-semibold">{episodio.titulo}</p>
        <p className="mt-2 font-mono text-meta text-apagado">{episodio.duracion}</p>
        <p className="mt-3 text-[0.875rem] leading-[1.6] text-apagado">
          {sitio.barra.episodio.linea}
        </p>
        <a
          href="#episodio"
          className="mt-4 inline-block font-mono text-meta text-acento underline decoration-borde underline-offset-4 transition-colors hover:decoration-acento"
        >
          {sitio.barra.episodio.enlace}
        </a>
      </Ficha>

      {capaAyuda.id === 'ayuda' && (
        <Ficha titulo={sitio.barra.ayuda.titulo}>
          <ul className="space-y-3">
            {capaAyuda.lineas.map((linea) => (
              <li key={linea.numero} className="flex items-baseline gap-3">
                <a
                  href={`tel:${linea.numero}`}
                  className="font-mono text-lg text-acento underline decoration-transparent underline-offset-4 transition-colors hover:decoration-acento"
                >
                  {linea.numero}
                  <span className="sr-only">, llamar</span>
                </a>
                <span className="text-[0.8125rem] leading-[1.5] text-apagado">{linea.nombre}</span>
              </li>
            ))}
          </ul>
        </Ficha>
      )}
    </aside>
  )
}
