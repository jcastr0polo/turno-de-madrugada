import { cronica } from '@/content/cronica'
import { Texto } from './Texto'

/**
 * Cuerpo de la crónica en cuatro bloques. Los antetítulos son documentales:
 * no llevan numeración de escena ni marca horaria.
 */
export function Cronica() {
  return (
    <article id="cronica" className="scroll-mt-8 max-w-medida py-14 md:py-16">
      <div>
        {cronica.bloques.map((bloque, indice) => (
          <section
            key={bloque.id}
            id={bloque.id}
            aria-labelledby={`${bloque.id}-antetitulo`}
            className={indice > 0 ? 'mt-14 border-t border-borde pt-14 md:mt-16 md:pt-16' : ''}
          >
            <h2 id={`${bloque.id}-antetitulo`} className="font-mono text-meta tracking-[0.12em] uppercase">
              <span className="text-acento">{bloque.antetitulo.marca}</span>
              <span aria-hidden="true" className="px-2 text-borde">
                ·
              </span>
              <span className="text-apagado">{bloque.antetitulo.nota}</span>
            </h2>

            <div className="mt-8 space-y-7">
              {bloque.parrafos.map((parrafo, i) => {
                if (parrafo.t === 'apunte') {
                  return (
                    <p
                      key={i}
                      className="border-l-2 border-borde py-1 pl-5 text-[1rem] leading-[1.7] text-apagado italic"
                    >
                      <Texto nodos={parrafo.contenido} />
                    </p>
                  )
                }

                if (parrafo.t === 'cita') {
                  return (
                    <figure key={i} className="border-l-2 border-acento pl-5">
                      <blockquote className="text-[1.1875rem] leading-[1.7]">
                        <Texto nodos={parrafo.contenido} />
                      </blockquote>
                      <figcaption className="mt-3 font-mono text-meta text-apagado">
                        {parrafo.atribucion} · consentimiento {parrafo.consentimiento}
                      </figcaption>
                    </figure>
                  )
                }

                return (
                  <p key={i} className="text-cuerpo">
                    <Texto nodos={parrafo.contenido} />
                  </p>
                )
              })}
            </div>
          </section>
        ))}

      </div>
    </article>
  )
}
