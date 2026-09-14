import type { Episodio } from './types'

/**
 * Dirección del episodio, servida desde el propio sitio.
 *
 * Es deliberadamente estable: para publicar la versión final basta con
 * sustituir el archivo en `public/audio/`. El enlace no cambia, así que se
 * puede citar en documentos antes de que el audio esté terminado.
 *
 * Next sirve `public/` con Cache-Control: max-age=0, de modo que el navegador
 * no se queda con una copia vieja cuando el archivo se reemplaza.
 */
export const RUTA_EPISODIO = '/audio/lo-que-queda-del-dia.mp3'

/**
 * Publicación externa. El sitio aloja el audio, pero el Nodo 2 gana si además
 * vive en una plataforma propia: son dos soportes distintos.
 */
export const EPISODIO_EXTERNO: { plataforma: string; url: string } | null = null

/**
 * Huella del archivo provisional.
 *
 * El aviso de "en edición" no depende de que alguien se acuerde de apagarlo:
 * el servidor compara el archivo que hay en `public/audio/` con esta huella.
 * Si coincide, suena el marcador y lo dice. En cuanto se reemplaza por el
 * episodio real, la huella deja de coincidir y el aviso desaparece solo.
 *
 * No hay nada que tocar en el código al publicar el audio definitivo.
 */
export const HUELLA_MARCADOR = '263563ba89f79f7da7958453ee0ac6c12f51a12fbc6a140553fd8458d8d31e2f'

export const episodio: Episodio = {
  titulo: 'Lo que queda del día',
  serie: 'Turno de madrugada',
  duracion: '13 min 45 s',
  // Qué se oye, no en qué se diferencia del texto: comparar formatos es hablar
  // de la publicación en vez de hablar de la madrugada.
  aporta: [
    'La jornada entera, desde las cinco de la mañana.',
    'El cansancio se oye. No hace falta describirlo.',
    'El ruido de la casa a esa hora, que ninguna cifra registra.',
  ],
  archivo: RUTA_EPISODIO,
  externo: EPISODIO_EXTERNO,
  avisoEdicion:
    'Lo que suena ahora es un marcador temporal. El episodio está en edición y quedará en esta misma dirección.',
  estado: 'pendiente',
}
