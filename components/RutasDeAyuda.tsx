import { capas } from '@/content/capas'
import { sitio } from '@/content/sitio'

/**
 * Bloque de cierre. Toda página termina con las rutas de ayuda: es la regla de
 * cobertura responsable de esta pieza, no un adorno de pie.
 */
export function RutasDeAyuda() {
  const capa = capas.ayuda
  if (capa.id !== 'ayuda') return null

  return (
    <section
      id="ayuda"
      aria-labelledby="ayuda-titulo"
      className="scroll-mt-8 border-t-2 border-t-acento py-14 md:py-20"
    >
      <p className="font-mono text-meta tracking-[0.14em] text-acento uppercase">
        {sitio.secciones.ayuda.rotulo}
      </p>
      <h2 id="ayuda-titulo" className="mt-3 font-titular text-2xl font-semibold sm:text-3xl">
        {sitio.secciones.ayuda.titulo}
      </h2>

      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {capa.lineas.map((linea) => (
          <li key={linea.numero} className="rounded-lg border border-borde bg-superficie p-5">
            <a
              href={`tel:${linea.numero}`}
              className="font-mono text-4xl text-acento underline decoration-transparent underline-offset-8 transition-colors hover:decoration-acento"
            >
              {linea.numero}
              <span className="sr-only">, llamar</span>
            </a>
            <p className="mt-4 font-titular text-base leading-snug font-semibold">{linea.nombre}</p>
            <p className="mt-2 text-[0.9375rem] leading-[1.6] text-apagado">{linea.detalle}</p>
            <p className="mt-3 font-mono text-meta text-apagado">{linea.disponibilidad}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 max-w-medida space-y-4">
        {capa.notas.map((nota) => (
          <p key={nota.id} className="text-[0.9375rem] leading-[1.7] text-apagado">
            {nota.texto}
          </p>
        ))}
      </div>
    </section>
  )
}
