import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google'

/**
 * next/font descarga las fuentes en tiempo de build y las sirve desde el propio
 * origen. No hay ninguna petición a un CDN en tiempo de ejecución.
 *
 * Se piden solo los pesos que el sitio usa de verdad: cada peso extra son bytes
 * que retrasan el primer texto legible en una conexión lenta.
 */

export const titular = Inter_Tight({
  subsets: ['latin'],
  variable: '--fuente-titular',
  weight: ['500', '600'],
  display: 'swap',
})

export const cuerpo = Inter({
  subsets: ['latin'],
  variable: '--fuente-cuerpo',
  weight: ['400', '500'],
  display: 'swap',
})

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--fuente-mono',
  weight: ['400'],
  display: 'swap',
})
