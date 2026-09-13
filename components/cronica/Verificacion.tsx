import { sitio } from '@/content/sitio'

/**
 * Apunte que abre la lectura. Enuncia el pacto de verificación de la pieza;
 * que además deje ver dónde se puede entrar es consecuencia, no propósito.
 */
export function Verificacion() {
  return (
    <aside
      aria-label={sitio.rotuloVerificacion}
      className="flex max-w-lectura gap-3 rounded-lg border border-borde bg-superficie px-5 py-4"
    >
      <span aria-hidden="true" className="font-mono text-acento">
        —
      </span>
      <p className="text-[0.9375rem] leading-[1.7] text-apagado">{sitio.verificacion}</p>
    </aside>
  )
}
