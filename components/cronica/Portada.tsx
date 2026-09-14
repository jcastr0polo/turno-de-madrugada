import { sitio } from '@/content/sitio'

/**
 * Portada. El titular lleva la marca de resaltador sobre el fragmento
 * declarado en `sitio.tituloMarcado`, que debe existir dentro del titular.
 */
export function Portada() {
  const [antes, despues] = sitio.titulo.split(sitio.tituloMarcado)

  return (
    <header className="max-w-lectura pt-10 pb-12 md:pt-14">
      <p className="font-mono text-meta tracking-[0.14em] text-apagado uppercase">{sitio.serie}</p>

      <p className="mt-8 font-mono text-3xl text-acento sm:text-4xl">{sitio.hora}</p>

      <h1 className="mt-5 font-titular text-[2.25rem] leading-[1.12] font-semibold tracking-tight text-balance sm:text-5xl">
        {antes}
        <span className="resaltado">{sitio.tituloMarcado}</span>
        {despues}
      </h1>

      <p className="mt-6 max-w-medida text-[1.1875rem] leading-[1.7] text-apagado">
        {sitio.bajada}
      </p>

      <div className="mt-8 border-t border-borde pt-5">
        <p className="font-mono text-meta tracking-[0.08em] text-apagado uppercase">
          {sitio.metadatos.join(' · ')}
        </p>
      </div>
    </header>
  )
}
