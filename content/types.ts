/**
 * Contrato del contenido de "El turno de la madrugada".
 *
 * Regla que atraviesa todo el archivo: el contenido es JSON puro. Sin funciones,
 * sin JSX, sin referencias a componentes. Eso permite editar la crónica sin tocar
 * el maquetado y cruzar la frontera servidor/cliente sin coste de serialización.
 */

export type CapaId = 'glosario' | 'datos' | 'contexto' | 'metodo' | 'ayuda'

/** Estado de verificación de un dato o de una pieza. */
export type Estado = 'verificado' | 'por-confirmar' | 'pendiente'

/** Estado del consentimiento de una fuente. Obligatorio en citas y en la tabla. */
export type Consentimiento =
  | 'fuente-publica'
  | 'autoconsentimiento'
  | 'constancia-de-radicado'
  | 'otorgado'
  | 'otorgado-con-reserva'
  | 'pendiente'

export type FuenteId = string

/* ------------------------------------------------------------------ */
/* Texto en línea: la unidad del hipertexto                            */
/* ------------------------------------------------------------------ */

export type Inline =
  | string
  | { t: 'enfasis'; texto: string }
  /** Palabra marcada que abre una capa. `ancla` permite abrirla en una entrada concreta. */
  | { t: 'capa'; texto: string; capa: CapaId; ancla?: string }
  | { t: 'enlace'; texto: string; href: string }
  /** Marcador visible de reportería faltante. Nunca se rellena con texto inventado. */
  | { t: 'pendiente'; nota: string }

export type Parrafo =
  | { t: 'p'; contenido: Inline[] }
  /** Toda cita exige consentimiento declarado: el tipo lo hace imposible de omitir. */
  | { t: 'cita'; contenido: Inline[]; atribucion: string; consentimiento: Consentimiento }
  /** Apunte editorial en voz baja (el paréntesis que remite al audio). */
  | { t: 'apunte'; contenido: Inline[] }

/**
 * Antetítulo documental de dos partes: marca y nota.
 * No lleva numeración de escena ni marca horaria; las horas son la columna
 * vertebral del episodio de audio y repetirlas volvería redundantes las piezas.
 */
export interface Antetitulo {
  marca: string
  nota: string
}

export interface BloqueCronica {
  id: string
  antetitulo: Antetitulo
  parrafos: Parrafo[]
}

export interface Cronica {
  bloques: BloqueCronica[]
  /** Reportería en curso, anunciada en el propio texto y declarada aquí como pendiente. */
  actualizacionPendiente: { titulo: string; texto: string }
}

/* ------------------------------------------------------------------ */
/* Capas                                                               */
/* ------------------------------------------------------------------ */

interface CapaBase {
  /** Rótulo corto para el mapa y el panel: "Glosario". */
  etiqueta: string
  /** Título editorial de la capa: "Tercera jornada". */
  titulo: string
  /** Una línea que resume qué aporta la capa. */
  sumario: string
}

export interface EntradaGlosario {
  id: string
  termino: string
  definicion: string
  fuente?: FuenteId
}

export interface Dato {
  id: string
  /** La cifra tal como se lee: "340,5 billones de pesos". */
  cifra: string
  enunciado: string
  /** Cómo debe leerse el dato, para cerrar la puerta a la sobreinterpretación. */
  lectura: string
  detalle: { etiqueta: string; valor: string }[]
  /** Obligatoria: en este proyecto no existe cifra sin fuente. */
  fuente: FuenteId
  estado: Estado
}

export interface Norma {
  id: string
  nombre: string
  anio: number
  que: string
}

export interface Regla {
  id: string
  rotulo: string
  texto: string
}

export interface LineaAyuda {
  numero: string
  nombre: string
  detalle: string
  disponibilidad: string
}

export type Capa =
  | (CapaBase & { id: 'glosario'; entradas: EntradaGlosario[] })
  | (CapaBase & { id: 'datos'; datos: Dato[] })
  | (CapaBase & { id: 'contexto'; normas: Norma[]; preguntas: string[] })
  | (CapaBase & { id: 'metodo'; intro: string; reglas: Regla[]; nota: string })
  | (CapaBase & {
      id: 'ayuda'
      lineas: LineaAyuda[]
      notas: { id: string; texto: string; estado: Estado }[]
    })

/* ------------------------------------------------------------------ */
/* Fuentes y transparencia                                             */
/* ------------------------------------------------------------------ */

export interface Fuente {
  id: FuenteId
  entidad: string
  documento: string
  detalle?: string
  /** Sin URL cuando no hay enlace estable: se cita por entidad, número y año. */
  url?: string
  tipo: 'documental' | 'normativa' | 'institucional' | 'testimonial'
}

export interface FilaTransparencia {
  id: string
  fuente: string
  aporte: string
  contraste: string
  consentimiento: Consentimiento
  estado: Estado
}

/* ------------------------------------------------------------------ */
/* Piezas satélite                                                     */
/* ------------------------------------------------------------------ */

export interface Episodio {
  titulo: string
  serie: string
  plataforma: string
  duracion: string
  /** Qué aporta el audio que no está en el texto. Nunca lo que ya está escrito. */
  aporta: string[]
  /** `null` mientras no esté publicado: un solo lugar que cambiar. */
  url: string | null
  avisoSinPublicar: string
  estado: Estado
}

export interface Encuesta {
  id: string
  pregunta: string
  opciones: { id: string; etiqueta: string }[]
  aviso: string
}

export interface Muro {
  invitacion: string
  aviso: string
  marcadorAlias: string
  marcadorTexto: string
  maxCaracteres: number
  maxAlias: number
}

/**
 * Copia de una sección. `entrada` es la línea que sigue al título.
 *
 * Regla editorial de este archivo: la página no se explica a sí misma. Ninguna
 * de estas líneas describe la arquitectura, el soporte ni el funcionamiento de
 * la interfaz. Cada una avanza el argumento, nombra algo o declara lo que el
 * lector necesita saber. El manual de uso no es contenido.
 */
export interface CopiaSeccion {
  rotulo: string
  titulo: string
  entrada?: string
}

export interface Secciones {
  participacion: CopiaSeccion
  episodio: CopiaSeccion
  mapa: CopiaSeccion
  fuentes: CopiaSeccion
  ayuda: CopiaSeccion
}

export interface CopiaBarra {
  capas: { titulo: string; entrada: string }
  episodio: { titulo: string; linea: string; enlace: string }
  ayuda: { titulo: string }
}

export interface Sitio {
  serie: string
  titulo: string
  /** Fragmento del titular que lleva la marca de resaltador. Debe existir en `titulo`. */
  tituloMarcado: string
  bajada: string
  hora: string
  metadatos: string[]
  autora: string
  asignatura: string
  institucion: string
  ciudad: string
  descripcion: string
  /** Nombre accesible del apunte de verificación que abre la lectura. */
  rotuloVerificacion: string
  /** La línea que abre la lectura. Enuncia el pacto de verificación. */
  verificacion: string
  navegacion: { id: string; etiqueta: string }[]
  secciones: Secciones
  barra: CopiaBarra
  /** Leyenda del mapa. Un pie de figura es legítimo; un manual, no. */
  leyendaMapa: string
}
