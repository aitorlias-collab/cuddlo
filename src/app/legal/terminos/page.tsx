import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Términos y Condiciones — Cuddlo',
}

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F5EFE6] min-h-screen pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">

          <a href="/" className="inline-flex items-center gap-2 text-sm text-[#8B5E3C]/70 hover:text-[#8B5E3C] transition-colors duration-150 mb-10">
            ← Volver al inicio
          </a>

          <h1 className="font-serif font-bold text-[#2C1810] mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
            Términos y Condiciones
          </h1>
          <p className="text-sm text-[#2C1810]/50 mb-12">Última actualización: junio de 2026</p>

          <div className="flex flex-col gap-10 text-[#2C1810]/80 leading-relaxed" style={{ fontSize: '1rem', lineHeight: '1.8' }}>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">1. Titular del servicio</h2>
              <p>
                El presente sitio web y el servicio de personalización de productos es prestado por{' '}
                <strong>Cuddlo</strong>, con NIF <strong>[PENDIENTE]</strong> y domicilio en{' '}
                <strong>[PENDIENTE]</strong>. Contacto:{' '}
                <a href="mailto:hello@cuddlo.pet" className="text-[#8B5E3C] underline">hello@cuddlo.pet</a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">2. Proceso de compra</h2>
              <p>El proceso de compra en Cuddlo sigue los siguientes pasos:</p>
              <ol className="mt-3 ml-5 flex flex-col gap-3 list-decimal">
                <li>
                  <strong>Envío de fotos:</strong> el cliente sube entre 3 y 8 fotos claras de su mascota
                  desde distintos ángulos.
                </li>
                <li>
                  <strong>Creación del render:</strong> en un plazo máximo de 48 horas, Cuddlo envía
                  al cliente un render digital del producto para su revisión.
                </li>
                <li>
                  <strong>Aprobación:</strong> el cliente revisa el render y puede solicitar ajustes sin
                  coste adicional antes de confirmar. <strong>No se realiza ningún pago hasta este momento.</strong>
                </li>
                <li>
                  <strong>Confirmación y pago:</strong> una vez el cliente aprueba el render, confirma
                  el pedido y realiza el pago.
                </li>
                <li>
                  <strong>Producción y envío:</strong> tras la confirmación, se inicia la producción
                  del producto, que se envía al domicilio indicado.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">3. Precios</h2>
              <p>
                Todos los precios publicados en nuestra web están expresados en euros (€) e incluyen
                el IVA aplicable según la legislación española vigente.
              </p>
              <p className="mt-3">
                Cuddlo se reserva el derecho a modificar los precios en cualquier momento, si bien
                los cambios no afectarán a pedidos ya confirmados.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">4. Envíos</h2>
              <div className="mt-3 overflow-x-auto rounded-xl border border-[#C4A882]/40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EDE3D8] text-left">
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Destino</th>
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Coste</th>
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Plazo estimado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#C4A882]/20">
                      <td className="px-5 py-3">España peninsular y Baleares</td>
                      <td className="px-5 py-3 font-semibold text-[#8B5E3C]">4,99 €</td>
                      <td className="px-5 py-3">Wear: 7–10 días hábiles · Plush: 3–4 semanas</td>
                    </tr>
                    <tr className="border-t border-[#C4A882]/20 bg-[#FAF7F3]">
                      <td className="px-5 py-3">Europa</td>
                      <td className="px-5 py-3 font-semibold text-[#8B5E3C]">9,99 €</td>
                      <td className="px-5 py-3">Wear: 7–10 días hábiles · Plush: 3–4 semanas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-[#2C1810]/60">
                Los plazos se cuentan a partir de la confirmación del pedido (aprobación del render).
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">5. Política de devoluciones</h2>

              <div className="bg-[#8B5E3C]/8 border border-[#8B5E3C]/20 rounded-xl p-5 mb-5" style={{ backgroundColor: 'rgba(139,94,60,0.06)' }}>
                <p className="font-semibold text-[#2C1810] mb-2">
                  Productos personalizados — excepción al derecho de desistimiento
                </p>
                <p className="text-sm">
                  De conformidad con el artículo 103.c del Real Decreto Legislativo 1/2007, de 16 de
                  noviembre, por el que se aprueba el Texto Refundido de la Ley General para la Defensa
                  de los Consumidores y Usuarios, <strong>los productos personalizados están excluidos del
                  derecho de desistimiento</strong>, ya que se elaboran conforme a las especificaciones del
                  consumidor.
                </p>
              </div>

              <p>
                Dado que el cliente <strong>aprueba expresamente el render antes de realizar el pago</strong>,
                una vez confirmado el pedido no se aceptarán devoluciones por motivos estéticos o de
                preferencia personal.
              </p>

              <p className="mt-4 font-semibold text-[#2C1810]">Excepción: producto defectuoso o dañado</p>
              <p className="mt-2">
                Si el producto recibido presenta defectos de fabricación o daños en el transporte,
                el cliente tendrá derecho a la <strong>reposición gratuita del producto</strong> o al
                <strong> reembolso íntegro del importe pagado</strong>, a su elección.
              </p>
              <p className="mt-3">
                Para ejercer este derecho, el cliente deberá contactarnos en{' '}
                <a href="mailto:hello@cuddlo.pet" className="text-[#8B5E3C] underline">hello@cuddlo.pet</a>{' '}
                en un plazo máximo de <strong>48 horas</strong> desde la recepción del pedido,
                adjuntando fotografías del producto y del embalaje.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">6. Ley aplicable y jurisdicción</h2>
              <p>
                Los presentes términos y condiciones se rigen por la legislación española. Para
                cualquier controversia derivada del uso de este sitio web o de los servicios prestados,
                las partes se someten, con renuncia expresa a cualquier otro fuero, a los Juzgados y
                Tribunales del domicilio del consumidor, de conformidad con la normativa de protección
                al consumidor aplicable.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">7. Contacto</h2>
              <p>
                Para cualquier consulta relacionada con estos términos, puedes escribirnos a{' '}
                <a href="mailto:hello@cuddlo.pet" className="text-[#8B5E3C] underline">hello@cuddlo.pet</a>.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
