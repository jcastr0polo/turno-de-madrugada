'use client'

import { useId, useState } from 'react'
import { encuesta } from '@/content/participacion'

/**
 * Encuesta con resultados en barra.
 *
 * El estado vive en memoria y arranca en cero: sembrar la encuesta con
 * resultados previos sería publicar cifras sin fuente.
 *
 * PARA CONECTAR UN BACKEND REAL: crear `app/api/encuesta/route.ts` con un
 * Route Handler (GET devuelve los conteos, POST registra un voto) y sustituir
 * `registrar` por un `fetch` a ese endpoint, guardando los conteos recibidos en
 * `votos`. Cualquier almacenamiento sirve mientras el POST sea idempotente por
 * sesión; conviene limitar por IP para evitar el voto repetido.
 */
export function Encuesta() {
  const idBase = useId()
  const [votos, setVotos] = useState<Record<string, number>>(() =>
    Object.fromEntries(encuesta.opciones.map((opcion) => [opcion.id, 0])),
  )
  const [elegida, setElegida] = useState<string | null>(null)

  const total = Object.values(votos).reduce((suma, n) => suma + n, 0)

  function registrar(opcionId: string) {
    if (elegida) return
    setVotos((previos) => ({ ...previos, [opcionId]: previos[opcionId] + 1 }))
    setElegida(opcionId)
  }

  return (
    <div>
      <fieldset className="border-0 p-0">
        <legend className="font-titular text-lg leading-snug font-medium text-balance">
          {encuesta.pregunta}
        </legend>

        <ul className="mt-6 space-y-3">
          {encuesta.opciones.map((opcion) => {
            const cuenta = votos[opcion.id]
            const porcentaje = total > 0 ? Math.round((cuenta / total) * 100) : 0
            const esSuya = elegida === opcion.id

            return (
              <li key={opcion.id}>
                {elegida ? (
                  <div
                    className="relative overflow-hidden border border-borde bg-fondo px-4 py-3"
                    aria-describedby={`${idBase}-aviso`}
                  >
                    <div
                      aria-hidden="true"
                      className={`absolute inset-y-0 left-0 transition-[width] duration-500 ${
                        esSuya ? 'bg-acento/25' : 'bg-borde/70'
                      }`}
                      style={{ width: `${porcentaje}%` }}
                    />
                    <div className="relative flex items-baseline justify-between gap-4">
                      <span className={`text-[0.9375rem] ${esSuya ? 'text-texto' : 'text-apagado'}`}>
                        {opcion.etiqueta}
                        {esSuya && <span className="sr-only"> (tu respuesta)</span>}
                      </span>
                      <span className="font-mono text-meta whitespace-nowrap text-acento">
                        {porcentaje} %
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => registrar(opcion.id)}
                    className="w-full border border-borde bg-fondo px-4 py-3 text-left text-[0.9375rem] text-apagado transition-colors hover:border-acento hover:text-texto"
                  >
                    {opcion.etiqueta}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </fieldset>

      <p id={`${idBase}-aviso`} className="mt-5 font-mono text-meta leading-relaxed text-apagado">
        {elegida ? `${total} respuesta${total === 1 ? '' : 's'} · ` : ''}
        {encuesta.aviso}
      </p>
    </div>
  )
}
