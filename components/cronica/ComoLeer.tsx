import { sitio } from '@/content/sitio'

/** La línea que explica cómo funcionan las palabras marcadas. */
export function ComoLeer() {
  return (
    <aside
      aria-label="Cómo leer esta crónica"
      className="border-y border-borde bg-superficie px-5 py-5 sm:px-8"
    >
      <p className="mx-auto flex max-w-medida gap-3 text-[0.9375rem] leading-[1.7] text-apagado">
        <span aria-hidden="true" className="font-mono text-acento">
          —
        </span>
        <span>{sitio.comoLeer}</span>
      </p>
    </aside>
  )
}
