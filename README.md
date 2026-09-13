# El turno de la madrugada

Crónica periodística hipertextual de la serie **Turno de madrugada**.

- **Autora:** Leidy Carolina Granados Celis
- **Asignatura:** Taller de Creación de Contenidos — CUN
- **Ciudad:** Santa Marta, Magdalena

---

## Qué es esto

Una pieza de lectura larga con cinco capas complementarias que se abren desde
palabras marcadas dentro del texto. La crónica se lee completa sin abrir ninguna
capa: son complemento, no requisito.

La segunda pieza de la serie es un episodio de audio, *Lo que queda del día*,
que el sitio enlaza y describe sin repetirlo.

## Stack

| Pieza | Elección |
|---|---|
| Framework | Next.js 16, App Router, Server Components por defecto |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4, tokens en `@theme` dentro de `app/globals.css` |
| Referencia de diseño | DevSpace de Cruip: raíl fijo, columna de lectura y barra lateral |
| Tipografías | `next/font` (Inter Tight, Inter, JetBrains Mono), autoalojadas |
| Dependencias de UI | Ninguna |

Llevan `"use client"` el proveedor de capas, el disparador, el panel, el índice
de capas de la barra lateral, el raíl de navegación, la encuesta y el muro. Todo
lo demás se renderiza en el servidor, incluido el contenido de las cinco capas.

### Composición

Tres zonas, tomadas de la lógica de DevSpace. Nada se centra:

```
┌────┬──────────────────────┬────────────┐
│    │ 3:47 a. m.           │            │
│ CR │ El turno de...       │  CAPAS     │
│ PA │                      │  · Glosario│
│ EP │ La una de la mañana  │  · Datos   │
│ MA │ A esta hora la casa  │  · ...     │
│ FU │ por fin está callada │────────────│
│ AY │ ...                  │  EPISODIO  │
│    │                      │────────────│
│    │                      │ 106 123 155│
└────┴──────────────────────┴────────────┘
 raíl      columna 38rem      barra
```

El raíl marca la sección visible con una línea de acento. La barra da acceso no
lineal a las capas, para quien no quiera cazarlas dentro del texto.

### Paleta

| Token | Valor | Uso |
|---|---|---|
| `--color-fondo` | `#0A0F1A` | Fondo |
| `--color-superficie` | `#131A28` | Fichas y panel |
| `--color-borde` | `#1E293B` | Bordes decorativos |
| `--color-texto` | `#E2E8F0` | Texto principal |
| `--color-apagado` | `#94A3B8` | Texto secundario (7,5:1) |
| `--color-acento` | `#38BDF8` | Única nota de color (9:1) |
| `--color-trazo` | `#64748B` | Trazo del mapa (4:1) |

El mapa tiene su propio token a propósito: es contenido con significado, así que
sus trazos deben superar 3:1 (WCAG 1.4.11), a diferencia de los bordes
decorativos de las fichas, que sí deben desaparecer.

El resaltador no puede ser un bloque rotado con `::before`, porque las frases
marcadas parten en varias líneas. Se resuelve con un degradado de fondo y
`box-decoration-break: clone`, que sigue al texto en cada línea.

## Arrancar en local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción (el mismo que corre Vercel)
npm start          # servir el build
npm run lint
```

## Desplegar en Vercel

No necesita configuración adicional. El proyecto es 100 % estático tras el build.

1. Sube el repositorio a GitHub (ya está en `jcastr0polo/turno-de-madrugada`).
2. En [vercel.com/new](https://vercel.com/new), importa el repositorio.
3. Acepta los valores que Vercel detecta solo: framework Next.js, build
   `npm run build`, directorio de salida por defecto. **No hay variables de
   entorno obligatorias.**
4. Deploy.

### Dominio propio (opcional)

`metadataBase` se resuelve solo en Vercel a través de
`VERCEL_PROJECT_PRODUCTION_URL`. Si usas un dominio distinto, define en el
panel de Vercel:

```
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

Solo afecta a las URL absolutas de Open Graph.

## Editar el contenido sin tocar componentes

Todo el texto vive en `content/`, separado del maquetado y tipado en
`content/types.ts`. El contenido es JSON puro: sin JSX y sin funciones.

| Archivo | Qué contiene |
|---|---|
| `content/sitio.ts` | Titular, bajada, firma, metadatos de portada |
| `content/cronica.ts` | Los cuatro bloques y sus antetítulos |
| `content/capas.ts` | Las cinco capas complementarias |
| `content/fuentes.ts` | Registro de fuentes y tabla de "Cómo se hizo" |
| `content/episodio.ts` | Episodio de audio y su URL |
| `content/participacion.ts` | Encuesta y muro |

Incluida la voz del sitio: rótulos de sección, entradas, copia de la barra
lateral y leyenda del mapa. No vive en los componentes porque es contenido.

### Qué es el nodo y qué es el entregable

La pieza publicada y el trabajo académico son dos cosas distintas, y mezclarlas
le hace daño a las dos. El nodo es periodismo; el entregable demuestra el
método a un evaluador. **Un lector necesita navegar, no ver los planos.**

Vive en `/anexos`, fuera de buscadores y sin enlace desde el nodo:

| Pieza | Por qué no está en el nodo |
|---|---|
| Mapa rizomático de la estructura | Es documentación de arquitectura. Un lector no necesita un diagrama con sus propios nodos rotulados. |
| Matriz de fuentes con consentimientos | Publicar una nota de método es periodismo; publicar el papeleo de cumplimiento, no. |

Lo que sí quedó en el nodo, reescrito:

- La tabla de cuatro columnas se convirtió en **lista pública de documentos**:
  qué sostiene cada papel y dónde descargarlo. Sin contraste ni consentimiento.
- La firma académica salió de la cabecera y del pie. El nombre, la ciudad y la
  fecha se quedan; la asignatura y la institución son portada del entregable.
- Fuera el vocabulario de taller: ni `[PENDIENTE DE REPORTERÍA]`, ni insignias
  de `Verificado`, ni "abre la capa" en los textos que solo oye un lector de
  pantalla. La reportería abierta se anuncia como **Actualización**, que es
  como se dice en un medio.
- Los rótulos de las capas venían de la taxonomía del encargo. "Datos
  verificados" y "Método de verificación" pasaron a **La cifra** y **El
  método**: un lector no navega por verificación fáctica, navega por lo que va
  a encontrar.

### Regla editorial

**La página no se explica a sí misma.** Cada línea avanza el argumento, nombra
algo o declara lo que el lector necesita saber. Ninguna describe la
arquitectura, el soporte ni el funcionamiento de la interfaz: el manual de uso
no es contenido.

Por eso la línea que abre la lectura no dice "las palabras resaltadas abren una
capa", sino:

> Lo que no es mío está marcado. Detrás de cada marca está el documento que lo
> sostiene.

Enuncia el pacto de verificación de la pieza. Que además deje ver dónde se
puede entrar es consecuencia, no propósito.

Lo único que queda escrito en los componentes son dos mapeos de valores
tipados —estados de consentimiento y de verificación— y los nombres accesibles
de los landmarks. Eso sí es interfaz.

### Marcar una palabra que abra una capa

Dentro de `contenido`, un objeto en lugar de una cadena:

```ts
{
  t: 'p',
  contenido: [
    'Lo que no tiene es ',
    { t: 'capa', texto: 'un lugar donde aparezca esta hora', capa: 'glosario', ancla: 'tercera-jornada' },
    '.',
  ],
}
```

### Publicar el episodio de audio

Una sola línea, en `content/episodio.ts`:

```ts
export const URL_EPISODIO: string | null = 'https://open.spotify.com/episode/...'
```

Con la URL puesta, el botón deja de estar deshabilitado y desaparece el aviso de
fecha de publicación.

### Reportería pendiente

Donde falta reportería, el contenido lleva el marcador `[PENDIENTE DE
REPORTERÍA]` visible en la página. No se rellena con texto inventado. Hoy hay
dos: la respuesta de Bienestar Universitario al derecho de petición y la
vigencia de los Centros de Escucha del Distrito.

## Integridad del hipertexto

`lib/verificar-contenido.ts` corre al importar el contenido y **rompe el build**
si:

- una palabra marcada apunta a una capa que no existe,
- una capa declarada no tiene ninguna palabra que la abra,
- una cifra cita una fuente que no está en el registro.

Un enlace interno roto no llega a producción en silencio.

## Accesibilidad

- Modo oscuro único, contraste AA o superior sobre `#0A0F1A`.
- Cuerpo a 18px con interlineado 1.75; nada por debajo de 17px.
- Panel de capas con `role="dialog"`, `aria-modal`, trampa de foco, cierre con
  Escape, clic fuera y botón visible. Al cerrar, el foco vuelve a la palabra que
  abrió la capa.
- Foco de teclado visible en todo el sitio y enlace para saltar a la crónica.
- HTML semántico: `article`, `section`, `aside`, `figure` con `figcaption`,
  tabla con `caption` y encabezados con `scope`.
- `prefers-reduced-motion` respetado.
- Sin `localStorage` y sin dependencias de UI externas.

## Participación y base de datos

El muro y la encuesta guardan en Supabase. **Nada toca Supabase desde el
navegador**: solo los Route Handlers `/api/muro` y `/api/encuesta`, con la
`service_role`. No existe ninguna variable `NEXT_PUBLIC_*`, las tablas tienen
RLS activo y cero políticas públicas.

Sin credenciales el sitio no se rompe: la participación vuelve a memoria y el
aviso al lector cambia para decir que nada se guarda.

### Puesta en marcha

```bash
cp .env.example .env.local   # y rellenar
npm run migrar               # crea las tablas
```

| Variable | Dónde sale | Para qué |
|---|---|---|
| `SUPABASE_URL` | Project Settings → Data API | Leer y escribir |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API Keys → `service_role` | Leer y escribir |
| `SUPABASE_DB_URL` | Project Settings → Database → Connection string (URI) | Solo `npm run migrar` |
| `MURO_MODERACION` | — | `true` (por defecto) o `false` |
| `MODERACION_CLAVE` | la inventas tú | Entrar a `/moderacion` |

En Vercel hay que definir todas menos `SUPABASE_DB_URL`. `SUPABASE_DB_URL`
es local: solo sirve para crear las tablas.

Las tablas llevan prefijo `madrugada_` porque comparten proyecto con otra
aplicación. Sin él, un borrado de mantenimiento ajeno se llevaría los aportes.

### Moderar

Los aportes entran como `pendiente`. La pieza trata de salud mental y lleva el
nombre de la autora: nada aparece en el muro sin que ella lo haya leído.

**Desde el navegador: `/moderacion`.** Pide la clave de `MODERACION_CLAVE` y
muestra lo que está en revisión, lo publicado y lo retirado, con un botón por
aporte. No necesita terminal, ni claves de Supabase, ni ver el resto de la base
de datos: es el camino pensado para la autora.

La página no se enlaza desde el sitio y pide no ser indexada. La sesión dura
doce horas en una cookie `httpOnly` firmada con la propia clave: no se puede
falsificar sin conocerla, y un token caducado no abre nada. La clave se compara
en tiempo constante y un intento fallido tarda siempre lo mismo, para que
probar claves a lo bruto sea incómodo.

**Desde la terminal**, si se prefiere:

```bash
npm run moderar                      # lista lo que está en revisión
npm run moderar -- aprobar <id>      # lo publica
npm run moderar -- aprobar todos
npm run moderar -- ocultar <id>      # lo retira sin borrarlo
npm run moderar -- publicados
```

`MURO_MODERACION=false` publica al instante, sin revisión.

### Privacidad

No se guarda la IP de nadie: se guarda un hash con sal secreta del servidor,
irreversible, que solo sirve para limitar a tres envíos por origen cada diez
minutos. El voto se identifica con una cookie `httpOnly` anónima. Los avisos
que ve el lector cambian según haya base de datos o no: nunca se anuncia una
permanencia que no existe.

## Entregables académicos

Todo lo que no es el sitio vive en `entregable/`, generado desde scripts para
poder rehacerlo cuando cambie un dato.

| Archivo | Cómo se genera |
|---|---|
| `ACA-turno-de-madrugada.docx` | `npm run word` |
| `turno-de-madrugada-gestion.xlsx` | `npm run excel` |
| `guion-lo-que-queda-del-dia.md` | Guion podado del Nodo 2, escrito a mano |

El documento de Word sigue la estructura exacta de la guía —portada, cinco
secciones y bibliografía— en formato APA, con las capturas del sitio publicado
incrustadas como evidencia. Lo que la autora debe completar va marcado en
amarillo dentro del propio documento: **no se inventa ninguna referencia
bibliográfica ni ningún dato de clase.**

## Libro de Excel del entregable

```bash
npm run excel   # -> entregable/turno-de-madrugada-gestion.xlsx
```

Cuatro hojas: resumen, presupuesto, cronograma y tablero de KPI con el IEC.

Las cifras viven en `scripts/excel/datos.mjs`, separadas del maquetado igual
que el contenido del sitio. Nada está escrito a mano en el libro: los 65
totales, porcentajes y el propio IEC son fórmulas vivas de Excel, enlazadas
entre hojas. Cambiar una partida del presupuesto actualiza el IEC.

**Las cifras del presupuesto son estimaciones pendientes de validar.** Son los
equipos y los gastos reales de la autora; nadie más puede confirmarlas. El
aviso está también dentro del libro, en amarillo.

El IEC se calcula así:

```
Valor de impacto = Alcance x 1  +  Engagement x 5  +  Conversion x 20
IEC              = Valor de impacto / Inversion total x 1.000
```

Los pesos están en `pesosIEC` y en celdas visibles del libro. Si en clase se
enseñó otra fórmula, se sustituye la celda del IEC y el resto sigue
calculando.

## Medición

Con el build de producción, no en desarrollo:

| | Móvil | Escritorio |
|---|---|---|
| Rendimiento | 98 | 100 |
| Accesibilidad | 100 | 100 |
| Buenas prácticas | 100 | 100 |
| SEO | 100 | 100 |

Se pide un solo peso por familia tipográfica: así Google sirve instancias
estáticas en lugar de las fuentes variables completas, y el total baja de 115 KB
a 68 KB. Es lo que más mueve el mayor elemento visible en conexiones lentas.

## Cobertura responsable

El tema es salud mental. La pieza no describe métodos de autolesión, no publica
testimonios inventados y no usa cifras sin fuente. Toda página termina con las
rutas de ayuda: **106** (línea nacional de salud mental, gratuita, 24 horas),
**123** (emergencias) y **155** (orientación a mujeres víctimas de violencia).
