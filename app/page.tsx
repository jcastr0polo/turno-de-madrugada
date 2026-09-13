import { Barra } from '@/components/barra/Barra'
import { CapasProvider } from '@/components/capas/CapasProvider'
import type { MetaCapa } from '@/components/capas/Panel'
import {
  CuerpoAyuda,
  CuerpoContexto,
  CuerpoDatos,
  CuerpoGlosario,
  CuerpoMetodo,
} from '@/components/capas/cuerpos'
import { Verificacion } from '@/components/cronica/Verificacion'
import { Cronica } from '@/components/cronica/Cronica'
import { Portada } from '@/components/cronica/Portada'
import { ComoSeHizo } from '@/components/ComoSeHizo'
import { TarjetaEpisodio } from '@/components/Episodio'
import { MapaRecorridos } from '@/components/MapaRecorridos'
import { Navegacion } from '@/components/Navegacion'
import { RutasDeAyuda } from '@/components/RutasDeAyuda'
import { Encuesta } from '@/components/participacion/Encuesta'
import { Muro } from '@/components/participacion/Muro'
import { Seccion } from '@/components/ui/Seccion'
import { capas, ordenCapas } from '@/content/capas'
import { sitio } from '@/content/sitio'
// Chequeo de integridad del hipertexto: rompe el build si un enlace interno falla.
import '@/lib/verificar-contenido'

/** Metadatos de las capas: lo único del contenido que cruza al cliente. */
const meta: MetaCapa[] = ordenCapas.map((id) => ({
  id,
  etiqueta: capas[id].etiqueta,
  titulo: capas[id].titulo,
  sumario: capas[id].sumario,
}))

export default function Pagina() {
  return (
    <CapasProvider
      meta={meta}
      /* Los cuerpos se renderizan en el servidor y viajan como slots:
         el cliente no vuelve a renderizar el contenido de las capas. */
      paneles={{
        glosario: <CuerpoGlosario />,
        datos: <CuerpoDatos />,
        contexto: <CuerpoContexto />,
        metodo: <CuerpoMetodo />,
        ayuda: <CuerpoAyuda />,
      }}
    >
      {/* Tres zonas: raíl de navegación, columna de lectura y barra de
          recursos. La composición no se centra: se ancla al raíl. */}
      <div className="mx-auto max-w-[80rem]">
        <div className="flex min-h-screen">
          <Navegacion secciones={sitio.navegacion} />

          <main className="grow overflow-hidden px-5 sm:px-8">
            <div className="mx-auto flex w-full max-w-ancho flex-col">
              <Portada />
              <Verificacion />

              <div className="pb-4 md:flex md:gap-10">
                <div className="grow">
                  <Cronica />
                </div>
                <Barra meta={meta} />
              </div>

              <Seccion
                id="participacion"
                rotulo={sitio.secciones.participacion.rotulo}
                titulo={sitio.secciones.participacion.titulo}
                descripcion={sitio.secciones.participacion.entrada}
                ancho="ancho"
              >
                <div className="grid gap-12 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]">
                  <Encuesta />
                  <Muro />
                </div>
              </Seccion>

              <Seccion
                id="episodio"
                rotulo={sitio.secciones.episodio.rotulo}
                titulo={sitio.secciones.episodio.titulo}
                descripcion={sitio.secciones.episodio.entrada}
                ancho="ancho"
              >
                <TarjetaEpisodio />
              </Seccion>

              <Seccion
                id="mapa"
                rotulo={sitio.secciones.mapa.rotulo}
                titulo={sitio.secciones.mapa.titulo}
                descripcion={sitio.secciones.mapa.entrada}
                ancho="ancho"
              >
                <MapaRecorridos />
              </Seccion>

              <Seccion
                id="como-se-hizo"
                rotulo={sitio.secciones.fuentes.rotulo}
                titulo={sitio.secciones.fuentes.titulo}
                descripcion={sitio.secciones.fuentes.entrada}
                ancho="ancho"
              >
                <ComoSeHizo />
              </Seccion>

              <RutasDeAyuda />

              <footer className="border-t border-borde py-8">
                <p className="font-mono text-meta leading-relaxed text-apagado">
                  {sitio.serie} · {sitio.autora} · {sitio.asignatura}, {sitio.institucion} ·{' '}
                  {sitio.ciudad}
                </p>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </CapasProvider>
  )
}
