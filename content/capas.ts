import type { Capa, CapaId } from './types'

/** Las cinco capas complementarias. El orden fija el del panel y el del mapa. */
export const capas: Record<CapaId, Capa> = {
  glosario: {
    id: 'glosario',
    etiqueta: 'Glosario',
    titulo: 'Tercera jornada',
    sumario: 'Qué nombre recibe aquí la franja en que se estudia cuando el día ya está ocupado.',
    entradas: [
      {
        id: 'tercera-jornada',
        termino: 'Tercera jornada',
        definicion:
          'Nombre operativo que usa este proyecto para la franja en que efectivamente se estudia cuando el día ya está ocupado por el trabajo de cuidado y por las clases. No es una categoría médica ni jurídica: es una descripción del uso del tiempo. Se distingue de las otras dos porque no está contabilizada en ninguna estadística oficial ni en ningún reglamento.',
      },
    ],
  },

  datos: {
    id: 'datos',
    etiqueta: 'La cifra',
    titulo: '340,5 billones de pesos',
    sumario: 'Cuánto vale el trabajo de cuidado no remunerado según la cuenta oficial.',
    datos: [
      {
        id: 'valor-cuidado',
        cifra: '340,5 billones de pesos',
        enunciado:
          'Según la Cuenta Satélite de Economía del Cuidado del DANE, con datos de 2024, el trabajo doméstico y de cuidado no remunerado alcanzó un valor de 340,5 billones de pesos, equivalente al 19,9 % del PIB. Supera al comercio y a la industria manufacturera.',
        lectura:
          'La cifra es una valoración económica de horas, no un ingreso que alguien reciba. Mide cuánto costaría pagar ese trabajo en el mercado, no cuánto gana quien lo hace, que es cero.',
        detalle: [
          { etiqueta: 'Participación en el PIB', valor: '19,9 %' },
          { etiqueta: 'Comercio', valor: '318 billones' },
          { etiqueta: 'Industria manufacturera', valor: '175 billones' },
          { etiqueta: 'Horas anuales', valor: '44.326 millones' },
          { etiqueta: 'Aporte de las mujeres', valor: '75,9 %' },
          { etiqueta: 'Aporte de los hombres', valor: '24,1 %' },
          { etiqueta: 'Trabajo de mujeres sobre el PIB', valor: '14,8 %' },
        ],
        fuentes: ['dane', 'ley1413'],
        estado: 'verificado',
      },
    ],
  },

  contexto: {
    id: 'contexto',
    etiqueta: 'Las leyes',
    titulo: 'Tres leyes que no se hablan',
    sumario: 'La norma que manda medir, la que paga la noche y la que reconoce la salud mental.',
    normas: [
      {
        id: 'ley-1413',
        nombre: 'Ley 1413 de 2010',
        anio: 2010,
        que: 'Obligó a incluir la economía del cuidado en el sistema de cuentas nacionales, y de ahí salen las cifras del DANE.',
      },
      {
        id: 'ley-2466',
        nombre: 'Ley 2466 de 2025',
        anio: 2025,
        que: 'Fijó el inicio de la jornada nocturna a las 7:00 p. m.: toda hora trabajada entre esa hora y las 6:00 a. m. genera recargo.',
      },
      {
        id: 'ley-1616',
        nombre: 'Ley 1616 de 2013',
        anio: 2013,
        que: 'Reconoce la salud mental como derecho e impone deberes de promoción y prevención al entorno educativo.',
      },
    ],
    preguntas: [
      'Dónde aparece el número de atención en los canales que el estudiante usa de madrugada.',
      'Si existe un protocolo escrito de crisis fuera del horario y quién lo activa.',
      'Cuánto pasa en promedio entre la solicitud de una cita y la primera atención.',
    ],
  },

  metodo: {
    id: 'metodo',
    etiqueta: 'El método',
    titulo: 'Cómo se verificó esto',
    sumario: 'Las dos reglas que separan el testimonio de la afirmación general.',
    intro: 'Dos reglas gobiernan el texto.',
    reglas: [
      {
        id: 'trazabilidad',
        rotulo: 'La primera',
        texto:
          'Ningún dato entra por la vía del medio que lo publicó primero: todo se rastrea hasta el documento que lo produjo.',
      },
      {
        id: 'testimonio',
        rotulo: 'La segunda, que aquí importa más',
        texto:
          'Separa lo que me ocurre a mí de lo que puedo afirmar en general. Mi horario, mi cansancio y mi desconocimiento del número son testimonio y se narran en primera persona sin pretender representar a nadie. Todo lo que excede mi experiencia solo se afirma con un documento detrás, y por eso esta crónica no dice que las estudiantes virtuales trasnochan: dice que el trabajo de cuidado está medido y que esas horas existen.',
      },
    ],
    nota: 'El centro de asistencia de la CUN funciona con tickets y está abierto en línea, pero no publica un tiempo de respuesta comprometido: quien lo abre no sabe si le contestan en dos días o en tres semanas. Lo que esta crónica afirma sobre ese sistema se divide en dos: que el canal existe y es público, comprobable en el enlace; y que el tiempo depende del direccionamiento del caso, que es experiencia de la autora y se declara como tal, no como dato institucional.',
  },

  ayuda: {
    id: 'ayuda',
    etiqueta: 'Dónde llamar',
    titulo: 'Líneas abiertas ahora',
    sumario: 'Los números que atienden a esta hora, y la casilla que el Magdalena tiene vacía.',
    lineas: [
      {
        numero: '106',
        nombre: 'Línea nacional de teleorientación en salud mental',
        detalle: 'Gratuita y confidencial.',
        disponibilidad: '24 horas, todos los días',
      },
      {
        numero: '123',
        nombre: 'Emergencias',
        detalle: 'Cuando hay riesgo inmediato.',
        disponibilidad: '24 horas, todos los días',
      },
      {
        numero: '155',
        nombre: 'Orientación a mujeres víctimas de violencia',
        detalle: 'Cobertura nacional.',
        disponibilidad: '24 horas, todos los días',
      },
    ],
    notas: [
      {
        id: 'centros-de-escucha',
        texto:
          'Centros de Escucha del Distrito: la Secretaría de Salud de Santa Marta puso en marcha centros de escucha, uno de ellos itinerante por barrios. Dato tomado de un boletín institucional de 2024; conviene confirmar puntos y horarios vigentes antes de acudir.',
        estado: 'por-confirmar',
      },
      {
        id: 'magdalena',
        texto:
          'El directorio nacional del Ministerio de Salud, en su versión de agosto de 2025, no registra una línea territorial activa para el Magdalena.',
        estado: 'verificado',
      },
    ],
  },
}

/** Orden canónico: lo usan el panel, el mapa y la navegación por teclado. */
export const ordenCapas: CapaId[] = ['glosario', 'datos', 'contexto', 'metodo', 'ayuda']
