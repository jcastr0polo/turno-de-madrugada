import { CapasProvider } from '@/components/capas/CapasProvider'
import type { MetaCapa } from '@/components/capas/Panel'
import {
  CuerpoAyuda,
  CuerpoContexto,
  CuerpoDatos,
  CuerpoGlosario,
  CuerpoMetodo,
} from '@/components/capas/cuerpos'
import { ComoLeer } from '@/components/cronica/ComoLeer'
import { Cronica } from '@/components/cronica/Cronica'
import { Portada } from '@/components/cronica/Portada'
import { ComoSeHizo } from '@/components/ComoSeHizo'
import { TarjetaEpisodio } from '@/components/Episodio'
import { MapaRecorridos } from '@/components/MapaRecorridos'
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
      <main id="cronica">
        <Portada />
        <ComoLeer />
        <Cronica />

        <Seccion
          id="participacion"
          rotulo="Participación"
          titulo="La hora que nadie reclama"
          descripcion="Dos preguntas abiertas al público. Nada de lo que escribas sale de tu navegador."
          ancho="ancho"
        >
          <div className="grid gap-14 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <Encuesta />
            <Muro />
          </div>
        </Seccion>

        <Seccion
          id="episodio"
          rotulo="Segunda pieza"
          titulo="El mismo día, contado en voz"
          descripcion="El audio no repite la crónica: la completa con lo que el texto no puede sostener."
        >
          <TarjetaEpisodio />
        </Seccion>

        <Seccion
          id="mapa"
          rotulo="Arquitectura"
          titulo="Mapa de recorridos"
          descripcion="Cómo se conectan las piezas de esta publicación."
          ancho="ancho"
        >
          <MapaRecorridos />
        </Seccion>

        <Seccion
          id="como-se-hizo"
          rotulo="Transparencia"
          titulo="Cómo se hizo"
          descripcion={`Toda cifra de esta crónica tiene un documento detrás. ${sitio.ciudad}, ${sitio.asignatura}, ${sitio.institucion}.`}
          ancho="ancho"
        >
          <ComoSeHizo />
        </Seccion>
      </main>

      <footer>
        <RutasDeAyuda />
        <div className="border-t border-borde px-5 py-8 sm:px-8">
          <p className="mx-auto max-w-ancho font-mono text-meta leading-relaxed text-apagado">
            {sitio.serie} · {sitio.autora} · {sitio.asignatura}, {sitio.institucion} ·{' '}
            {sitio.ciudad}
          </p>
        </div>
      </footer>
    </CapasProvider>
  )
}
