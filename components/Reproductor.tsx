'use client'

import { useEffect, useId, useRef, useState } from 'react'

/** mm:ss para lectura rápida; texto hablado para el lector de pantalla. */
function reloj(segundos: number): string {
  if (!Number.isFinite(segundos) || segundos < 0) return '--:--'
  const m = Math.floor(segundos / 60)
  const s = Math.floor(segundos % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function dicho(segundos: number): string {
  if (!Number.isFinite(segundos) || segundos < 0) return 'sin cargar'
  const m = Math.floor(segundos / 60)
  const s = Math.floor(segundos % 60)
  return `${m} ${m === 1 ? 'minuto' : 'minutos'} y ${s} ${s === 1 ? 'segundo' : 'segundos'}`
}

const VELOCIDADES = [1, 1.25, 1.5, 0.75]

/**
 * Reproductor del episodio.
 *
 * El avance es un <input type="range"> de verdad: se maneja con las flechas
 * del teclado, anuncia su posición y no hay que reimplementar nada de eso.
 * El elemento <audio> queda oculto porque sus controles nativos no se pueden
 * vestir, pero sigue siendo el que reproduce.
 */
export function Reproductor({
  archivo,
  titulo,
  duracion,
}: {
  archivo: string
  titulo: string
  duracion: string
}) {
  const idBase = useId()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [sonando, setSonando] = useState(false)
  const [actual, setActual] = useState(0)
  const [total, setTotal] = useState(0)
  const [velocidad, setVelocidad] = useState(1)
  const [fallo, setFallo] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const alCargar = () => setTotal(audio.duration)
    const alAvanzar = () => setActual(audio.currentTime)
    const alSonar = () => setSonando(true)
    const alParar = () => setSonando(false)
    const alTerminar = () => {
      setSonando(false)
      setActual(0)
    }
    const alFallar = () => setFallo(true)

    audio.addEventListener('loadedmetadata', alCargar)
    audio.addEventListener('timeupdate', alAvanzar)
    audio.addEventListener('play', alSonar)
    audio.addEventListener('pause', alParar)
    audio.addEventListener('ended', alTerminar)
    audio.addEventListener('error', alFallar)

    if (audio.readyState >= 1) setTotal(audio.duration)

    return () => {
      audio.removeEventListener('loadedmetadata', alCargar)
      audio.removeEventListener('timeupdate', alAvanzar)
      audio.removeEventListener('play', alSonar)
      audio.removeEventListener('pause', alParar)
      audio.removeEventListener('ended', alTerminar)
      audio.removeEventListener('error', alFallar)
    }
  }, [])

  function alternar() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) void audio.play()
    else audio.pause()
  }

  function saltar(segundos: number) {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(audio.duration)) return
    audio.currentTime = Math.min(Math.max(0, audio.currentTime + segundos), audio.duration)
  }

  function cambiarVelocidad() {
    const audio = audioRef.current
    if (!audio) return
    const siguiente = VELOCIDADES[(VELOCIDADES.indexOf(velocidad) + 1) % VELOCIDADES.length]
    audio.playbackRate = siguiente
    setVelocidad(siguiente)
  }

  const avance = total > 0 ? (actual / total) * 100 : 0

  const botonSecundario =
    'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-borde text-apagado transition-colors hover:border-trazo hover:text-texto'

  return (
    <div className="mt-8 rounded-lg border border-borde bg-fondo p-5 sm:p-6">
      <audio ref={audioRef} src={archivo} preload="metadata" className="hidden">
        <track kind="captions" />
      </audio>

      {fallo ? (
        <p role="alert" className="text-[0.9375rem] text-apagado">
          No se pudo cargar el audio.{' '}
          <a
            href={archivo}
            className="text-acento underline decoration-borde underline-offset-4 hover:decoration-acento"
          >
            Descargar el archivo
          </a>
          .
        </p>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => saltar(-15)}
              aria-label="Retroceder quince segundos"
              className={botonSecundario}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="currentColor">
                <path d="M12 5V2L7 6l5 4V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8Z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={alternar}
              aria-label={sonando ? `Pausar ${titulo}` : `Reproducir ${titulo}`}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-acento text-fondo transition-transform hover:scale-105"
            >
              {sonando ? (
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor">
                  <path d="M8 4.5v15a1 1 0 0 0 1.54.84l11-7.5a1 1 0 0 0 0-1.68l-11-7.5A1 1 0 0 0 8 4.5Z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => saltar(30)}
              aria-label="Avanzar treinta segundos"
              className={botonSecundario}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="currentColor">
                <path d="M12 5V2l5 4-5 4V7a6 6 0 1 0 6 6h2a8 8 0 1 1-8-8Z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={cambiarVelocidad}
              aria-label={`${velocidad}× velocidad de reproducción. Pulsa para cambiarla.`}
              className="ml-auto shrink-0 rounded-md border border-borde px-3 py-2 font-mono text-meta text-apagado transition-colors hover:border-trazo hover:text-texto"
            >
              {velocidad}×
            </button>
          </div>

          <div className="mt-5">
            <label htmlFor={`${idBase}-avance`} className="sr-only">
              Posición dentro del episodio
            </label>
            <input
              id={`${idBase}-avance`}
              type="range"
              min={0}
              max={Number.isFinite(total) && total > 0 ? total : 100}
              step={1}
              value={actual}
              disabled={!(total > 0)}
              onChange={(evento) => {
                const audio = audioRef.current
                if (!audio) return
                const destino = Number(evento.target.value)
                audio.currentTime = destino
                setActual(destino)
              }}
              aria-valuetext={`${dicho(actual)} de ${dicho(total)}`}
              className="barra-audio w-full"
              style={{ ['--avance' as string]: `${avance}%` }}
            />

            <div className="mt-2 flex items-baseline justify-between font-mono text-meta text-apagado">
              <span>{reloj(actual)}</span>
              <span>{total > 0 ? reloj(total) : duracion}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
