import type { Sitio } from './types'

/**
 * Voz del sitio: todo lo que no escribió la autora en la crónica pero se lee
 * en la página. Vive aquí y no en los componentes porque es contenido, no
 * andamiaje.
 *
 * Regla editorial: la página no se explica a sí misma. Ninguna de estas líneas
 * describe el soporte, la arquitectura ni el funcionamiento de la interfaz.
 */
export const sitio: Sitio = {
  serie: 'Turno de madrugada',
  titulo: 'El turno de la madrugada',
  tituloMarcado: 'la madrugada',
  bajada:
    'Estudio a la una de la mañana. No porque rinda: porque es la única hora del día que nadie reclama. Esta es la cuenta de por qué, hecha con los papeles del propio Estado.',
  hora: '3:47 a. m.',
  metadatos: ['Santa Marta', 'Septiembre de 2026', 'Lectura de 7 minutos'],
  autora: 'Leidy Carolina Granados Celis',
  asignatura: 'Taller de Creación de Contenidos',
  institucion: 'CUN',
  ciudad: 'Santa Marta, Magdalena',
  descripcion:
    'Crónica hipertextual sobre la madrugada como tercera jornada de una estudiante virtual que además es madre y trabaja por su cuenta. Estudiar de madrugada no es indisciplina: es aritmética.',

  // Enuncia el pacto de verificación de la pieza. Que además enseñe dónde se
  // puede entrar es consecuencia, no propósito.
  rotuloVerificacion: 'Verificación',
  verificacion: 'Lo que no es mío está marcado. Detrás de cada marca está el documento que lo sostiene.',

  navegacion: [
    { id: 'cronica', etiqueta: 'Crónica' },
    { id: 'participacion', etiqueta: 'Turnos' },
    { id: 'episodio', etiqueta: 'Episodio' },
    { id: 'mapa', etiqueta: 'Mapa' },
    { id: 'como-se-hizo', etiqueta: 'Fuentes' },
    { id: 'ayuda', etiqueta: 'Ayuda' },
  ],

  secciones: {
    participacion: {
      rotulo: 'Otros turnos',
      titulo: 'La hora que nadie reclama',
      entrada: 'Esta cuenta es de una sola persona. Faltan las demás.',
    },
    episodio: {
      rotulo: 'Segunda pieza',
      titulo: 'El mismo día, contado en voz',
      entrada: 'Hay cosas de esa hora que no caben en un documento público.',
    },
    mapa: {
      rotulo: 'Recorridos',
      titulo: 'Mapa de recorridos',
      entrada: 'Una crónica y siete desvíos. Ninguno es obligatorio.',
    },
    fuentes: {
      rotulo: 'Transparencia',
      titulo: 'Cómo se hizo',
      entrada: 'Quién aportó qué, cómo se contrastó y qué sigue pendiente.',
    },
    ayuda: {
      rotulo: 'Si lo necesitas',
      titulo: 'Líneas abiertas ahora',
    },
  },

  barra: {
    capas: {
      titulo: 'Las cinco capas',
      entrada: 'Lo que sostiene cada afirmación del texto.',
    },
    episodio: {
      titulo: 'Segunda pieza',
      linea: 'La misma jornada, hora por hora, en voz.',
      enlace: 'Sobre el episodio',
    },
    ayuda: {
      titulo: 'Si lo necesitas',
    },
  },

  leyendaMapa:
    'Línea continua, las capas que abren desde una palabra del texto. Línea punteada, las piezas que acompañan a la crónica.',
}
