/**
 * Contenido del documento del ACA, separado del maquetado.
 *
 * Lo que lleva la marca PENDIENTE debe completarlo la autora: son datos de
 * clase o decisiones suyas que no puedo inventar sin falsearlos.
 */
import { presupuesto, kpis, pesosIEC, proyecto } from '../excel/datos.mjs'

export { presupuesto, kpis, pesosIEC, proyecto }

export const URL_SITIO = 'https://turno-de-madrugada.vercel.app'
export const URL_REPO = 'https://github.com/jcastr0polo/turno-de-madrugada'

export const justificacion = {
  tematica: [
    'La pieza parte de una observación sencilla y verificable: para una estudiante virtual que además trabaja y sostiene el cuidado de una casa, el estudio no ocupa un horario propio. Ocupa lo que sobra. Esa franja —la madrugada— no aparece en el sistema de cuentas nacionales, no aparece en el Código Sustantivo del Trabajo y no aparece en el reglamento estudiantil.',
    'El proyecto sostiene que trasnochar para estudiar no es un rasgo de indisciplina sino el resultado de una aritmética: cuando el trabajo remunerado, el trabajo de cuidado y las clases ya ocuparon el día, la única hora disponible es la que nadie reclama. Y demuestra esa tesis con documentos del propio Estado, no con opiniones.',
    'El tema se cruza con la salud mental, y por eso la cobertura se trató con reglas estrictas: ninguna descripción de métodos de autolesión, ningún testimonio inventado presentado como real, ninguna cifra sin fuente, y rutas de ayuda al cierre de cada pieza.',
  ],
  formatos: [
    'La crónica hipertextual se eligió porque el argumento depende de documentos que el lector debe poder comprobar sin abandonar el texto. Una capa que se abre desde una palabra permite enseñar el dato, su lectura correcta y su fuente en el mismo gesto de lectura. En papel esa comprobación obligaría a notas al pie; en video, a una sobreimpresión que nadie puede verificar.',
    'El episodio de audio se eligió porque hay una parte del asunto que ningún documento registra: el cansancio se oye. La voz en primera persona transmite el desgaste, la culpa y el silencio de la casa a esa hora sin necesidad de describirlos. El audio no repite la crónica: aporta la jornada completa, hora por hora, y la textura emocional que el texto documental no puede sostener sin volverse sentimental.',
  ],
  target: {
    principal: 'Estudiantes de educación superior en modalidad virtual en Colombia, entre 25 y 45 años, que compaginan el estudio con trabajo remunerado y con trabajo de cuidado no remunerado. Mayoritariamente mujeres, en ciudades intermedias.',
    secundario: 'Personal de bienestar universitario, coordinaciones académicas de programas virtuales y responsables de políticas institucionales de salud mental.',
    terciario: 'Periodistas y comunicadores interesados en economía del cuidado y en educación virtual.',
  },
  empatia: [
    ['¿Qué piensa y siente?', 'Que el cansancio es culpa suya. Que si se organizara mejor le alcanzaría el día. Culpa por el tiempo que no le da a su familia, aunque haya estado presente todo el día.'],
    ['¿Qué ve?', 'Compañeros que parecen ir al mismo ritmo. Plataformas que cierran a las 11:59. Publicidad institucional que promete flexibilidad. Ningún edificio al que acudir.'],
    ['¿Qué oye?', 'Que la modalidad virtual es más cómoda. Que estudiar a su ritmo es una ventaja. Chistes del grupo sobre trasnochar, que normalizan el desgaste.'],
    ['¿Qué dice y hace?', 'Responde "bien, con mucho trabajo". Llama disciplina a lo que es aritmética. Estudia entre la una y las tres de la mañana. No pide ayuda.'],
    ['Dolores', 'No tener una hora propia. No saber a quién acudir de madrugada. No distinguir cuándo el cansancio deja de ser cansancio. Sentir que llega tarde a su propia familia.'],
    ['Ganancias esperadas', 'Nombrar lo que le pasa y descubrir que está medido. Saber que existe la Línea 106. Comprobar que no es la única. Tener argumentos documentados para pedirle algo concreto a su institución.'],
  ],
}

export const teoria = {
  jenkins: 'Jenkins describe la convergencia no como un fenómeno tecnológico sino cultural: el contenido fluye entre plataformas y el público participa activamente en su circulación. En este proyecto esa lógica se aplica en dos direcciones. Hacia afuera, la historia existe en dos soportes que no se sustituyen. Hacia adentro, el público no es receptor: el muro de aportes y la encuesta convierten la lectura en una contribución que se incorpora a la pieza y queda visible para quien llegue después.',
  scolari: 'Scolari define las narrativas transmedia por dos rasgos: la expansión del relato a través de varios medios y la participación del usuario. El proyecto aplica dos de sus estrategias. La expansión, porque el episodio de audio añade la jornada completa y su textura emocional, que el texto documental no contiene. Y la que Scolari llama el prosumidor, porque el lector puede escribir su propio turno y ese aporte pasa a formar parte del relato colectivo tras una revisión editorial.',
  sierra: '[PENDIENTE: completar con el concepto de Sierra estudiado en clase y su cita exacta. No se incluye una referencia inventada.]',
  nodos: [
    {
      nodo: 'Nodo 1 — El átomo',
      pieza: 'Crónica hipertextual "El turno de la madrugada"',
      plataforma: 'Web propia',
      aporta: 'El argumento documentado. Cinco capas complementarias que abren desde una palabra del texto y muestran el dato, su lectura correcta y su fuente. La cuenta del DANE, las tres leyes y la casilla vacía del Magdalena.',
    },
    {
      nodo: 'Nodo 2 — La expansión',
      pieza: 'Episodio de audio "Lo que queda del día"',
      plataforma: 'Spotify',
      aporta: 'La jornada completa hora por hora, desde las cinco de la mañana. El hijo, la culpa, el fin de semana, el grupo de WhatsApp a las dos de la mañana. Información nueva que no cabe en el nodo principal y que en voz pesa distinto.',
    },
  ],
  hipertexto: [
    'La navegación no es lineal. La crónica se lee completa sin abrir ninguna capa: son complemento, no requisito. Desde el texto, cinco palabras marcadas abren su capa correspondiente; desde la barra lateral, cualquiera de las cinco es alcanzable sin recorrer el texto. El lector decide la profundidad.',
    'El panel cumple los requisitos de accesibilidad de un diálogo modal: rol declarado, atrapado de foco, cierre con Escape, con clic fuera y con botón visible, y devolución del foco a la palabra de origen al cerrar.',
  ],
}

export const metodo = {
  reglas: [
    ['Trazabilidad', 'Ningún dato entra por la vía del medio que lo publicó primero: todo se rastrea hasta el documento que lo produjo. Las cifras del cuidado se tomaron del boletín del DANE, no de la nota de prensa que lo replicó. La ausencia de línea territorial en el Magdalena se comprobó en el directorio del Ministerio de Salud, no en una reseña.'],
    ['Separación entre testimonio y afirmación', 'Lo que le ocurre a la autora se narra en primera persona sin pretender representar a nadie. Todo lo que excede su experiencia solo se afirma con un documento detrás. Por eso la pieza no dice que las estudiantes virtuales trasnochan: dice que el trabajo de cuidado está medido y que esas horas existen.'],
    ['Lectura del dato', 'Cada cifra publicada va acompañada de una advertencia sobre cómo no debe leerse. La valoración del trabajo de cuidado es una estimación del costo de mercado de unas horas, no un ingreso que alguien reciba. Publicar la cifra sin esa aclaración induciría al error.'],
    ['Declaración de lo pendiente', 'Lo que no se pudo confirmar se marca como tal en la propia publicación. La vigencia de los Centros de Escucha del Distrito procede de un boletín de 2024 y se advierte que conviene comprobarla antes de acudir.'],
  ],
  peticion: 'El 7 de septiembre de 2026 se radicó un derecho de petición ante Bienestar Universitario de la CUN solicitando tres datos: el tiempo promedio de espera para una cita, la existencia de un protocolo para crisis fuera del horario de atención, y el lugar donde está publicado el número que atiende de madrugada. El término legal de respuesta es de quince días hábiles, que vencen después de la publicación de esta pieza. La respuesta se incorporará a la crónica cuando llegue.',
}

export const fuentes = [
  ['DANE, Cuenta Satélite de Economía del Cuidado (resultados 2024)', 'Documental', 'Valoración del trabajo doméstico y de cuidado no remunerado: 340,5 billones de pesos, 19,9 % del PIB, 44.326 millones de horas, 75,9 % aportado por mujeres', 'Boletín oficial de la entidad, descargado del sitio del DANE', 'Fuente pública', 'Verificado'],
  ['Ministerio de Salud, directorio nacional de líneas de atención en salud mental (agosto de 2025)', 'Documental', 'La casilla del Magdalena no registra línea territorial activa; Atlántico y La Guajira sí', 'Documento oficial descargado del sitio institucional', 'Fuente pública', 'Verificado'],
  ['Congreso de la República, Ley 1413 de 2010', 'Normativa', 'Obligación del Estado de incluir la economía del cuidado en el sistema de cuentas nacionales', 'Texto oficial', 'Fuente pública', 'Verificado'],
  ['Congreso de la República, Ley 1616 de 2013', 'Normativa', 'Salud mental como derecho y deberes de promoción y prevención del entorno educativo', 'Texto oficial', 'Fuente pública', 'Verificado'],
  ['Congreso de la República, Ley 2466 de 2025', 'Normativa', 'Inicio de la jornada nocturna a las 7:00 p. m. y recargo hasta las 6:00 a. m.', 'Texto oficial', 'Fuente pública', 'Verificado'],
  ['Alcaldía Distrital de Santa Marta, boletín institucional (2024)', 'Institucional', 'Centros de Escucha del Distrito, uno de ellos itinerante por barrios', 'Boletín institucional; vigencia no confirmada', 'Fuente pública', 'Por confirmar'],
  ['Relato propio de la autora', 'Testimonial', 'Experiencia de la jornada, del cansancio y del acceso a la ayuda', 'No contrastable por definición: se declara como testimonio, no como afirmación general', 'Autoconsentimiento', 'Verificado'],
  ['Bienestar Universitario CUN', 'Institucional', 'Tiempos de espera, protocolo de crisis y publicación del número de atención', 'Derecho de petición radicado el 7 de septiembre de 2026; respuesta pendiente', 'Constancia de radicado', 'Pendiente'],
]

export const bibliografia = [
  'Congreso de la República de Colombia. (2010). Ley 1413 de 2010, por medio de la cual se regula la inclusión de la economía del cuidado en el sistema de cuentas nacionales. Diario Oficial.',
  'Congreso de la República de Colombia. (2013). Ley 1616 de 2013, por medio de la cual se expide la ley de salud mental. Diario Oficial.',
  'Congreso de la República de Colombia. (2025). Ley 2466 de 2025, por medio de la cual se modifica la jornada laboral. Diario Oficial.',
  'Departamento Administrativo Nacional de Estadística. (2026). Cuenta Satélite de Economía del Cuidado: resultados provisionales 2024. DANE. https://www.dane.gov.co/index.php/estadisticas-por-tema/cuentas-nacionales/cuentas-satelite/cuenta-satelite-economia-del-cuidado',
  'Jenkins, H. (2008). Convergence culture: la cultura de la convergencia de los medios de comunicación. Paidós.',
  'Ministerio de Salud y Protección Social. (2025). Directorio nacional de líneas de atención en salud mental y prevención del suicidio. MinSalud. https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/VS/PP/ET/directorio-salud-mental-prevencion-suicidio-minsalud.pdf',
  'Ministerio de Salud y Protección Social. (s. f.). Línea 106. MinSalud. https://www.minsalud.gov.co/salud/publica/salud-mental/Paginas/linea-106.aspx',
  'Scolari, C. A. (2013). Narrativas transmedia: cuando todos los medios cuentan. Deusto.',
  '[PENDIENTE: añadir la referencia de Sierra estudiada en clase, con su año y editorial exactos.]',
]
