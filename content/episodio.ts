import type { Episodio } from './types'

/**
 * URL del episodio en un solo lugar. Mientras sea `null`, la tarjeta se
 * renderiza con el botón deshabilitado y el aviso de fecha de publicación.
 * Para publicarlo basta reemplazar `null` por la URL de Spotify.
 */
export const URL_EPISODIO: string | null = null

export const episodio: Episodio = {
  titulo: 'Lo que queda del día',
  serie: 'Turno de madrugada',
  plataforma: 'Spotify',
  duracion: '9 minutos (estimados)',
  // Qué se oye, no en qué se diferencia del texto: comparar formatos es hablar
  // de la publicación en vez de hablar de la madrugada.
  aporta: [
    'La jornada entera, hora por hora.',
    'El cansancio se oye. No hace falta describirlo.',
    'El ruido de la casa a esa hora, que ninguna cifra registra.',
  ],
  url: URL_EPISODIO,
  avisoSinPublicar: 'Se publica el 13 de septiembre',
  estado: 'pendiente',
}
