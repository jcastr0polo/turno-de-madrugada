/**
 * Genera el libro de Excel del entregable.
 *
 *   npm run excel   ->  entregable/turno-de-madrugada-gestion.xlsx
 *
 * Nada está escrito a mano: todos los totales, porcentajes y el IEC son
 * fórmulas vivas de Excel. Si se cambia una cifra en datos.mjs —o dentro del
 * propio libro— el resto se recalcula solo. Eso es lo que pide la rúbrica
 * cuando habla de "cálculo matemático claro".
 */
import { mkdirSync } from 'node:fs'
import ExcelJS from 'exceljs'
import { cronograma, kpis, pesosIEC, presupuesto, proyecto } from './datos.mjs'

const TINTA = 'FF0F172A'
const ACENTO = 'FF0EA5E9'
const SUAVE = 'FFF1F5F9'
const BORDE = 'FFCBD5E1'
const GRIS = 'FF64748B'

const COP = '"$"#,##0;[Red]-"$"#,##0'

const libro = new ExcelJS.Workbook()
libro.creator = proyecto.autora
libro.created = new Date()

// El resumen se crea primero para que quede como primera pestaña, pero se
// rellena al final: sus celdas son formulas que apuntan a las otras hojas.
const res = libro.addWorksheet('0. Resumen', { properties: { tabColor: { argb: TINTA } } })

function col(n) {
  let s = ''
  while (n > 0) {
    const r = (n - 1) % 26
    s = String.fromCharCode(65 + r) + s
    n = Math.floor((n - 1) / 26)
  }
  return s
}

function titular(hoja, fila, texto, ancho) {
  hoja.mergeCells(fila, 1, fila, ancho)
  const c = hoja.getCell(fila, 1)
  c.value = texto
  c.font = { name: 'Calibri', size: 16, bold: true, color: { argb: TINTA } }
  hoja.getRow(fila).height = 26
}

function nota(hoja, fila, texto, ancho, color = GRIS) {
  hoja.mergeCells(fila, 1, fila, ancho)
  const c = hoja.getCell(fila, 1)
  c.value = texto
  c.font = { name: 'Calibri', size: 10, italic: true, color: { argb: color } }
  c.alignment = { wrapText: true, vertical: 'middle' }
}

function cabecera(hoja, fila, titulos) {
  titulos.forEach((t, i) => {
    const c = hoja.getCell(fila, i + 1)
    c.value = t
    c.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FFFFFFFF' } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TINTA } }
    c.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    c.border = { bottom: { style: 'thin', color: { argb: BORDE } } }
  })
  hoja.getRow(fila).height = 30
}

function marco(hoja, f1, f2, c1, c2) {
  for (let f = f1; f <= f2; f++) {
    for (let c = c1; c <= c2; c++) {
      hoja.getCell(f, c).border = {
        top: { style: 'hair', color: { argb: BORDE } },
        left: { style: 'hair', color: { argb: BORDE } },
        bottom: { style: 'hair', color: { argb: BORDE } },
        right: { style: 'hair', color: { argb: BORDE } },
      }
    }
  }
}

/* ========================================================================= */
/* 1. Presupuesto                                                            */
/* ========================================================================= */
const pre = libro.addWorksheet('1. Presupuesto', {
  properties: { tabColor: { argb: ACENTO } },
  pageSetup: { orientation: 'landscape', fitToPage: true },
})
pre.columns = [
  { width: 10 }, { width: 22 }, { width: 46 }, { width: 10 },
  { width: 12 }, { width: 16 }, { width: 16 }, { width: 44 },
]

titular(pre, 1, 'Presupuesto operativo', 8)
nota(pre, 2, `${proyecto.titulo} · ${proyecto.periodo} · Cifras en pesos colombianos`, 8)
nota(pre, 3, 'CIFRAS ESTIMADAS, PENDIENTES DE VALIDACION POR LA AUTORA. Son sus equipos y sus costos reales.', 8, 'FFB45309')
pre.getRow(3).height = 18

cabecera(pre, 5, ['Tipo', 'Categoria', 'Concepto', 'Cantidad', 'Unidad', 'Valor unitario', 'Subtotal', 'Justificacion'])

let fila = 6
const rangos = {}
for (const tipo of ['CAPEX', 'OPEX']) {
  const inicio = fila
  for (const p of presupuesto.filter((x) => x.tipo === tipo)) {
    pre.getCell(fila, 1).value = p.tipo
    pre.getCell(fila, 2).value = p.categoria
    pre.getCell(fila, 3).value = p.concepto
    pre.getCell(fila, 4).value = p.cantidad
    pre.getCell(fila, 5).value = p.unidad
    pre.getCell(fila, 6).value = p.valor
    pre.getCell(fila, 7).value = { formula: `D${fila}*F${fila}` }
    pre.getCell(fila, 8).value = p.nota

    pre.getCell(fila, 1).font = { size: 10, bold: true, color: { argb: tipo === 'CAPEX' ? TINTA : GRIS } }
    pre.getCell(fila, 6).numFmt = COP
    pre.getCell(fila, 7).numFmt = COP
    pre.getCell(fila, 4).alignment = { horizontal: 'center' }
    pre.getCell(fila, 8).font = { size: 9, color: { argb: GRIS } }
    pre.getCell(fila, 8).alignment = { wrapText: true, vertical: 'middle' }
    if (fila % 2 === 0) {
      for (let c = 1; c <= 8; c++) {
        pre.getCell(fila, c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUAVE } }
      }
    }
    fila++
  }
  rangos[tipo] = [inicio, fila - 1]

  pre.mergeCells(fila, 1, fila, 6)
  const et = pre.getCell(fila, 1)
  et.value = tipo === 'CAPEX'
    ? 'Subtotal CAPEX  ·  bienes duraderos y equipos'
    : 'Subtotal OPEX  ·  operacion, conectividad y trabajo de campo'
  et.font = { size: 11, bold: true, color: { argb: TINTA } }
  et.alignment = { horizontal: 'right' }
  const tot = pre.getCell(fila, 7)
  tot.value = { formula: `SUM(G${inicio}:G${fila - 1})` }
  tot.numFmt = COP
  tot.font = { size: 11, bold: true, color: { argb: TINTA } }
  rangos[`${tipo}_total`] = fila
  for (let c = 1; c <= 8; c++) {
    pre.getCell(fila, c).border = { top: { style: 'thin', color: { argb: TINTA } } }
  }
  fila += 2
}

const filaTotal = fila
pre.mergeCells(filaTotal, 1, filaTotal, 6)
const etT = pre.getCell(filaTotal, 1)
etT.value = 'INVERSION TOTAL DEL PROYECTO'
etT.font = { size: 12, bold: true, color: { argb: 'FFFFFFFF' } }
etT.alignment = { horizontal: 'right', vertical: 'middle' }
const celT = pre.getCell(filaTotal, 7)
celT.value = { formula: `G${rangos.CAPEX_total}+G${rangos.OPEX_total}` }
celT.numFmt = COP
celT.font = { size: 12, bold: true, color: { argb: 'FFFFFFFF' } }
for (let c = 1; c <= 7; c++) {
  pre.getCell(filaTotal, c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TINTA } }
}
pre.getRow(filaTotal).height = 24

pre.getCell(filaTotal + 2, 1).value = 'Peso de cada tipo'
pre.getCell(filaTotal + 2, 1).font = { size: 10, bold: true }
pre.getCell(filaTotal + 3, 1).value = 'CAPEX'
pre.getCell(filaTotal + 3, 2).value = { formula: `G${rangos.CAPEX_total}/G${filaTotal}` }
pre.getCell(filaTotal + 4, 1).value = 'OPEX'
pre.getCell(filaTotal + 4, 2).value = { formula: `G${rangos.OPEX_total}/G${filaTotal}` }
pre.getCell(filaTotal + 3, 2).numFmt = '0.0%'
pre.getCell(filaTotal + 4, 2).numFmt = '0.0%'

marco(pre, 5, filaTotal, 1, 8)
pre.views = [{ state: 'frozen', ySplit: 5 }]
pre.autoFilter = { from: { row: 5, column: 1 }, to: { row: rangos.OPEX[1], column: 8 } }

const REF_TOTAL = `'1. Presupuesto'!G${filaTotal}`

/* ========================================================================= */
/* 2. Cronograma (Gantt)                                                     */
/* ========================================================================= */
const gan = libro.addWorksheet('2. Cronograma', {
  properties: { tabColor: { argb: ACENTO } },
  pageSetup: { orientation: 'landscape', fitToPage: true },
})

const dia = 86400000
const fechas = cronograma.flatMap((t) => [new Date(t.inicio), new Date(t.fin)])
const desde = new Date(Math.min(...fechas))
const hasta = new Date(Math.max(...fechas))
const dias = Math.round((hasta - desde) / dia) + 1

gan.getColumn(1).width = 26
gan.getColumn(2).width = 46
gan.getColumn(3).width = 12
gan.getColumn(4).width = 11
gan.getColumn(5).width = 11
gan.getColumn(6).width = 8
for (let d = 0; d < dias; d++) gan.getColumn(7 + d).width = 3.4

titular(gan, 1, 'Cronograma de tiempos y movimientos', 6 + dias)
nota(gan, 2, `${proyecto.titulo} · Diagrama de Gantt por fase y por nodo transmedia`, 6 + dias)

cabecera(gan, 4, ['Fase', 'Tarea', 'Nodo', 'Inicio', 'Fin', 'Dias'])
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
for (let d = 0; d < dias; d++) {
  const f = new Date(desde.getTime() + d * dia)
  const c = gan.getCell(4, 7 + d)
  c.value = f.getDate()
  c.font = { size: 8, bold: true, color: { argb: 'FFFFFFFF' } }
  c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TINTA } }
  c.alignment = { horizontal: 'center' }
  const m = gan.getCell(3, 7 + d)
  if (f.getDate() === 1 || d === 0) {
    m.value = MES[f.getMonth()]
    m.font = { size: 8, bold: true, color: { argb: GRIS } }
    m.alignment = { horizontal: 'left' }
  }
}

const COLOR_FASE = {
  'Preproduccion intelectual': 'FF7DD3FC',
  'Produccion Nodo 1': 'FF0EA5E9',
  'Produccion Nodo 2': 'FF38BDF8',
  'Postproduccion': 'FF0369A1',
  'Distribucion y medicion': 'FFBAE6FD',
}

let g = 5
let faseAnterior = null
for (const t of cronograma) {
  gan.getCell(g, 1).value = t.fase === faseAnterior ? '' : t.fase
  gan.getCell(g, 1).font = { size: 10, bold: true, color: { argb: TINTA } }
  faseAnterior = t.fase
  gan.getCell(g, 2).value = t.tarea
  gan.getCell(g, 2).font = { size: 10 }
  gan.getCell(g, 3).value = t.nodo
  gan.getCell(g, 3).font = { size: 9, color: { argb: GRIS } }
  gan.getCell(g, 4).value = new Date(t.inicio)
  gan.getCell(g, 5).value = new Date(t.fin)
  gan.getCell(g, 4).numFmt = 'dd/mm'
  gan.getCell(g, 5).numFmt = 'dd/mm'
  gan.getCell(g, 6).value = { formula: `E${g}-D${g}+1` }
  gan.getCell(g, 6).alignment = { horizontal: 'center' }

  const i = Math.round((new Date(t.inicio) - desde) / dia)
  const f = Math.round((new Date(t.fin) - desde) / dia)
  for (let d = i; d <= f; d++) {
    gan.getCell(g, 7 + d).fill = {
      type: 'pattern', pattern: 'solid',
      fgColor: { argb: COLOR_FASE[t.fase] ?? ACENTO },
    }
  }
  g++
}

marco(gan, 4, g - 1, 1, 6 + dias)
gan.views = [{ state: 'frozen', xSplit: 6, ySplit: 4 }]

const leyenda = g + 1
gan.getCell(leyenda, 1).value = 'Leyenda'
gan.getCell(leyenda, 1).font = { size: 10, bold: true }
let l = leyenda + 1
for (const [fase, color] of Object.entries(COLOR_FASE)) {
  gan.getCell(l, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } }
  gan.getCell(l, 2).value = fase
  gan.getCell(l, 2).font = { size: 10 }
  l++
}

/* ========================================================================= */
/* 3. KPI e IEC                                                              */
/* ========================================================================= */
const kpi = libro.addWorksheet('3. KPI e IEC', {
  properties: { tabColor: { argb: ACENTO } },
  pageSetup: { orientation: 'landscape', fitToPage: true },
})
kpi.columns = [
  { width: 16 }, { width: 46 }, { width: 12 }, { width: 12 },
  { width: 16 }, { width: 28 },
]

titular(kpi, 1, 'Tablero de control de impacto', 6)
nota(kpi, 2, `${proyecto.titulo} · Metricas simuladas de Alcance, Engagement y Conversion`, 6)
nota(kpi, 3, 'La rubrica pide metricas SIMULADAS: la columna "Logrado" es una proyeccion declarada, no una medicion.', 6, 'FFB45309')

cabecera(kpi, 5, ['Dimension', 'Indicador', 'Meta', 'Logrado', 'Cumplimiento', 'Fuente de medicion'])

let k = 6
const bloques = {}
for (const dim of ['Alcance', 'Engagement', 'Conversion']) {
  const inicio = k
  for (const x of kpis.filter((y) => y.dimension === dim)) {
    kpi.getCell(k, 1).value = k === inicio ? dim : ''
    kpi.getCell(k, 1).font = { size: 10, bold: true, color: { argb: ACENTO } }
    kpi.getCell(k, 2).value = x.indicador
    kpi.getCell(k, 3).value = x.meta
    kpi.getCell(k, 4).value = x.logrado
    kpi.getCell(k, 5).value = { formula: `IFERROR(D${k}/C${k},0)` }
    kpi.getCell(k, 5).numFmt = '0.0%'
    kpi.getCell(k, 6).value = x.fuente
    kpi.getCell(k, 6).font = { size: 9, color: { argb: GRIS } }
    for (const c of [3, 4, 5]) kpi.getCell(k, c).alignment = { horizontal: 'center' }
    if (k % 2 === 0) {
      for (let c = 1; c <= 6; c++) {
        kpi.getCell(k, c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUAVE } }
      }
    }
    k++
  }
  kpi.getCell(k, 2).value = `Total ${dim}`
  kpi.getCell(k, 2).font = { size: 10, bold: true }
  kpi.getCell(k, 2).alignment = { horizontal: 'right' }
  kpi.getCell(k, 3).value = { formula: `SUM(C${inicio}:C${k - 1})` }
  kpi.getCell(k, 4).value = { formula: `SUM(D${inicio}:D${k - 1})` }
  kpi.getCell(k, 5).value = { formula: `IFERROR(D${k}/C${k},0)` }
  kpi.getCell(k, 5).numFmt = '0.0%'
  for (const c of [3, 4, 5]) {
    kpi.getCell(k, c).font = { size: 10, bold: true }
    kpi.getCell(k, c).alignment = { horizontal: 'center' }
    kpi.getCell(k, c).border = { top: { style: 'thin', color: { argb: TINTA } } }
  }
  bloques[dim] = k
  k += 2
}

marco(kpi, 5, bloques.Conversion, 1, 6)

// --- Indice de Eficiencia de Contenido ------------------------------------
let e = k + 1
titular(kpi, e, 'Indice de Eficiencia de Contenido (IEC)', 6)
e++
nota(kpi, e, 'Convierte el impacto conseguido en puntos y lo divide entre la inversion. Una conversion pesa mas que una impresion: quien escribe su turno o marca una linea de ayuda hizo algo, no solo paso por delante.', 6)
kpi.getRow(e).height = 30
e += 2

const cabIEC = e
cabecera(kpi, cabIEC, ['Dimension', 'Formula', 'Resultado', 'Peso', 'Puntos de impacto', 'Nota'])
e++

const filaPuntos = {}
for (const [dim, peso] of [['Alcance', pesosIEC.alcance], ['Engagement', pesosIEC.engagement], ['Conversion', pesosIEC.conversion]]) {
  kpi.getCell(e, 1).value = dim
  kpi.getCell(e, 1).font = { size: 10, bold: true }
  kpi.getCell(e, 2).value = `Total logrado en ${dim}`
  kpi.getCell(e, 2).font = { size: 9, color: { argb: GRIS } }
  kpi.getCell(e, 3).value = { formula: `D${bloques[dim]}` }
  kpi.getCell(e, 4).value = peso
  kpi.getCell(e, 5).value = { formula: `C${e}*D${e}` }
  for (const c of [3, 4, 5]) kpi.getCell(e, c).alignment = { horizontal: 'center' }
  kpi.getCell(e, 5).font = { bold: true }
  kpi.getCell(e, 6).value = dim === 'Conversion' ? 'Accion completada por el publico' : dim === 'Engagement' ? 'Interaccion con la pieza' : 'Contacto con la pieza'
  kpi.getCell(e, 6).font = { size: 9, color: { argb: GRIS } }
  filaPuntos[dim] = e
  e++
}

const filaImpacto = e
kpi.getCell(filaImpacto, 2).value = 'Valor de impacto total (puntos)'
kpi.getCell(filaImpacto, 2).font = { size: 11, bold: true }
kpi.getCell(filaImpacto, 2).alignment = { horizontal: 'right' }
kpi.getCell(filaImpacto, 5).value = { formula: `SUM(E${filaPuntos.Alcance}:E${filaPuntos.Conversion})` }
kpi.getCell(filaImpacto, 5).font = { size: 11, bold: true }
kpi.getCell(filaImpacto, 5).alignment = { horizontal: 'center' }
kpi.getCell(filaImpacto, 5).border = { top: { style: 'thin', color: { argb: TINTA } } }
e += 2

const filaCosto = e
kpi.getCell(filaCosto, 2).value = 'Inversion total del proyecto'
kpi.getCell(filaCosto, 2).alignment = { horizontal: 'right' }
kpi.getCell(filaCosto, 2).font = { size: 11, bold: true }
kpi.getCell(filaCosto, 5).value = { formula: REF_TOTAL }
kpi.getCell(filaCosto, 5).numFmt = COP
kpi.getCell(filaCosto, 5).font = { size: 11, bold: true }
kpi.getCell(filaCosto, 5).alignment = { horizontal: 'center' }
kpi.getCell(filaCosto, 6).value = 'Enlazado con la hoja 1'
kpi.getCell(filaCosto, 6).font = { size: 9, italic: true, color: { argb: GRIS } }
e += 2

const filaIEC = e
kpi.mergeCells(filaIEC, 1, filaIEC, 4)
const etIEC = kpi.getCell(filaIEC, 1)
etIEC.value = 'IEC  =  Valor de impacto / Inversion total x 1.000'
etIEC.font = { size: 13, bold: true, color: { argb: 'FFFFFFFF' } }
etIEC.alignment = { horizontal: 'right', vertical: 'middle' }
const celIEC = kpi.getCell(filaIEC, 5)
celIEC.value = { formula: `IFERROR(E${filaImpacto}/E${filaCosto}*1000,0)` }
celIEC.numFmt = '0.00'
celIEC.font = { size: 14, bold: true, color: { argb: 'FFFFFFFF' } }
celIEC.alignment = { horizontal: 'center', vertical: 'middle' }
for (let c = 1; c <= 6; c++) {
  kpi.getCell(filaIEC, c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TINTA } }
}
kpi.getRow(filaIEC).height = 30
kpi.getCell(filaIEC, 6).value = 'puntos por cada 1.000 COP'
kpi.getCell(filaIEC, 6).font = { size: 9, color: { argb: 'FFFFFFFF' } }

e += 2
nota(kpi, e, 'Lectura del indice: cada 1.000 pesos invertidos produjeron esa cantidad de puntos de impacto. Sirve para comparar entre piezas y entre periodos, no como cifra absoluta.', 6)
e++
nota(kpi, e, 'Si en clase se enseno otra formula del IEC, se sustituye la formula de la celda E' + filaIEC + ' y todo lo demas sigue calculando solo.', 6, 'FFB45309')

marco(kpi, cabIEC, filaCosto, 1, 6)

/* ========================================================================= */
/* 0. Resumen — se inserta primero                                           */
/* ========================================================================= */
res.columns = [{ width: 34 }, { width: 52 }, { width: 22 }]

titular(res, 1, proyecto.titulo, 3)
nota(res, 2, `${proyecto.serie} · cronica hipertextual y episodio de audio`, 3)

let r = 4
for (const [etiqueta, valor] of [
  ['Autora', proyecto.autora],
  ['Asignatura', `${proyecto.asignatura} (${proyecto.codigo})`],
  ['Institucion', proyecto.institucion],
  ['Ciudad', proyecto.ciudad],
  ['Periodo de ejecucion', proyecto.periodo],
  ['Nodo 1', 'Cronica hipertextual en web'],
  ['Nodo 2', 'Episodio de audio "Lo que queda del dia"'],
]) {
  res.getCell(r, 1).value = etiqueta
  res.getCell(r, 1).font = { size: 10, bold: true, color: { argb: GRIS } }
  res.getCell(r, 2).value = valor
  res.getCell(r, 2).font = { size: 11, color: { argb: TINTA } }
  r++
}

r += 1
res.getCell(r, 1).value = 'Cifras de control'
res.getCell(r, 1).font = { size: 13, bold: true, color: { argb: TINTA } }
r += 1

for (const [etiqueta, formula, formato] of [
  ['Inversion CAPEX', `'1. Presupuesto'!G${rangos.CAPEX_total}`, COP],
  ['Inversion OPEX', `'1. Presupuesto'!G${rangos.OPEX_total}`, COP],
  ['Inversion total', REF_TOTAL, COP],
  ['Duracion del proyecto (dias)', `'2. Cronograma'!E${g - 1}-'2. Cronograma'!D5+1`, '0'],
  ['Valor de impacto (puntos)', `'3. KPI e IEC'!E${filaImpacto}`, '#,##0'],
  ['Indice de Eficiencia de Contenido', `'3. KPI e IEC'!E${filaIEC}`, '0.00'],
]) {
  res.getCell(r, 1).value = etiqueta
  res.getCell(r, 1).font = { size: 11, bold: etiqueta.includes('total') || etiqueta.includes('Indice') }
  const c = res.getCell(r, 2)
  c.value = { formula }
  c.numFmt = formato
  c.font = { size: 12, bold: true, color: { argb: etiqueta.includes('Indice') ? ACENTO : TINTA } }
  c.alignment = { horizontal: 'left' }
  r++
}

r += 1
nota(res, r, 'Todas las cifras de este resumen son formulas enlazadas a las hojas 1, 2 y 3: cambiar un dato alli actualiza este cuadro.', 3)
r += 2
nota(res, r, 'PENDIENTE DE VALIDACION: los valores del presupuesto son estimaciones. Deben confirmarse con los equipos y gastos reales antes de entregar.', 3, 'FFB45309')

mkdirSync('entregable', { recursive: true })
const destino = 'entregable/turno-de-madrugada-gestion.xlsx'
await libro.xlsx.writeFile(destino)
console.log(`Libro generado: ${destino}`)
console.log(`  Hojas: ${libro.worksheets.map((h) => h.name).join(' · ')}`)
