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
| Tipografías | `next/font` (Inter Tight, Inter, JetBrains Mono), autoalojadas |
| Dependencias de UI | Ninguna |

Solo tres componentes llevan `"use client"`: el proveedor de capas, el
disparador y el panel, más la encuesta y el muro. Todo lo demás se renderiza en
el servidor, incluido el contenido de las cinco capas.

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

- Modo oscuro único, contraste AA o superior sobre `#0A0D12`.
- Cuerpo a 18px con interlineado 1.75; nada por debajo de 17px.
- Panel de capas con `role="dialog"`, `aria-modal`, trampa de foco, cierre con
  Escape, clic fuera y botón visible. Al cerrar, el foco vuelve a la palabra que
  abrió la capa.
- Foco de teclado visible en todo el sitio y enlace para saltar a la crónica.
- HTML semántico: `article`, `section`, `aside`, `figure` con `figcaption`,
  tabla con `caption` y encabezados con `scope`.
- `prefers-reduced-motion` respetado.
- Sin `localStorage` y sin dependencias de UI externas.

## Cobertura responsable

El tema es salud mental. La pieza no describe métodos de autolesión, no publica
testimonios inventados y no usa cifras sin fuente. Toda página termina con las
rutas de ayuda: **106** (línea nacional de salud mental, gratuita, 24 horas),
**123** (emergencias) y **155** (orientación a mujeres víctimas de violencia).
