import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { COOKIE_SESION, claveConfigurada, sesionValida } from '@/lib/moderacion'
import { supabase } from '@/lib/supabase'
import { encuesta } from '@/content/participacion'
import { cambiarEstado, entrar, salir } from './acciones'

export const metadata: Metadata = {
  title: 'Moderación del muro',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

interface Aporte {
  id: string
  alias: string
  texto: string
  estado: string
  creado_en: string
}

const ESTADOS = [
  { clave: 'pendiente', titulo: 'En revisión', vacio: 'Nadie ha escrito todavía.' },
  { clave: 'publicado', titulo: 'En el muro', vacio: 'Todavía no has publicado ninguno.' },
  { clave: 'oculto', titulo: 'Retirados', vacio: 'No has retirado ninguno.' },
] as const

/**
 * Resultados de la encuesta. Aquí, a diferencia del muro público, se enseña
 * siempre el número absoluto junto al porcentaje: quien modera necesita saber
 * si un 100 % viene de un voto o de doscientos.
 */
function Encuesta({ votos }: { votos: string[] }) {
  const total = votos.length
  const conteo = Object.fromEntries(
    encuesta.opciones.map((opcion) => [opcion.id, votos.filter((v) => v === opcion.id).length]),
  ) as Record<string, number>

  const mayor = Math.max(1, ...Object.values(conteo))

  return (
    <section className="border-b border-borde py-10">
      <h2 className="font-mono text-meta tracking-[0.12em] text-acento uppercase">
        La encuesta · {total} {total === 1 ? 'respuesta' : 'respuestas'}
      </h2>
      <p className="mt-3 max-w-medida text-[0.9375rem] text-apagado">{encuesta.pregunta}</p>

      {total === 0 ? (
        <p className="mt-6 text-[0.9375rem] text-apagado">Todavía no ha votado nadie.</p>
      ) : (
        <ul className="mt-6 max-w-lectura space-y-3">
          {encuesta.opciones.map((opcion) => {
            const cuenta = conteo[opcion.id]
            const porcentaje = Math.round((cuenta / total) * 100)
            return (
              <li
                key={opcion.id}
                className="relative overflow-hidden rounded-md border border-borde bg-superficie px-4 py-3"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 bg-acento/20"
                  style={{ width: `${(cuenta / mayor) * 100}%` }}
                />
                <div className="relative flex items-baseline justify-between gap-4">
                  <span className="text-[0.9375rem]">{opcion.etiqueta}</span>
                  <span className="font-mono text-meta whitespace-nowrap">
                    <span className="text-acento">{porcentaje} %</span>
                    <span className="text-apagado">
                      {' '}
                      · {cuenta} de {total}
                    </span>
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

function fecha(iso: string) {
  return new Date(iso).toLocaleString('es-CO', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** Botón de acción. Sin JavaScript de cliente: es un formulario. */
function Accion({
  id,
  estado,
  children,
  destacado = false,
}: {
  id: string
  estado: 'publicado' | 'oculto' | 'pendiente'
  children: string
  destacado?: boolean
}) {
  return (
    <form action={cambiarEstado.bind(null, id, estado)}>
      <button
        type="submit"
        className={`rounded-md px-4 py-2 font-mono text-meta tracking-[0.08em] uppercase transition-colors ${
          destacado
            ? 'border border-acento bg-acento text-fondo'
            : 'border border-borde text-apagado hover:border-trazo hover:text-texto'
        }`}
      >
        {children}
      </button>
    </form>
  )
}

export default async function Moderacion({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  if (!claveConfigurada()) {
    return (
      <main className="mx-auto max-w-medida px-5 py-20">
        <h1 className="font-titular text-2xl font-semibold">Moderación sin configurar</h1>
        <p className="mt-4 text-[1rem] leading-[1.7] text-apagado">
          Falta <code className="font-mono text-acento">MODERACION_CLAVE</code> en las variables de
          entorno. Sin ella esta página no se abre para nadie.
        </p>
      </main>
    )
  }

  const galletas = await cookies()
  const dentro = sesionValida(galletas.get(COOKIE_SESION)?.value)

  if (!dentro) {
    return (
      <main className="mx-auto max-w-medida px-5 py-20">
        <p className="font-mono text-meta tracking-[0.14em] text-acento uppercase">
          Turno de madrugada
        </p>
        <h1 className="mt-4 font-titular text-2xl font-semibold">Moderación del muro</h1>

        <form action={entrar} className="mt-8 space-y-4">
          <label htmlFor="clave" className="block font-mono text-meta tracking-[0.12em] uppercase">
            Clave
          </label>
          <input
            id="clave"
            name="clave"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-md border border-borde bg-superficie px-4 py-3 text-[0.9375rem] text-texto"
          />
          {error && (
            <p role="alert" className="font-mono text-meta text-acento">
              Clave incorrecta.
            </p>
          )}
          <button
            type="submit"
            className="rounded-md border border-acento bg-acento px-5 py-3 font-mono text-meta tracking-[0.08em] text-fondo uppercase"
          >
            Entrar
          </button>
        </form>
      </main>
    )
  }

  const bd = supabase()
  const [respuestaAportes, respuestaVotos] = bd
    ? await Promise.all([
        bd
          .from('madrugada_aportes')
          .select('id, alias, texto, estado, creado_en')
          .order('creado_en', { ascending: false }),
        bd.from('madrugada_votos').select('opcion'),
      ])
    : [{ data: [] }, { data: [] }]

  const aportes = (respuestaAportes.data ?? []) as Aporte[]
  const votos = ((respuestaVotos.data ?? []) as { opcion: string }[]).map((v) => v.opcion)

  return (
    <main className="mx-auto max-w-ancho px-5 py-14 sm:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-borde pb-6">
        <div>
          <p className="font-mono text-meta tracking-[0.14em] text-acento uppercase">
            Turno de madrugada
          </p>
          <h1 className="mt-3 font-titular text-2xl font-semibold">Moderación del muro</h1>
          <p className="mt-2 text-[0.9375rem] text-apagado">
            Nada aparece en el muro hasta que lo publiques aquí.
          </p>
        </div>
        <form action={salir}>
          <button
            type="submit"
            className="rounded-md border border-borde px-4 py-2 font-mono text-meta text-apagado transition-colors hover:border-trazo hover:text-texto"
          >
            Salir
          </button>
        </form>
      </header>

      <Encuesta votos={votos} />

      {ESTADOS.map((grupo) => {
        const lista = aportes.filter((a) => a.estado === grupo.clave)
        return (
          <section key={grupo.clave} className="border-b border-borde py-10">
            <h2 className="font-mono text-meta tracking-[0.12em] text-acento uppercase">
              {grupo.titulo} · {lista.length}
            </h2>

            {lista.length === 0 ? (
              <p className="mt-4 text-[0.9375rem] text-apagado">{grupo.vacio}</p>
            ) : (
              <ul className="mt-6 space-y-4">
                {lista.map((aporte) => (
                  <li
                    key={aporte.id}
                    className="rounded-lg border border-borde bg-superficie p-5 md:flex md:items-start md:justify-between md:gap-6"
                  >
                    <div className="min-w-0 max-w-medida">
                      <p className="font-mono text-meta text-apagado">
                        <span className="text-acento">{aporte.alias}</span> · {fecha(aporte.creado_en)}
                      </p>
                      <p className="mt-2 text-[1rem] leading-[1.7]">{aporte.texto}</p>
                    </div>

                    <div className="mt-4 flex shrink-0 flex-wrap gap-2 md:mt-0">
                      {aporte.estado !== 'publicado' && (
                        <Accion id={aporte.id} estado="publicado" destacado>
                          Publicar
                        </Accion>
                      )}
                      {aporte.estado !== 'oculto' && (
                        <Accion id={aporte.id} estado="oculto">
                          Retirar
                        </Accion>
                      )}
                      {aporte.estado !== 'pendiente' && (
                        <Accion id={aporte.id} estado="pendiente">
                          A revisión
                        </Accion>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )
      })}
    </main>
  )
}
