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
  weight: ['600'],
  display: 'swap',
})

export const cuerpo = Inter({
  subsets: ['latin'],
  variable: '--fuente-cuerpo',
  weight: ['400'],
  display: 'swap',
})

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--fuente-mono',
  weight: ['400'],
  display: 'swap',
  // Sin precarga: la monoespaciada solo viste rótulos y metadatos, nunca el
  // primer bloque de texto grande. Precargarla le robaba ancho de banda a la
  // fuente del cuerpo y retrasaba el mayor elemento visible.
  preload: false,
})
