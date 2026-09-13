'use client'

import { useId, useRef, useState, type FormEvent } from 'react'
import { muro } from '@/content/participacion'

interface Aporte {
  id: string
  alias: string
  texto: string
}

/**
 * Muro de aportes del público.
 *
 * El estado vive en memoria: al recargar se pierde y nada sale del navegador.
 *
 * PARA CONECTAR UN BACKEND REAL: crear `app/api/muro/route.ts` con un Route
 * Handler (GET lista los aportes aprobados, POST recibe uno nuevo) y sustituir
 * el cuerpo de `enviar` por un `fetch` a ese endpoint. Dado el tema de la
 * pieza, el POST no debería publicar directamente: conviene guardar el aporte
 * en estado "en revisión" y publicarlo tras moderación humana.
 */
export function Muro() {
  const idBase = useId()
  const [aportes, setAportes] = useState<Aporte[]>([])
  const [alias, setAlias] = useState('')
  const [texto, setTexto] = useState('')
  const listaRef = useRef<HTMLUListElement>(null)

  const restantes = muro.maxCaracteres - texto.length
  const valido = alias.trim().length > 0 && texto.trim().length > 0

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (!valido) return

    setAportes((previos) => [
      { id: `${Date.now()}`, alias: alias.trim(), texto: texto.trim() },
      ...previos,
    ])
    setAlias('')
    setTexto('')
  }

  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
      <form onSubmit={enviar} className="space-y-5">
        <p className="text-[0.9375rem] leading-[1.7] text-apagado">{muro.invitacion}</p>

        <div>
          <label htmlFor={`${idBase}-alias`} className="font-mono text-meta tracking-[0.12em] uppercase">
            Alias
          </label>
          <input
            id={`${idBase}-alias`}
            name="alias"
            type="text"
            value={alias}
            maxLength={muro.maxAlias}
            autoComplete="off"
            onChange={(evento) => setAlias(evento.target.value)}
            className="mt-2 w-full border border-borde bg-fondo px-4 py-3 text-[0.9375rem] text-texto placeholder:text-apagado/60"
            placeholder="Cómo quieres firmar"
          />
        </div>

        <div>
          <label htmlFor={`${idBase}-texto`} className="font-mono text-meta tracking-[0.12em] uppercase">
            Tu turno
          </label>
          <textarea
            id={`${idBase}-texto`}
            name="texto"
            rows={4}
            value={texto}
            maxLength={muro.maxCaracteres}
            onChange={(evento) => setTexto(evento.target.value)}
            aria-describedby={`${idBase}-cuenta ${idBase}-aviso`}
            className="mt-2 w-full resize-y border border-borde bg-fondo px-4 py-3 text-[0.9375rem] leading-[1.7] text-texto placeholder:text-apagado/60"
            placeholder="A qué hora estudias o trabajas, y qué haces en esa hora"
          />
          <p id={`${idBase}-cuenta`} className="mt-2 font-mono text-meta text-apagado">
            {restantes} caracteres restantes
          </p>
        </div>

        <button
          type="submit"
          disabled={!valido}
          className="border border-acento bg-acento px-5 py-3 font-mono text-meta tracking-[0.08em] text-fondo uppercase transition-opacity disabled:cursor-not-allowed disabled:border-borde disabled:bg-transparent disabled:text-apagado"
        >
          Publicar aporte
        </button>

        <p id={`${idBase}-aviso`} className="text-meta leading-relaxed text-apagado">
          {muro.aviso}
        </p>
      </form>

      <div>
        <h3 className="font-mono text-meta tracking-[0.12em] text-acento uppercase">
          Aportes de esta sesión
        </h3>

        <ul ref={listaRef} aria-live="polite" className="mt-5 space-y-4">
          {aportes.length === 0 && (
            <li className="border border-dashed border-borde px-4 py-6 text-[0.9375rem] text-apagado">
              Todavía no hay aportes en esta sesión.
            </li>
          )}

          {aportes.map((aporte) => (
            <li key={aporte.id} className="border border-borde bg-superficie px-4 py-4">
              <p className="font-mono text-meta text-acento">{aporte.alias}</p>
              <p className="mt-2 text-[0.9375rem] leading-[1.7]">{aporte.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
