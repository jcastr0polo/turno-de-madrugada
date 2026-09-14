import { capas } from '@/content/capas'
import { CitaFuente } from './CitaFuente'

const parrafo = 'text-[1rem] leading-[1.7] text-texto'
const secundario = 'text-[0.9375rem] leading-[1.7] text-apagado'

export function CuerpoGlosario() {
  const capa = capas.glosario
  if (capa.id !== 'glosario') return null

  return (
    <dl className="space-y-6">
      {capa.entradas.map((entrada) => (
        <div key={entrada.id} data-ancla={entrada.id}>
          <dt className="font-titular text-lg font-semibold">{entrada.termino}</dt>
          <dd className={`mt-2 ${parrafo}`}>{entrada.definicion}</dd>
        </div>
      ))}
    </dl>
  )
}

export function CuerpoDatos() {
  const capa = capas.datos
  if (capa.id !== 'datos') return null

  return (
    <div className="space-y-8">
      {capa.datos.map((dato) => (
        <div key={dato.id} data-ancla={dato.id}>
          <p className="font-mono text-xl leading-tight text-acento sm:text-2xl">{dato.cifra}</p>
          <p className={`mt-3 ${parrafo}`}>{dato.enunciado}</p>

          <dl className="mt-5 border-t border-borde">
            {dato.detalle.map((fila) => (
              <div
                key={fila.etiqueta}
                className="flex items-baseline justify-between gap-4 border-b border-borde py-2"
              >
                <dt className={secundario}>{fila.etiqueta}</dt>
                <dd className="font-mono text-[0.9375rem] whitespace-nowrap">{fila.valor}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 border-l-2 border-acento pl-4">
            <p className="font-mono text-meta tracking-[0.14em] text-acento uppercase">
              Lectura del dato
            </p>
            <p className={`mt-2 ${secundario}`}>{dato.lectura}</p>
          </div>

          <div className="mt-4 space-y-2 border-t border-borde pt-4">
            {dato.fuentes.map((id) => (
              <CitaFuente key={id} id={id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function CuerpoContexto() {
  const capa = capas.contexto
  if (capa.id !== 'contexto') return null

  return (
    <div className="space-y-8">
      <ol className="space-y-6">
        {capa.normas.map((norma) => (
          <li key={norma.id} data-ancla={norma.id} className="border-l-2 border-borde pl-4">
            <p className="font-mono text-[0.9375rem] text-acento">{norma.nombre}</p>
            <p className={`mt-2 ${parrafo}`}>{norma.que}</p>
          </li>
        ))}
      </ol>

      <div className="border-t border-borde pt-6">
        <p className={secundario}>
          De ese cruce salen tres preguntas que cualquier institución puede responder por escrito:
        </p>
        <ul className="mt-4 space-y-3">
          {capa.preguntas.map((pregunta) => (
            <li key={pregunta} className={`flex gap-3 ${parrafo}`}>
              <span aria-hidden="true" className="font-mono text-acento">
                —
              </span>
              <span>{pregunta}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        <CitaFuente id="ley1413" />
      </div>
    </div>
  )
}

export function CuerpoMetodo() {
  const capa = capas.metodo
  if (capa.id !== 'metodo') return null

  return (
    <div className="space-y-6">
      <p className={parrafo}>{capa.intro}</p>

      <ol className="space-y-6">
        {capa.reglas.map((regla) => (
          <li key={regla.id} className="border-l-2 border-borde pl-4">
            <p className="font-mono text-meta tracking-[0.14em] text-acento uppercase">
              {regla.rotulo}
            </p>
            <p className={`mt-2 ${parrafo}`}>{regla.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function CuerpoAyuda() {
  const capa = capas.ayuda
  if (capa.id !== 'ayuda') return null

  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {capa.lineas.map((linea) => (
          <li key={linea.numero} className="rounded-lg border border-borde bg-fondo p-4">
            <a
              href={`tel:${linea.numero}`}
              className="font-mono text-2xl text-acento underline decoration-transparent underline-offset-4 transition-colors hover:decoration-acento"
            >
              {linea.numero}
              <span className="sr-only">, llamar</span>
            </a>
            <p className="mt-2 font-titular text-base font-semibold">{linea.nombre}</p>
            <p className={`mt-1 ${secundario}`}>{linea.detalle}</p>
            <p className="mt-2 font-mono text-meta text-apagado">{linea.disponibilidad}</p>
          </li>
        ))}
      </ul>

      {capa.notas.map((nota) => (
        <div key={nota.id} data-ancla={nota.id} className="border-l-2 border-borde pl-4">
          <p className={secundario}>{nota.texto}</p>
        </div>
      ))}

      <div className="space-y-1">
        <CitaFuente id="minsaludDirectorio" />
        <CitaFuente id="minsaludLinea106" />
        <CitaFuente id="santaMarta" />
      </div>
    </div>
  )
}
