import type { Cronica } from './types'

/**
 * Texto de la crónica, verbatim. Los antetítulos son documentales y no llevan
 * marca horaria: las horas son la columna vertebral del episodio de audio.
 *
 * Cada objeto { t: 'capa' } es una palabra marcada que abre una capa.
 * Hay exactamente cinco, una por capa. `lib/verificar-contenido.ts` falla el
 * build si alguna apunta a una capa inexistente.
 */
export const cronica: Cronica = {
  bloques: [
    {
      id: 'lo-que-no-se-ve',
      antetitulo: { marca: 'La una de la mañana', nota: 'Lo que no se ve' },
      parrafos: [
        {
          t: 'p',
          contenido: [
            'A esta hora la casa por fin está callada. El ventilador gira moviendo aire caliente de un lado del cuarto al otro, que es lo único que sabe hacer, y yo abro la plataforma de la universidad para empezar, apenas ahora, lo que en cualquier otro horario se llamaría estudiar.',
          ],
        },
        {
          t: 'p',
          contenido: [
            'Llevo diecisiete horas despierta. Ninguna de esas horas estuvo libre y ninguna, tampoco, cuenta como trabajo.',
          ],
        },
        {
          t: 'p',
          contenido: [
            'Esa frase suena a queja y no lo es. Es una descripción técnica, y en las próximas líneas voy a demostrarla con documentos públicos. Porque lo que me pasa a mí tiene un nombre en las cuentas nacionales de Colombia, tiene un valor en pesos y tiene una ley que obligó a medirlo. Lo que no tiene es ',
            { t: 'capa', texto: 'un lugar donde aparezca esta hora', capa: 'glosario', ancla: 'tercera-jornada' },
            '.',
          ],
        },
        {
          t: 'apunte',
          contenido: [
            'La versión larga de esta jornada, contada hora por hora y en voz, está en el episodio de audio. Aquí no se repite: aquí se prueba.',
          ],
        },
      ],
    },
    {
      id: 'la-cuenta',
      antetitulo: { marca: 'La cuenta', nota: 'Lo que el país sí mide' },
      parrafos: [
        { t: 'p', contenido: ['Empecemos por lo que hago antes de sentarme.'] },
        {
          t: 'p',
          contenido: [
            'Cocinar, lavar, organizar, dejar a alguien listo, atender a quien se enferma, sostener el ánimo de una casa entera. Eso se llama trabajo doméstico y de cuidado no remunerado, y en Colombia no es una categoría de opinión: es una categoría estadística. La Ley 1413 de 2010 obligó al Estado a incluirlo en el sistema de cuentas nacionales.',
          ],
        },
        {
          t: 'p',
          contenido: [
            'El DANE hizo esa cuenta. Con datos de 2024, ',
            { t: 'capa', texto: 'ese trabajo vale 340,5 billones de pesos', capa: 'datos', ancla: 'valor-cuidado' },
            ': el 19,9 % del producto interno bruto. Más que el comercio. Más que toda la industria manufacturera. Son 44.326 millones de horas al año, y las mujeres ponemos el 75,9 % de ellas.',
          ],
        },
        {
          t: 'p',
          contenido: [
            'Léase despacio lo que eso significa. El Estado sabe cuánto vale lo que yo hice hoy antes de las once de la noche. Lo sabe con cifra, con porcentaje y con decimales. Lo publica y lo actualiza.',
          ],
        },
        {
          t: 'p',
          contenido: [
            'Y con esa cuenta ya hecha, mi día sigue sin ser trabajo para ningún otro efecto: no genera ingreso, no cotiza, no da incapacidad, no da pensión.',
          ],
        },
      ],
    },
    {
      id: 'la-norma',
      antetitulo: { marca: 'La norma', nota: 'Lo que vale una hora de noche' },
      parrafos: [
        { t: 'p', contenido: ['Hay una segunda medición que conviene poner al lado de la primera.'] },
        {
          t: 'p',
          contenido: [
            { t: 'capa', texto: 'Desde 2025 la jornada nocturna en Colombia empieza a las siete de la noche', capa: 'contexto', ancla: 'ley-2466' },
            '. Cada hora trabajada entre esa hora y las seis de la mañana genera recargo. Alguien se sentó a hacer el cálculo y concluyó que la noche desgasta distinto y que ese desgaste vale plata.',
          ],
        },
        {
          t: 'p',
          contenido: [
            'Yo a la una de la mañana no estoy trabajando, estoy estudiando, y no me corresponde ningún recargo. Eso está bien y no lo discuto.',
          ],
        },
        {
          t: 'p',
          contenido: [
            'Lo que sí quiero poner sobre la mesa es la suma completa. Hay una jornada que la ley reconoce y paga. Hay una segunda que la ley mide y no paga. Y hay una tercera, la que estoy usando ahora mismo, que no está en ninguna de las dos cuentas: no aparece en el sistema de cuentas nacionales, no aparece en el Código Sustantivo del Trabajo y no aparece en el reglamento estudiantil.',
          ],
        },
        {
          t: 'p',
          contenido: [
            'No hay aquí una ilegalidad que denunciar. Hay un vacío, y el vacío tiene consecuencias concretas cuando algo se rompe.',
          ],
        },
      ],
    },
    {
      id: 'la-casilla-vacia',
      antetitulo: { marca: 'La casilla vacía', nota: 'A quién se llama a las tres' },
      parrafos: [
        {
          t: 'p',
          contenido: [
            'Hay noches en que uno deja de estudiar y se queda mirando la pantalla sin que haya pasado nada. No es enfermedad y no me voy a autodiagnosticar: es cansancio. Pero no sé en qué momento una cosa se convierte en la otra, y a esa hora no tengo a quién preguntarle.',
          ],
        },
        {
          t: 'p',
          contenido: [
            'Para un estudiante presencial existe, al menos, un edificio. Para mí, que estudio virtual, Bienestar Universitario es un correo y un formulario, y un correo no contesta a las tres y cuarenta y siete de la mañana.',
          ],
        },
        {
          t: 'p',
          contenido: ['Queda entonces el teléfono. Y ahí aparece el dato que ordena toda esta crónica.'],
        },
        {
          t: 'p',
          contenido: [
            'El Ministerio de Salud publica un directorio nacional con las líneas de atención en salud mental de cada departamento. Es un documento público. En la casilla del Magdalena, la versión de agosto de 2025 dice ',
            { t: 'capa', texto: 'que no cuenta con línea activa', capa: 'ayuda', ancla: 'magdalena' },
            '. El Atlántico sí tiene. La Guajira tiene la Línea de la Esperanza.',
          ],
        },
        {
          t: 'p',
          contenido: [
            'Eso no significa que en el departamento no exista atención en salud mental, y no lo voy a afirmar porque no es cierto. Significa algo más pequeño y más concreto: que no hay un número local de escucha inmediata, y que la primera puerta a esa hora es la línea nacional 106.',
          ],
        },
        {
          t: 'p',
          contenido: [
            'Yo no me la sabía. Ese es el punto. Estudio comunicación, hice este trabajo, leí las leyes, y no me sabía el número.',
          ],
        },
        {
          t: 'p',
          contenido: [
            'Le pedí por escrito a Bienestar Universitario tres datos: cuánto tarda en promedio una cita, si existe un protocolo para las crisis fuera del horario de atención, y dónde está publicado el número que sí atiende de madrugada. ',
            { t: 'capa', texto: 'La solicitud está radicada', capa: 'metodo', ancla: 'radicado' },
            ' y la ley le da quince días hábiles para responder, así que la respuesta llegará después de que esta crónica se publique. Cuando llegue, va a aparecer aquí.',
          ],
        },
        {
          t: 'p',
          contenido: [
            'Mientras tanto, lo que le pido a mi universidad no es que abra de noche, porque sé que eso no se puede pagar. Le pido tres cosas más baratas: que el 106 esté publicado en la plataforma, que es el único lugar donde entro todos los días; que exista un protocolo escrito para cuando alguien se quiebra fuera del horario; y que cuando programen una entrega a las 11:59 de la noche, sepan quién la está haciendo del otro lado de la pantalla.',
          ],
        },
      ],
    },
  ],
  // Reportería anunciada en el propio texto y todavía abierta. Se declara como
  // pendiente en lugar de rellenarse: cuando llegue la respuesta, se escribe aquí.
  actualizacionPendiente: {
    titulo: 'Respuesta de Bienestar Universitario CUN',
    texto:
      'Derecho de petición radicado el 7 de septiembre de 2026 sobre tiempos de espera, protocolo de crisis fuera del horario de atención y publicación del número que atiende de madrugada. El término legal de respuesta es de quince días hábiles. La respuesta se publicará en este mismo lugar.',
  },
}
