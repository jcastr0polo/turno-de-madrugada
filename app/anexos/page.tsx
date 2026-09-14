import type { Metadata } from 'next'
import { ComoSeHizo } from '@/components/ComoSeHizo'
import { MapaRecorridos } from '@/components/MapaRecorridos'
import { sitio } from '@/content/sitio'

/**
 * Anexos del entregable académico.
 *
 * Esta página no es el nodo. Existe para capturar dos piezas que el trabajo
 * escrito pide documentar —el mapa rizomático y la matriz de fuentes con sus
 * consentimientos— y que dentro de la crónica solo servirían para que la pieza
 * se explicara a sí misma.
 *
 * Va fuera de los buscadores y sin enlace desde el nodo.
 */
export const metadata: Metadata = {
  title: 'Anexos del entregable',
  robots: { index: false, follow: false },
}

export default function Anexos() {
  return (
    <main className="mx-auto max-w-ancho px-5 py-14 sm:px-8">
      <header className="max-w-lectura border-b border-borde pb-8">
        <p className="font-mono text-meta tracking-[0.14em] text-acento uppercase">
          {sitio.anexo.titulo}
        </p>
        <h1 className="mt-4 font-titular text-3xl leading-tight font-semibold">{sitio.titulo}</h1>
        <p className="mt-4 text-[1rem] leading-[1.7] text-apagado">{sitio.anexo.entrada}</p>

        <dl className="mt-8 grid gap-x-8 gap-y-3 font-mono text-meta sm:grid-cols-2">
          {[
            ['Autora', sitio.autora],
            ['Asignatura', sitio.asignatura],
            ['Institución', sitio.institucion],
            ['Ciudad', sitio.ciudad],
          ].map(([etiqueta, valor]) => (
            <div key={etiqueta} className="flex gap-3">
              <dt className="text-apagado">{etiqueta}</dt>
              <dd>{valor}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section aria-labelledby="anexo-mapa" className="border-b border-borde py-12">
        <h2 id="anexo-mapa" className="font-mono text-meta tracking-[0.12em] text-acento uppercase">
          {sitio.anexo.mapa}
        </h2>
        <div className="mt-8">
          <MapaRecorridos />
        </div>
      </section>

      <section aria-labelledby="anexo-excel" className="border-b border-borde py-12">
        <h2
          id="anexo-excel"
          className="font-mono text-meta tracking-[0.12em] text-acento uppercase"
        >
          {sitio.anexo.excel}
        </h2>
        <p className="mt-4 max-w-medida text-[1rem] leading-[1.7] text-apagado">
          {sitio.anexo.excelPie}
        </p>
        <a
          href={sitio.anexo.excelArchivo}
          download
          className="mt-6 inline-block rounded-md border border-acento bg-acento px-5 py-3 font-mono text-meta tracking-[0.08em] text-fondo uppercase"
        >
          Descargar el libro (.xlsx)
        </a>
      </section>

      <section aria-labelledby="anexo-matriz" className="py-12">
        <h2
          id="anexo-matriz"
          className="font-mono text-meta tracking-[0.12em] text-acento uppercase"
        >
          {sitio.anexo.matriz}
        </h2>
        <div className="mt-8">
          <ComoSeHizo />
        </div>
      </section>
    </main>
  )
}
