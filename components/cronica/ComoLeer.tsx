import { sitio } from '@/content/sitio'

/** La línea que explica cómo funcionan las palabras marcadas. */
export function ComoLeer() {
  return (
    <aside
      aria-label="Cómo leer esta crónica"
      className="flex max-w-lectura gap-3 rounded-lg border border-borde bg-superficie px-5 py-4"
    >
      <span aria-hidden="true" className="font-mono text-acento">
        —
      </span>
      <p className="text-[0.9375rem] leading-[1.7] text-apagado">{sitio.comoLeer}</p>
    </aside>
  )
}
