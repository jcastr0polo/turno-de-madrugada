import { episodio } from '@/content/episodio'
import { sitio } from '@/content/sitio'

/** Tarjeta de la segunda pieza de la serie. Enlaza el audio y dice qué aporta. */
export function TarjetaEpisodio() {
  return (
    <div className="max-w-lectura rounded-lg border border-borde bg-superficie p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-meta tracking-[0.12em] text-apagado uppercase">
        <span>{episodio.plataforma}</span>
        <span aria-hidden="true" className="text-borde">
          ·
        </span>
        <span>{episodio.duracion}</span>
        <span aria-hidden="true" className="text-borde">
          ·
        </span>
        <span className="text-acento">{sitio.secciones.episodio.rotulo}</span>
      </div>

      <h3 className="mt-5 font-titular text-2xl leading-tight font-semibold">{episodio.titulo}</h3>

      <div className="mt-6">
        <p className="font-mono text-meta tracking-[0.12em] text-acento uppercase">
          En el audio
        </p>
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

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {episodio.url ? (
          <a
            href={episodio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-acento bg-acento px-5 py-3 font-mono text-meta tracking-[0.08em] text-fondo uppercase"
          >
            Escuchar en {episodio.plataforma}
          </a>
        ) : (
          <>
            <button
              type="button"
              disabled
              aria-describedby="episodio-aviso"
              className="cursor-not-allowed rounded-md border border-borde px-5 py-3 font-mono text-meta tracking-[0.08em] text-apagado uppercase"
            >
              Escuchar en {episodio.plataforma}
            </button>
            <p id="episodio-aviso" className="font-mono text-meta text-acento">
              {episodio.avisoSinPublicar}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
