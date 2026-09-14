import { Reproductor } from '@/components/Reproductor'
import { episodio } from '@/content/episodio'

/** Tarjeta de la segunda pieza de la serie: el episodio y qué se oye en él. */
export function TarjetaEpisodio() {
  return (
    <div className="max-w-lectura rounded-lg border border-borde bg-superficie p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-meta tracking-[0.12em] text-apagado uppercase">
        <span className="text-acento">{episodio.serie}</span>
        <span aria-hidden="true" className="text-borde">
          ·
        </span>
        <span>{episodio.duracion}</span>
      </div>

      <h3 className="mt-5 font-titular text-2xl leading-tight font-semibold">{episodio.titulo}</h3>

      <Reproductor
        archivo={episodio.archivo}
        titulo={episodio.titulo}
        duracion={episodio.duracion}
      />

      {episodio.enEdicion && (
        <p className="mt-4 flex gap-3 text-[0.875rem] leading-[1.6] text-apagado">
          <span aria-hidden="true" className="font-mono text-acento">
            —
          </span>
          <span>{episodio.avisoEdicion}</span>
        </p>
      )}

      <div className="mt-8 border-t border-borde pt-6">
        <p className="font-mono text-meta tracking-[0.12em] text-acento uppercase">En el audio</p>
        <ul className="mt-4 space-y-3">
          {episodio.aporta.map((punto) => (
            <li key={punto} className="flex gap-3 text-[0.9375rem] leading-[1.7] text-apagado">
              <span aria-hidden="true" className="font-mono text-acento">
                —
              </span>
              <span>{punto}</span>
            </li>
          ))}
        </ul>
      </div>

      {episodio.externo && (
        <a
          href={episodio.externo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-md border border-borde px-5 py-3 font-mono text-meta tracking-[0.08em] text-apagado uppercase transition-colors hover:border-acento hover:text-texto"
        >
          Escuchar en {episodio.externo.plataforma}
        </a>
      )}
    </div>
  )
}
