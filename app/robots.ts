import type { MetadataRoute } from 'next'

/**
 * Los anexos son material del entregable académico, no de la pieza publicada.
 * Quedan fuera de los buscadores igual que la página de moderación: no tienen
 * lector, solo evaluador.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/anexos', '/anexos/', '/moderacion'],
    },
  }
}
