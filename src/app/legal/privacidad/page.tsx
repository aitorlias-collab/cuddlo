import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Política de Privacidad — Cuddlo',
}

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F5EFE6] min-h-screen pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">

          <a href="/" className="inline-flex items-center gap-2 text-sm text-[#8B5E3C]/70 hover:text-[#8B5E3C] transition-colors duration-150 mb-10">
            ← Volver al inicio
          </a>

          <h1 className="font-serif font-bold text-[#2C1810] mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
            Política de Privacidad
          </h1>
          <p className="text-sm text-[#2C1810]/50 mb-12">Última actualización: junio de 2026</p>

          <div className="flex flex-col gap-10 text-[#2C1810]/80 leading-relaxed" style={{ fontSize: '1rem', lineHeight: '1.8' }}>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">1. Responsable del tratamiento</h2>
              <p>
                El responsable del tratamiento de tus datos personales es <strong>Cuddlo</strong>,
                con NIF <strong>[PENDIENTE]</strong> y domicilio en <strong>[PENDIENTE]</strong>.
              </p>
              <p className="mt-3">
                Puedes contactarnos en cualquier momento a través de{' '}
                <a href="mailto:hello@cuddlo.pet" className="text-[#8B5E3C] underline">hello@cuddlo.pet</a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">2. Datos que recogemos</h2>
              <p>En el marco de nuestra actividad, recopilamos los siguientes datos personales:</p>
              <ul className="mt-3 ml-5 flex flex-col gap-2 list-disc">
                <li>Nombre y apellidos</li>
                <li>Dirección de correo electrónico</li>
                <li>Fotos de tu mascota (subidas voluntariamente para la creación del producto)</li>
                <li>Dirección de envío postal</li>
                <li>Datos de contacto adicionales que nos facilites durante el proceso de pedido</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">3. Finalidad del tratamiento</h2>
              <p>Tus datos se utilizan exclusivamente para:</p>
              <ul className="mt-3 ml-5 flex flex-col gap-2 list-disc">
                <li>Gestionar y procesar tu pedido</li>
                <li>Crear y enviarte el render digital de tu mascota para su aprobación</li>
                <li>Coordinar la producción y el envío del producto una vez aprobado</li>
                <li>Atender consultas y reclamaciones relacionadas con tu pedido</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">4. Base legal</h2>
              <p>
                La base legal para el tratamiento de tus datos es la <strong>ejecución de un contrato</strong>{' '}
                (Art. 6.1.b RGPD): los datos son necesarios para poder prestarte el servicio que has solicitado.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">5. Conservación de los datos</h2>
              <p>
                Conservamos tus datos personales durante el tiempo que dure la relación comercial y,
                una vez finalizada, durante los plazos legalmente exigibles para atender posibles
                responsabilidades o reclamaciones.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">6. Cesión de datos a terceros</h2>
              <p>
                No cedemos tus datos a terceros salvo a los proveedores de servicios estrictamente
                necesarios para ejecutar tu pedido:
              </p>
              <ul className="mt-3 ml-5 flex flex-col gap-2 list-disc">
                <li><strong>Shopify</strong> — plataforma de gestión de pedidos y pagos</li>
                <li><strong>Resend</strong> — servicio de envío de correos electrónicos transaccionales</li>
                <li><strong>Cloudflare</strong> — almacenamiento de imágenes e infraestructura web</li>
              </ul>
              <p className="mt-3">
                Todos los proveedores están sujetos a las mismas obligaciones de confidencialidad
                y sólo tratan los datos en los términos que les indicamos.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">7. Tus derechos</h2>
              <p>De acuerdo con el RGPD y la normativa española de protección de datos, tienes derecho a:</p>
              <ul className="mt-3 ml-5 flex flex-col gap-2 list-disc">
                <li><strong>Acceso</strong> — conocer qué datos tuyos tratamos</li>
                <li><strong>Rectificación</strong> — corregir datos inexactos o incompletos</li>
                <li><strong>Supresión</strong> — solicitar la eliminación de tus datos («derecho al olvido»)</li>
                <li><strong>Portabilidad</strong> — recibir tus datos en formato estructurado</li>
                <li><strong>Oposición y limitación</strong> del tratamiento en los casos previstos por la ley</li>
              </ul>
              <p className="mt-3">
                Para ejercer cualquiera de estos derechos, escríbenos a{' '}
                <a href="mailto:hello@cuddlo.pet" className="text-[#8B5E3C] underline">hello@cuddlo.pet</a>.
                Responderemos en el plazo máximo de un mes.
              </p>
              <p className="mt-3">
                También tienes derecho a presentar una reclamación ante la{' '}
                <strong>Agencia Española de Protección de Datos (AEPD)</strong> si consideras que
                el tratamiento de tus datos no es adecuado.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
