'use client'

import { useEffect, useState } from 'react'
import { encuesta } from '@/content/participacion'

type Conteo = Record<string, number>

const vacio = (): Conteo =>
  Object.fromEntries(encuesta.opciones.map((opcion) => [opcion.id, 0]))

/**
 * Encuesta con resultados en barra.
 *
 * Si hay base de datos conectada, el voto persiste y una cookie httpOnly evita
 * que el mismo navegador cuente dos veces. Si no la hay, el conteo vive en
 * memoria y el aviso lo dice: nunca se anuncia una permanencia que no existe.
 */
export function Encuesta() {
  const [conteo, setConteo] = useState<Conteo>(vacio)
  const [elegida, setElegida] = useState<string | null>(null)
  const [persistente, setPersistente] = useState(false)
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    let vigente = true
    fetch('/api/encuesta')
      .then((r) => r.json())
      .then((datos) => {
        if (!vigente) return
        setPersistente(Boolean(datos.configurado))
        if (datos.configurado) {
          setConteo(datos.conteo as Conteo)
          if (datos.miVoto) setElegida(datos.miVoto as string)
        }
      })
      .catch(() => {})
    return () => {
      vigente = false
    }
  }, [])

  const total = Object.values(conteo).reduce((suma, n) => suma + n, 0)

  async function votar(opcionId: string) {
    if (enviando || elegida === opcionId) return

    if (!persistente) {
      setConteo((previos) => ({ ...previos, [opcionId]: previos[opcionId] + 1 }))
      setElegida(opcionId)
      return
    }

    setEnviando(true)
    try {
      const respuesta = await fetch('/api/encuesta', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ opcion: opcionId }),
      })
      if (respuesta.ok) {
        const datos = await respuesta.json()
        setConteo(datos.conteo as Conteo)
        setElegida(datos.miVoto as string)
      }
    } catch {
      /* sin conexión: la vista se queda como está */
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div>
      <fieldset className="border-0 p-0" disabled={enviando}>
        <legend className="font-titular text-lg leading-snug font-semibold text-balance">
          {encuesta.pregunta}
        </legend>

        <ul className="mt-6 space-y-3">
          {encuesta.opciones.map((opcion) => {
            const cuenta = conteo[opcion.id] ?? 0
            const porcentaje = total > 0 ? Math.round((cuenta / total) * 100) : 0
            const esSuya = elegida === opcion.id

            return (
              <li key={opcion.id}>
                {elegida ? (
                  <button
                    type="button"
                    onClick={() => votar(opcion.id)}
                    aria-pressed={esSuya}
                    className="relative w-full overflow-hidden rounded-md border border-borde bg-superficie px-4 py-3 text-left transition-colors hover:border-trazo"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-0 left-0 transition-[width] duration-500 ${
                        esSuya ? 'bg-acento/25' : 'bg-borde/70'
                      }`}
                      style={{ width: `${porcentaje}%` }}
                    />
                    <span className="relative flex items-baseline justify-between gap-4">
                      <span className={`text-[0.9375rem] ${esSuya ? 'text-texto' : 'text-apagado'}`}>
                        {opcion.etiqueta}
                        {esSuya && <span className="sr-only"> (tu respuesta)</span>}
                      </span>
                      <span className="font-mono text-meta whitespace-nowrap text-acento">
                        {porcentaje} %
                      </span>
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => votar(opcion.id)}
                    className="w-full rounded-md border border-borde bg-superficie px-4 py-3 text-left text-[0.9375rem] text-apagado transition-colors hover:border-acento hover:text-texto"
                  >
                    {opcion.etiqueta}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </fieldset>

      <p aria-live="polite" className="mt-5 font-mono text-meta leading-relaxed text-apagado">
        {elegida && total > 0 ? `${total} respuesta${total === 1 ? '' : 's'} · ` : ''}
        {persistente ? encuesta.aviso : encuesta.avisoSesion}
      </p>
    </div>
  )
}
