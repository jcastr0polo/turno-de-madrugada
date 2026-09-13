import { transparencia } from '@/content/fuentes'
import type { Consentimiento } from '@/content/types'

const rotuloConsentimiento: Record<Consentimiento, string> = {
  'fuente-publica': 'Fuente pública',
  autoconsentimiento: 'Autoconsentimiento',
  'constancia-de-radicado': 'Constancia de radicado',
  otorgado: 'Otorgado',
  'otorgado-con-reserva': 'Otorgado con reserva de nombre',
  pendiente: 'Pendiente',
}

/** Tabla pública de fuentes: qué aportó cada una, cómo se contrastó y con qué consentimiento. */
export function ComoSeHizo() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[44rem] border-collapse text-left">
        <caption className="sr-only">
          Fuentes utilizadas en la crónica, con su aporte, el contraste realizado y el estado del
          consentimiento.
        </caption>
        <thead>
          <tr className="border-b border-borde">
            {['Fuente', 'Tipo de aporte', 'Contraste realizado', 'Consentimiento'].map((titulo) => (
              <th
                key={titulo}
                scope="col"
                className="py-3 pr-6 font-mono text-meta font-normal tracking-[0.12em] text-acento uppercase"
              >
                {titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transparencia.map((fila) => (
            <tr key={fila.id} className="border-b border-borde align-top">
              <th
                scope="row"
                className="py-5 pr-6 text-[0.9375rem] leading-[1.6] font-normal text-texto"
              >
                {fila.fuente}
              </th>
              <td className="py-5 pr-6 text-[0.9375rem] leading-[1.6] text-apagado">
                {fila.aporte}
              </td>
              <td className="py-5 pr-6 text-[0.9375rem] leading-[1.6] text-apagado">
                {fila.contraste}
              </td>
              <td className="py-5 pr-6">
                <span className="font-mono text-meta whitespace-nowrap text-apagado">
                  {rotuloConsentimiento[fila.consentimiento]}
                </span>
                {fila.estado !== 'verificado' && (
                  <span className="mt-2 block font-mono text-meta whitespace-nowrap text-acento">
                    {fila.estado === 'pendiente' ? '[PENDIENTE]' : '[POR CONFIRMAR]'}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
