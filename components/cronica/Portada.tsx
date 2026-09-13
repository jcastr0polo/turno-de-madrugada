import { sitio } from '@/content/sitio'

/**
 * Portada. El titular lleva la marca de resaltador sobre el fragmento
 * declarado en `sitio.tituloMarcado`, que debe existir dentro del titular.
 */
export function Portada() {
  const [antes, despues] = sitio.titulo.split(sitio.tituloMarcado)

  return (
    <header className="px-5 pt-16 pb-14 sm:px-8 sm:pt-24 md:pb-20">
      <div className="mx-auto max-w-medida">
        <p className="font-mono text-meta tracking-[0.14em] text-apagado uppercase">
          {sitio.serie}
        </p>

        <p className="mt-10 font-mono text-3xl text-acento sm:text-4xl">{sitio.hora}</p>

        <h1 className="mt-6 font-titular text-[2.25rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl md:text-[3.5rem]">
          {antes}
          <span className="marca-titular">{sitio.tituloMarcado}</span>
          {despues}
        </h1>

        <p className="mt-7 text-[1.1875rem] leading-[1.7] text-apagado sm:text-xl">
          {sitio.bajada}
        </p>

        <div className="mt-10 border-t border-borde pt-6">
          <p className="font-titular text-base font-medium">{sitio.autora}</p>
          <p className="mt-1 text-[0.9375rem] text-apagado">
            {sitio.asignatura} · {sitio.institucion}
          </p>
          <p className="mt-4 font-mono text-meta tracking-[0.08em] text-apagado uppercase">
            {sitio.metadatos.join(' · ')}
          </p>
        </div>
      </div>
    </header>
  )
}
