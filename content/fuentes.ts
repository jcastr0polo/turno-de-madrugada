import type { FilaTransparencia, Fuente } from './types'

/**
 * Registro único de fuentes. Todo dato del sitio apunta aquí por `id`.
 * Las tres leyes se citan por número, año y entidad, sin URL: se prefiere eso
 * a publicar un enlace que pueda romperse.
 */
export const fuentes: Record<string, Fuente> = {
  dane: {
    id: 'dane',
    aporte: 'Cuánto vale el trabajo doméstico y de cuidado no remunerado en Colombia.',
    entidad: 'DANE',
    documento: 'Cuenta Satélite de Economía del Cuidado',
    detalle: 'Resultados provisionales 2024, presentados en julio de 2026',
    url: 'https://www.dane.gov.co/index.php/estadisticas-por-tema/cuentas-nacionales/cuentas-satelite/cuenta-satelite-economia-del-cuidado',
    tipo: 'documental',
  },
  minsaludDirectorio: {
    id: 'minsaludDirectorio',
    aporte: 'Qué departamentos tienen línea territorial de salud mental y cuáles no.',
    entidad: 'Ministerio de Salud y Protección Social',
    documento: 'Directorio nacional de líneas de atención en salud mental',
    detalle: 'Versión de agosto de 2025',
    url: 'https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/directorio-salud-mental-prevencion-suicidio-minsalud.pdf',
    tipo: 'documental',
  },
  minsaludLinea106: {
    id: 'minsaludLinea106',
    aporte: 'Qué es la línea 106 y en qué horario atiende.',
    entidad: 'Ministerio de Salud y Protección Social',
    documento: 'Línea 106',
    url: 'https://www.minsalud.gov.co/salud/publica/salud-mental/Paginas/linea-106.aspx',
    tipo: 'institucional',
  },
  ley1413: {
    id: 'ley1413',
    aporte: 'La obligación del Estado de medir el trabajo de cuidado.',
    entidad: 'Congreso de la República de Colombia',
    documento: 'Ley 1413 de 2010',
    tipo: 'normativa',
  },
  ley1616: {
    id: 'ley1616',
    aporte: 'La salud mental como derecho y los deberes del entorno educativo.',
    entidad: 'Congreso de la República de Colombia',
    documento: 'Ley 1616 de 2013',
    tipo: 'normativa',
  },
  ley2466: {
    id: 'ley2466',
    aporte: 'A qué hora empieza la jornada nocturna y qué recargo genera.',
    entidad: 'Congreso de la República de Colombia',
    documento: 'Ley 2466 de 2025',
    tipo: 'normativa',
  },
  santaMarta: {
    id: 'santaMarta',
    aporte: 'La oferta local de escucha en Santa Marta.',
    entidad: 'Alcaldía Distrital de Santa Marta',
    documento: 'Boletín institucional sobre Centros de Escucha',
    detalle: 'Boletín de 2024',
    url: 'https://www.santamarta.gov.co/sala-prensa/noticias/alcaldia-distrital-de-santa-marta-inicia-la-semana-de-la-salud-mental',
    tipo: 'institucional',
  },
}

/** Tabla pública de "Cómo se hizo". No hay fila de entrevista: la pieza es un relato propio. */
export const transparencia: FilaTransparencia[] = [
  {
    id: 'dane',
    fuente: 'DANE, Cuenta Satélite de Economía del Cuidado (2026, datos 2024)',
    aporte: 'Valoración del trabajo doméstico y de cuidado no remunerado',
    contraste: 'Boletín oficial de la entidad',
    consentimiento: 'fuente-publica',
    estado: 'verificado',
  },
  {
    id: 'minsalud',
    fuente: 'Ministerio de Salud, directorio nacional (agosto de 2025)',
    aporte: 'Ausencia de línea territorial activa en el Magdalena',
    contraste: 'Documento oficial descargado del sitio',
    consentimiento: 'fuente-publica',
    estado: 'verificado',
  },
  {
    id: 'congreso',
    fuente: 'Congreso de la República (Leyes 1413, 1616 y 2466)',
    aporte: 'Marco normativo de cuidado, salud mental y jornada',
    contraste: 'Textos oficiales',
    consentimiento: 'fuente-publica',
    estado: 'verificado',
  },
  {
    id: 'santaMarta',
    fuente: 'Alcaldía Distrital de Santa Marta',
    aporte: 'Centros de Escucha y oferta local',
    contraste: 'Boletín institucional de 2024, pendiente confirmar vigencia',
    consentimiento: 'fuente-publica',
    estado: 'por-confirmar',
  },
  {
    id: 'autora',
    fuente: 'Relato propio de la autora',
    aporte: 'Experiencia de la jornada y del acceso a la ayuda',
    contraste:
      'No contrastable por definición: se declara como testimonio, no como afirmación general',
    consentimiento: 'autoconsentimiento',
    estado: 'verificado',
  },
]
