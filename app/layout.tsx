import type { Metadata, Viewport } from 'next'
import { cuerpo, mono, titular } from '@/lib/tipografias'
import { sitio } from '@/content/sitio'
import './globals.css'

/**
 * En Vercel, VERCEL_PROJECT_PRODUCTION_URL se inyecta sola. En local cae a
 * localhost. Solo hace falta definir NEXT_PUBLIC_SITE_URL si se usa un dominio
 * propio distinto del de Vercel.
 */
const urlBase =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(urlBase),
  title: {
    default: `${sitio.titulo} · ${sitio.serie}`,
    template: `%s · ${sitio.serie}`,
  },
  description: sitio.descripcion,
  authors: [{ name: sitio.autora }],
  keywords: [
    'crónica hipertextual',
    'economía del cuidado',
    'salud mental',
    'educación virtual',
    'Santa Marta',
    'Magdalena',
  ],
  openGraph: {
    type: 'article',
    locale: 'es_CO',
    siteName: sitio.serie,
    title: sitio.titulo,
    description: sitio.descripcion,
    authors: [sitio.autora],
  },
  twitter: {
    card: 'summary_large_image',
    title: sitio.titulo,
    description: sitio.descripcion,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0f1a',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${titular.variable} ${cuerpo.variable} ${mono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
