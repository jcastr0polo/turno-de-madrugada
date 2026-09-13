import type { Encuesta, Muro } from './types'

/**
 * La encuesta nunca se siembra con resultados previos: sería publicar cifras
 * sin fuente, justo lo que la crónica cuestiona. Empieza en cero y cuenta lo
 * que de verdad entra.
 */
export const encuesta: Encuesta = {
  id: 'hora-que-nadie-reclama',
  pregunta: '¿Cuál es la hora del día que nadie te reclama?',
  opciones: [
    { id: 'madrugada', etiqueta: 'La madrugada, después de medianoche' },
    { id: 'antes-de-amanecer', etiqueta: 'Antes de que amanezca la casa' },
    { id: 'ratos-sueltos', etiqueta: 'Ratos sueltos entre una cosa y otra' },
    { id: 'ninguna', etiqueta: 'Todavía no la encuentro' },
  ],
  aviso: 'Se guarda la opción elegida y nada más. Puedes cambiarla cuando quieras.',
  avisoSesion: 'Se cuenta aquí y ahora. Nada se guarda ni se envía.',
}

export const muro: Muro = {
  invitacion: 'Escribe en una o dos frases cuál es tu turno y qué haces en él.',
  aviso:
    'La autora lee cada aporte antes de publicarlo. No pongas datos que permitan identificarte. Si estás pasando por un momento difícil, las líneas de ayuda están al final.',
  avisoSesion:
    'Lo que escribas vive solo en esta sesión: no se guarda ni se publica. No pongas datos que permitan identificarte. Si estás pasando por un momento difícil, las líneas de ayuda están al final.',
  confirmacion: 'Gracias. Tu turno queda en revisión antes de aparecer en el muro.',
  confirmacionDirecta: 'Gracias. Tu turno ya está en el muro.',
  error: 'No se pudo guardar. Inténtalo de nuevo en un momento.',
  exceso: 'Has enviado varios aportes seguidos. Espera unos minutos.',
  vacio: 'Todavía no hay turnos publicados.',
  marcadorAlias: 'Cómo quieres firmar',
  marcadorTexto: 'A qué hora estudias o trabajas, y qué haces en esa hora',
  maxCaracteres: 180,
  maxAlias: 24,
}
