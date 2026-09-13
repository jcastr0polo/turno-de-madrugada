/**
 * Genera el documento del ACA en Word.
 *
 *   npm run word   ->  entregable/ACA-turno-de-madrugada.docx
 *
 * Estructura exacta de la guia: portada institucional, cinco secciones y
 * bibliografia. Formato APA: Times New Roman 12, interlineado doble, margenes
 * de una pulgada y paginacion.
 *
 * Lo marcado como PENDIENTE lo completa la autora: son datos de clase o
 * decisiones suyas. No se inventa ninguna referencia.
 */
import { mkdirSync, readFileSync, existsSync } from 'node:fs'
import {
  AlignmentType, BorderStyle, Document, Footer, HeadingLevel, ImageRun,
  PageBreak, PageNumber, Packer, Paragraph, ShadingType, Table, TableCell,
  TableRow, TextRun, WidthType,
} from 'docx'
import {
  URL_REPO, URL_SITIO, bibliografia, fuentes, justificacion, kpis,
  metodo, pesosIEC, presupuesto, proyecto, teoria,
} from './contenido.mjs'

const EVID = process.argv[2] ?? 'evidencias'
const TINTA = '0F172A'
const ACENTO = '0369A1'
const GRIS = '475569'

/** Lee ancho y alto de un PNG sin dependencias. */
function medirPng(ruta) {
  const b = readFileSync(ruta)
  return { ancho: b.readUInt32BE(16), alto: b.readUInt32BE(20) }
}

function imagen(nombre, pie, anchoPt = 560) {
  const ruta = `${EVID}/${nombre}`
  if (!existsSync(ruta)) {
    return [aviso(`[PENDIENTE: insertar captura ${nombre}]`)]
  }
  const { ancho, alto } = medirPng(ruta)
  const escala = anchoPt / ancho
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 80 },
      children: [
        new ImageRun({
          type: 'png',
          data: readFileSync(ruta),
          transformation: { width: anchoPt, height: Math.round(alto * escala) },
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240, line: 240 },
      children: [new TextRun({ text: pie, size: 18, italics: true, color: GRIS })],
    }),
  ]
}

const P = (texto, extra = {}) =>
  new Paragraph({
    spacing: { line: 480, after: 120 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text: texto, size: 24 })],
    ...extra,
  })

const H1 = (texto) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200, line: 360 },
    children: [new TextRun({ text: texto, size: 30, bold: true, color: TINTA })],
  })

const H2 = (texto) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140, line: 360 },
    children: [new TextRun({ text: texto, size: 26, bold: true, color: ACENTO })],
  })

const aviso = (texto) =>
  new Paragraph({
    spacing: { before: 120, after: 160, line: 300 },
    shading: { type: ShadingType.SOLID, color: 'FEF3C7' },
    children: [new TextRun({ text: texto, size: 22, bold: true, color: '92400E' })],
  })

const vineta = (texto) =>
  new Paragraph({
    bullet: { level: 0 },
    spacing: { line: 360, after: 100 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text: texto, size: 24 })],
  })

function celda(texto, { encabezado = false, ancho = 20 } = {}) {
  return new TableCell({
    width: { size: ancho, type: WidthType.PERCENTAGE },
    shading: encabezado ? { type: ShadingType.SOLID, color: TINTA } : undefined,
    margins: { top: 80, bottom: 80, left: 110, right: 110 },
    children: [
      new Paragraph({
        spacing: { line: 260 },
        children: [
          new TextRun({
            text: texto,
            size: encabezado ? 19 : 19,
            bold: encabezado,
            color: encabezado ? 'FFFFFF' : '000000',
          }),
        ],
      }),
    ],
  })
}

function tabla(encabezados, filas, anchos) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
      left: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
      right: { style: BorderStyle.SINGLE, size: 2, color: 'CBD5E1' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' },
    },
    rows: [
      new TableRow({
        tableHeader: true,
        children: encabezados.map((e, i) => celda(e, { encabezado: true, ancho: anchos[i] })),
      }),
      ...filas.map((f) => new TableRow({ children: f.map((c, i) => celda(String(c), { ancho: anchos[i] })) })),
    ],
  })
}

const cop = (n) => '$' + n.toLocaleString('es-CO')
const suma = (t) => presupuesto.filter((p) => p.tipo === t).reduce((a, p) => a + p.cantidad * p.valor, 0)
const capex = suma('CAPEX'), opex = suma('OPEX'), total = capex + opex
const dim = (d) => kpis.filter((k) => k.dimension === d).reduce((a, k) => a + k.logrado, 0)
const puntos = dim('Alcance') * pesosIEC.alcance + dim('Engagement') * pesosIEC.engagement + dim('Conversion') * pesosIEC.conversion
const iec = (puntos / total) * 1000

/* ========================= PORTADA ========================= */
const portada = [
  new Paragraph({ spacing: { before: 1800 } }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200, line: 300 },
    children: [new TextRun({ text: proyecto.institucion.toUpperCase(), size: 22, bold: true, color: TINTA })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 800, line: 300 },
    children: [new TextRun({ text: `${proyecto.asignatura}  ·  ${proyecto.codigo}`, size: 22, color: GRIS })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120, line: 400 },
    children: [new TextRun({ text: 'Actividad de Construcción Aplicada', size: 24, color: GRIS })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200, line: 480 },
    children: [new TextRun({ text: proyecto.titulo, size: 44, bold: true, color: TINTA })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 900, line: 320 },
    children: [new TextRun({ text: `Crónica hipertextual y episodio de audio  ·  Serie ${proyecto.serie}`, size: 22, italics: true, color: GRIS })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100, line: 320 },
    children: [new TextRun({ text: proyecto.autora, size: 26, bold: true })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 900, line: 320 },
    children: [new TextRun({ text: proyecto.ciudad, size: 22, color: GRIS })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { line: 320 },
    children: [new TextRun({ text: 'Septiembre de 2026', size: 22, color: GRIS })],
  }),
  aviso('PENDIENTE: insertar el logotipo institucional de la CUN en el encabezado de esta portada.'),
  new Paragraph({ children: [new PageBreak()] }),
]

/* ========================= SECCIONES ========================= */
const cuerpo = []

// --- Seccion 1 -------------------------------------------------------------
cuerpo.push(H1('Sección 1. Justificación estratégica: el mundo narrativo'))
cuerpo.push(H2('1.1 La temática y por qué se eligió'))
justificacion.tematica.forEach((t) => cuerpo.push(P(t)))
cuerpo.push(H2('1.2 Por qué estos dos formatos'))
justificacion.formatos.forEach((t) => cuerpo.push(P(t)))
cuerpo.push(H2('1.3 Público objetivo'))
cuerpo.push(P(`Público principal. ${justificacion.target.principal}`))
cuerpo.push(P(`Público secundario. ${justificacion.target.secundario}`))
cuerpo.push(P(`Público terciario. ${justificacion.target.terciario}`))
cuerpo.push(H2('1.4 Mapa de empatía del prosumidor'))
cuerpo.push(tabla(['Dimensión', 'Descripción'], justificacion.empatia, [24, 76]))
cuerpo.push(new Paragraph({ children: [new PageBreak()] }))

// --- Seccion 2 -------------------------------------------------------------
cuerpo.push(H1('Sección 2. Soporte teórico y arquitectura transmedia'))
cuerpo.push(H2('2.1 Cultura de la convergencia (Jenkins)'))
cuerpo.push(P(teoria.jenkins))
cuerpo.push(H2('2.2 Narrativas transmedia y prosumidor (Scolari)'))
cuerpo.push(P(teoria.scolari))
cuerpo.push(H2('2.3 Aporte de Sierra'))
cuerpo.push(aviso(teoria.sierra))
cuerpo.push(H2('2.4 Los dos nodos'))
cuerpo.push(tabla(
  ['Nodo', 'Pieza', 'Plataforma', 'Qué aporta que no está en el otro'],
  teoria.nodos.map((n) => [n.nodo, n.pieza, n.plataforma, n.aporta]),
  [16, 22, 14, 48],
))
cuerpo.push(H2('2.5 Navegación hipertextual'))
teoria.hipertexto.forEach((t) => cuerpo.push(P(t)))
cuerpo.push(H2('2.6 Mapa rizomático de la estructura'))
cuerpo.push(...imagen('05-mapa.png', 'Figura 1. Mapa rizomático. La crónica al centro; con línea continua las cinco capas que abren desde una palabra del texto; con línea punteada las dos piezas que la acompañan.', 520))
cuerpo.push(new Paragraph({ children: [new PageBreak()] }))

// --- Seccion 3 -------------------------------------------------------------
cuerpo.push(H1('Sección 3. Enlaces y evidencias de los productos publicados'))
cuerpo.push(tabla(
  ['Nodo', 'Enlace'],
  [
    ['Nodo 1 — Crónica hipertextual', URL_SITIO],
    ['Nodo 2 — Episodio de audio', '[PENDIENTE: URL de Spotify]'],
    ['Código fuente del Nodo 1', URL_REPO],
  ],
  [34, 66],
))
cuerpo.push(H2('3.1 Nodo 1 publicado'))
cuerpo.push(...imagen('01-portada.png', 'Figura 2. Portada de la crónica.'))
cuerpo.push(...imagen('02-capa.png', 'Figura 3. Capa complementaria abierta desde una palabra del texto: la cifra, su lectura correcta y sus dos fuentes.'))
cuerpo.push(...imagen('03-participacion.png', 'Figura 4. Zona de participación: encuesta con resultados y muro de aportes del público.'))
cuerpo.push(...imagen('04-fuentes.png', 'Figura 5. Lista pública de documentos con enlace a cada fuente oficial.'))
cuerpo.push(H2('3.2 Nodo 2 publicado'))
cuerpo.push(aviso('PENDIENTE: insertar la URL de Spotify y la captura del episodio publicado.'))
cuerpo.push(new Paragraph({ children: [new PageBreak()] }))

// --- Seccion 4 -------------------------------------------------------------
cuerpo.push(H1('Sección 4. Control ético de la verdad'))
cuerpo.push(H2('4.1 Protocolo de verificación'))
metodo.reglas.forEach(([titulo, texto]) => {
  cuerpo.push(new Paragraph({
    spacing: { before: 160, after: 60, line: 360 },
    children: [new TextRun({ text: titulo, size: 24, bold: true })],
  }))
  cuerpo.push(P(texto))
})
cuerpo.push(H2('4.2 Reportería en curso'))
cuerpo.push(P(metodo.peticion))
cuerpo.push(H2('4.3 Matriz de seguimiento de fuentes'))
cuerpo.push(tabla(
  ['Fuente', 'Tipo', 'Aporte', 'Contraste realizado', 'Consentimiento', 'Estado'],
  fuentes,
  [20, 9, 24, 24, 12, 11],
))
cuerpo.push(...imagen('06-matriz.png', 'Figura 6. La misma matriz publicada como anexo del proyecto.'))
cuerpo.push(new Paragraph({ children: [new PageBreak()] }))

// --- Seccion 5 -------------------------------------------------------------
cuerpo.push(H1('Sección 5. Gestión de recursos y viabilidad financiera'))
cuerpo.push(P('El libro de Excel adjunto reúne el presupuesto operativo, el cronograma de tiempos y movimientos y el tablero de control de impacto. Ningún total está escrito a mano: son fórmulas enlazadas entre hojas, de modo que modificar una partida del presupuesto recalcula el índice de eficiencia.'))
cuerpo.push(aviso('PENDIENTE: validar las cifras del presupuesto con los equipos y gastos reales, e insertar las capturas de las tres hojas del libro.'))

cuerpo.push(H2('5.1 Presupuesto operativo'))
cuerpo.push(tabla(
  ['Tipo', 'Concepto', 'Cant.', 'Valor unitario', 'Subtotal'],
  presupuesto.map((p) => [p.tipo, p.concepto, p.cantidad, cop(p.valor), cop(p.cantidad * p.valor)]),
  [10, 46, 8, 18, 18],
))
cuerpo.push(P(`El CAPEX asciende a ${cop(capex)} y corresponde a equipos de captura y a la depreciación del móvil durante el periodo. El OPEX asciende a ${cop(opex)} y recoge conectividad, transporte de campo, viáticos, trámites y publicación. La inversión total del proyecto es de ${cop(total)}, repartida en un ${(capex / total * 100).toFixed(1)} % de CAPEX y un ${(opex / total * 100).toFixed(1)} % de OPEX.`))

cuerpo.push(H2('5.2 Cronograma de tiempos y movimientos'))
cuerpo.push(P('El diagrama de Gantt de la segunda hoja recorre cinco fases entre el 24 de agosto y el 20 de septiembre de 2026: preproducción intelectual, producción del Nodo 1, producción del Nodo 2, postproducción y distribución con medición. Cada tarea declara a qué nodo transmedia pertenece, de modo que se distingue el tiempo invertido en la crónica del invertido en el episodio.'))

cuerpo.push(H2('5.3 Tablero de control de impacto y cálculo del IEC'))
cuerpo.push(P('El tablero recoge nueve indicadores repartidos en Alcance, Engagement y Conversión, con su meta, su resultado y su porcentaje de cumplimiento. Conforme a lo solicitado, las métricas son simuladas y así se declara dentro de la propia hoja.'))
cuerpo.push(tabla(
  ['Dimensión', 'Resultado', 'Peso', 'Puntos de impacto'],
  [
    ['Alcance', dim('Alcance'), pesosIEC.alcance, dim('Alcance') * pesosIEC.alcance],
    ['Engagement', dim('Engagement'), pesosIEC.engagement, dim('Engagement') * pesosIEC.engagement],
    ['Conversión', dim('Conversion'), pesosIEC.conversion, dim('Conversion') * pesosIEC.conversion],
    ['Valor de impacto total', '', '', puntos],
  ],
  [34, 22, 16, 28],
))
cuerpo.push(P('La ponderación no es arbitraria. Una conversión vale veinte veces una impresión porque quien escribe su turno en el muro o marca una línea de ayuda ha ejecutado una acción, mientras que quien solo vio la pieza no dejó rastro de haberla usado. El engagement queda en un punto intermedio: hubo interacción, pero no una acción completada.'))
cuerpo.push(new Paragraph({
  spacing: { before: 200, after: 200, line: 360 },
  alignment: AlignmentType.CENTER,
  shading: { type: ShadingType.SOLID, color: 'F1F5F9' },
  children: [new TextRun({
    text: `IEC = ${puntos.toLocaleString('es-CO')} puntos ÷ ${cop(total)} × 1.000 = ${iec.toFixed(2)}`,
    size: 26, bold: true, color: TINTA,
  })],
}))
cuerpo.push(P(`El índice indica que cada mil pesos invertidos produjeron ${iec.toFixed(2)} puntos de impacto. Su utilidad es comparativa: sirve para contrastar piezas entre sí o periodos sucesivos del mismo proyecto, no como cifra absoluta.`))
cuerpo.push(aviso('PENDIENTE: si en clase se enseñó otra fórmula del IEC, sustituirla aquí y en la celda correspondiente del libro de Excel.'))
cuerpo.push(new Paragraph({ children: [new PageBreak()] }))

// --- Bibliografia ----------------------------------------------------------
cuerpo.push(H1('Bibliografía'))
bibliografia.forEach((r) => {
  cuerpo.push(new Paragraph({
    spacing: { line: 480, after: 120 },
    indent: { left: 720, hanging: 720 },
    children: [new TextRun({ text: r, size: 24 })],
  }))
})

/* ========================= DOCUMENTO ========================= */
const doc = new Document({
  creator: proyecto.autora,
  title: `${proyecto.titulo} — ACA`,
  styles: { default: { document: { run: { font: 'Times New Roman', size: 24 } } } },
  sections: [
    {
      properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      children: portada,
    },
    {
      properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ children: [PageNumber.CURRENT], size: 20, color: GRIS })],
          })],
        }),
      },
      children: cuerpo,
    },
  ],
})

mkdirSync('entregable', { recursive: true })
const destino = 'entregable/ACA-turno-de-madrugada.docx'
const { writeFile } = await import('node:fs/promises')
await writeFile(destino, await Packer.toBuffer(doc))
console.log(`Documento generado: ${destino}`)
