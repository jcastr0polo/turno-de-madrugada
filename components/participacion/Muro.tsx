'use client'

import { useEffect, useId, useState, type FormEvent } from 'react'
import { muro } from '@/content/participacion'

interface Aporte {
  id: string
  alias: string
  texto: string
}

/**
 * Muro de turnos del público.
 *
 * Con base de datos conectada, el aporte se guarda y queda en revisión: la
 * pieza trata de salud mental y lleva el nombre de la autora, así que nada
 * aparece en el muro sin que ella lo haya leído. Sin base de datos, todo vive
 * en memoria y el aviso lo dice con todas las letras.
 */
export function Muro() {
  const idBase = useId()
  const [aportes, setAportes] = useState<Aporte[]>([])
  const [alias, setAlias] = useState('')
  const [texto, setTexto] = useState('')
  const [persistente, setPersistente] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)

  useEffect(() => {
    let vigente = true
    fetch('/api/muro')
      .then((r) => r.json())
      .then((datos) => {
        if (!vigente) return
        setPersistente(Boolean(datos.configurado))
        setAportes((datos.aportes ?? []) as Aporte[])
      })
      .catch(() => {})
    return () => {
      vigente = false
    }
  }, [])

  const restantes = muro.maxCaracteres - texto.length
  const valido = alias.trim().length > 0 && texto.trim().length > 0

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (!valido || enviando) return
    setMensaje(null)

    if (!persistente) {
      setAportes((previos) => [
        { id: `${Date.now()}`, alias: alias.trim(), texto: texto.trim() },
        ...previos,
      ])
      setAlias('')
      setTexto('')
      return
    }

    setEnviando(true)
    try {
      const respuesta = await fetch('/api/muro', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ alias: alias.trim(), texto: texto.trim() }),
      })

      if (respuesta.status === 429) {
        setMensaje(muro.exceso)
      } else if (!respuesta.ok) {
        setMensaje(muro.error)
      } else {
        const datos = await respuesta.json()
        setMensaje(
          datos.estado === 'publicado' ? muro.confirmacionDirecta : muro.confirmacion,
        )
        setAlias('')
        setTexto('')
        // Si se publica al instante, el muro se refresca para mostrarlo.
        if (datos.estado === 'publicado') {
          const listado = await fetch('/api/muro').then((r) => r.json())
          setAportes((listado.aportes ?? []) as Aporte[])
        }
      }
    } catch {
      setMensaje(muro.error)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="space-y-10">
      <form onSubmit={enviar} className="space-y-5">
        <p className="text-[0.9375rem] leading-[1.7] text-apagado">{muro.invitacion}</p>

        <div>
          <label
            htmlFor={`${idBase}-alias`}
            className="font-mono text-meta tracking-[0.12em] uppercase"
          >
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
            className="mt-2 w-full rounded-md border border-borde bg-superficie px-4 py-3 text-[0.9375rem] text-texto placeholder:text-apagado/60"
            placeholder={muro.marcadorAlias}
          />
        </div>

        <div>
          <label
            htmlFor={`${idBase}-texto`}
            className="font-mono text-meta tracking-[0.12em] uppercase"
          >
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
            className="mt-2 w-full resize-y rounded-md border border-borde bg-superficie px-4 py-3 text-[0.9375rem] leading-[1.7] text-texto placeholder:text-apagado/60"
            placeholder={muro.marcadorTexto}
          />
          <p id={`${idBase}-cuenta`} className="mt-2 font-mono text-meta text-apagado">
            {restantes} caracteres restantes
          </p>
        </div>

        <button
          type="submit"
          disabled={!valido || enviando}
          className="rounded-md border border-acento bg-acento px-5 py-3 font-mono text-meta tracking-[0.08em] text-fondo uppercase transition-opacity disabled:cursor-not-allowed disabled:border-borde disabled:bg-transparent disabled:text-apagado"
        >
          {enviando ? muro.botonEnviando : muro.boton}
        </button>

        <p aria-live="polite" className="text-meta leading-relaxed text-acento empty:hidden">
          {mensaje}
        </p>

        <p id={`${idBase}-aviso`} className="text-meta leading-relaxed text-apagado">
          {persistente ? muro.aviso : muro.avisoSesion}
        </p>
      </form>

      <div className="border-t border-borde pt-8">
        <h3 className="font-mono text-meta tracking-[0.12em] text-acento uppercase">
          {persistente ? 'Turnos publicados' : 'Turnos de esta sesión'}
        </h3>

        <ul aria-live="polite" className="mt-5 space-y-4">
          {aportes.length === 0 && (
            <li className="rounded-lg border border-dashed border-borde px-4 py-6 text-[0.9375rem] text-apagado">
              {muro.vacio}
            </li>
          )}

          {aportes.map((aporte) => (
            <li key={aporte.id} className="rounded-lg border border-borde bg-superficie px-4 py-4">
              <p className="font-mono text-meta text-acento">{aporte.alias}</p>
              <p className="mt-2 text-[0.9375rem] leading-[1.7]">{aporte.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
