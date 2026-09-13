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
  aporta: [
    'La jornada completa contada hora por hora, que en el texto solo se menciona.',
    'La voz en primera persona: el cansancio se oye, no se describe.',
    'El ruido de la casa a esa hora, que ninguna cifra registra.',
  ],
  url: URL_EPISODIO,
  avisoSinPublicar: 'Se publica el 13 de septiembre',
  estado: 'pendiente',
}
