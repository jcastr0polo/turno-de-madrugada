/**
 * Cifras del libro de Excel, separadas del maquetado igual que el contenido
 * del sitio. Aquí se tocan los números; en generar.mjs, el formato.
 *
 * TODAS LAS CIFRAS DE PRESUPUESTO SON ESTIMACIONES A VALIDAR: son equipos y
 * costos reales de la autora, y nadie más puede confirmarlas.
 */

export const proyecto = {
  titulo: 'El turno de la madrugada',
  serie: 'Turno de madrugada',
  autora: 'Leidy Carolina Granados Celis',
  asignatura: 'Taller de Creación de Contenidos',
  codigo: 'CSP0344',
  institucion: 'Corporación Unificada Nacional de Educación Superior — CUN',
  ciudad: 'Santa Marta, Magdalena',
  periodo: 'Agosto – septiembre de 2026',
}

/** CAPEX: bienes duraderos. OPEX: gasto de operación del proyecto. */
export const presupuesto = [
  { tipo: 'CAPEX', categoria: 'Captura de audio', concepto: 'Micrófono de solapa con cable TRRS', cantidad: 1, unidad: 'unidad', valor: 180000, nota: 'Necesario para el estándar de -12 dB a -6 dB' },
  { tipo: 'CAPEX', categoria: 'Captura de audio', concepto: 'Auriculares cerrados de monitoreo', cantidad: 1, unidad: 'unidad', valor: 150000, nota: 'Control de saturación durante la grabación' },
  { tipo: 'CAPEX', categoria: 'Captura de video', concepto: 'Tripode con soporte para movil', cantidad: 1, unidad: 'unidad', valor: 90000, nota: 'Encuadre estable, regla de los tercios' },
  { tipo: 'CAPEX', categoria: 'Almacenamiento', concepto: 'Tarjeta microSD 128 GB clase 10', cantidad: 1, unidad: 'unidad', valor: 70000, nota: 'Brutos de audio y respaldo' },
  { tipo: 'CAPEX', categoria: 'Equipo base', concepto: 'Movil 1080p: depreciacion del periodo', cantidad: 2, unidad: 'mes', valor: 75000, nota: 'Equipo propio de 1.800.000 a 24 meses' },

  { tipo: 'OPEX', categoria: 'Conectividad', concepto: 'Plan de datos moviles', cantidad: 2, unidad: 'mes', valor: 60000, nota: 'Reporteria en terreno y publicacion' },
  { tipo: 'OPEX', categoria: 'Conectividad', concepto: 'Internet fijo del hogar', cantidad: 2, unidad: 'mes', valor: 85000, nota: 'Edicion y desarrollo en franja de madrugada' },
  { tipo: 'OPEX', categoria: 'Transporte de campo', concepto: 'Pasajes urbanos para reporteria', cantidad: 20, unidad: 'viaje', valor: 2900, nota: 'Centros de Escucha y recorridos por barrios' },
  { tipo: 'OPEX', categoria: 'Viaticos', concepto: 'Alimentacion en jornadas de terreno', cantidad: 6, unidad: 'jornada', valor: 15000, nota: 'Salidas de mas de cinco horas' },
  { tipo: 'OPEX', categoria: 'Publicacion', concepto: 'Dominio propio: prorrateo del periodo', cantidad: 2, unidad: 'mes', valor: 7500, nota: 'Anualidad de 90.000 repartida' },
  { tipo: 'OPEX', categoria: 'Publicacion', concepto: 'Alojamiento web y base de datos', cantidad: 2, unidad: 'mes', valor: 0, nota: 'Vercel y Supabase en plan gratuito' },
  { tipo: 'OPEX', categoria: 'Publicacion', concepto: 'Distribucion del podcast', cantidad: 2, unidad: 'mes', valor: 0, nota: 'Spotify for Creators, sin costo' },
  { tipo: 'OPEX', categoria: 'Postproduccion', concepto: 'Software de edicion de audio', cantidad: 1, unidad: 'global', valor: 0, nota: 'Audacity, software libre' },
]

/** Cronograma. El Gantt se dibuja solo a partir de estas fechas. */
export const cronograma = [
  { fase: 'Preproduccion intelectual', tarea: 'Definicion del angulo y de la tesis', nodo: 'Ambos', inicio: '2026-08-24', fin: '2026-08-26' },
  { fase: 'Preproduccion intelectual', tarea: 'Rastreo documental: DANE, Minsalud, leyes', nodo: 'Ambos', inicio: '2026-08-26', fin: '2026-09-01' },
  { fase: 'Preproduccion intelectual', tarea: 'Verificacion factica de cada cifra', nodo: 'Ambos', inicio: '2026-09-01', fin: '2026-09-04' },
  { fase: 'Produccion Nodo 1', tarea: 'Escritura de la cronica', nodo: 'Nodo 1', inicio: '2026-09-02', fin: '2026-09-08' },
  { fase: 'Produccion Nodo 1', tarea: 'Diseno de las cinco capas del hipertexto', nodo: 'Nodo 1', inicio: '2026-09-06', fin: '2026-09-09' },
  { fase: 'Produccion Nodo 2', tarea: 'Guion del episodio en primera persona', nodo: 'Nodo 2', inicio: '2026-09-08', fin: '2026-09-10' },
  { fase: 'Produccion Nodo 2', tarea: 'Grabacion en franja de madrugada', nodo: 'Nodo 2', inicio: '2026-09-11', fin: '2026-09-12' },
  { fase: 'Postproduccion', tarea: 'Desarrollo y accesibilidad del sitio', nodo: 'Nodo 1', inicio: '2026-09-09', fin: '2026-09-13' },
  { fase: 'Postproduccion', tarea: 'Edicion y control de niveles del audio', nodo: 'Nodo 2', inicio: '2026-09-12', fin: '2026-09-13' },
  { fase: 'Postproduccion', tarea: 'Publicacion de ambos nodos', nodo: 'Ambos', inicio: '2026-09-13', fin: '2026-09-13' },
  { fase: 'Distribucion y medicion', tarea: 'Difusion y recogida de aportes del publico', nodo: 'Ambos', inicio: '2026-09-13', fin: '2026-09-20' },
  { fase: 'Distribucion y medicion', tarea: 'Lectura de metricas y calculo del IEC', nodo: 'Ambos', inicio: '2026-09-18', fin: '2026-09-20' },
]

/** La rubrica pide los KPI simulados: `logrado` es proyeccion declarada. */
export const kpis = [
  { dimension: 'Alcance', indicador: 'Visitas unicas al Nodo 1', meta: 400, logrado: 312, fuente: 'Vercel Analytics' },
  { dimension: 'Alcance', indicador: 'Reproducciones iniciadas del Nodo 2', meta: 150, logrado: 118, fuente: 'Spotify for Creators' },
  { dimension: 'Alcance', indicador: 'Impresiones en difusion directa', meta: 600, logrado: 540, fuente: 'WhatsApp e Instagram' },
  { dimension: 'Engagement', indicador: 'Capas del hipertexto abiertas', meta: 300, logrado: 268, fuente: 'Evento en el sitio' },
  { dimension: 'Engagement', indicador: 'Votos en la encuesta', meta: 120, logrado: 94, fuente: 'Base de datos del sitio' },
  { dimension: 'Engagement', indicador: 'Escucha superior al 50 % del episodio', meta: 90, logrado: 71, fuente: 'Spotify for Creators' },
  { dimension: 'Conversion', indicador: 'Aportes escritos en el muro', meta: 40, logrado: 31, fuente: 'Base de datos del sitio' },
  { dimension: 'Conversion', indicador: 'Clics en las lineas de ayuda', meta: 25, logrado: 19, fuente: 'Evento en el sitio' },
  { dimension: 'Conversion', indicador: 'Episodio escuchado hasta el final', meta: 60, logrado: 47, fuente: 'Spotify for Creators' },
]

/**
 * Pesos del Indice de Eficiencia de Contenido. Una conversion vale mucho mas
 * que una impresion: quien escribe su turno hizo algo, no solo pasó delante.
 */
export const pesosIEC = { alcance: 1, engagement: 5, conversion: 20 }
