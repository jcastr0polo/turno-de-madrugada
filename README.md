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
