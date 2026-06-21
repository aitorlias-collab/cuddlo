import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Política de Cookies — Cuddlo',
}

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F5EFE6] min-h-screen pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">

          <a href="/" className="inline-flex items-center gap-2 text-sm text-[#8B5E3C]/70 hover:text-[#8B5E3C] transition-colors duration-150 mb-10">
            ← Volver al inicio
          </a>

          <h1 className="font-serif font-bold text-[#2C1810] mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
            Política de Cookies
          </h1>
          <p className="text-sm text-[#2C1810]/50 mb-12">Última actualización: junio de 2026</p>

          <div className="flex flex-col gap-10 text-[#2C1810]/80 leading-relaxed" style={{ fontSize: '1rem', lineHeight: '1.8' }}>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">¿Qué son las cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web almacenan en tu
                navegador cuando los visitas. Sirven para recordar tus preferencias, mantener tu
                sesión activa y mejorar tu experiencia de navegación.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">Cookies propias</h2>
              <p>Cuddlo utiliza las siguientes cookies propias, estrictamente necesarias para el funcionamiento del sitio:</p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-[#C4A882]/40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EDE3D8] text-left">
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Cookie</th>
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Finalidad</th>
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#C4A882]/20">
                      <td className="px-5 py-3 font-medium">Sesión</td>
                      <td className="px-5 py-3">Mantener activa tu sesión mientras navegas</td>
                      <td className="px-5 py-3">Sesión</td>
                    </tr>
                    <tr className="border-t border-[#C4A882]/20 bg-[#FAF7F3]">
                      <td className="px-5 py-3 font-medium">cuddlo_cart</td>
                      <td className="px-5 py-3">Guardar el contenido de tu carrito de compra</td>
                      <td className="px-5 py-3">7 días</td>
                    </tr>
                    <tr className="border-t border-[#C4A882]/20">
                      <td className="px-5 py-3 font-medium">cuddlo_lang</td>
                      <td className="px-5 py-3">Recordar tu preferencia de idioma</td>
                      <td className="px-5 py-3">Persistente</td>
                    </tr>
                    <tr className="border-t border-[#C4A882]/20 bg-[#FAF7F3]">
                      <td className="px-5 py-3 font-medium">cuddlo_cookies</td>
                      <td className="px-5 py-3">Registrar que has aceptado esta política de cookies</td>
                      <td className="px-5 py-3">1 año</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">Cookies de terceros</h2>
              <p>Algunos de nuestros proveedores de servicio pueden establecer sus propias cookies:</p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-[#C4A882]/40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EDE3D8] text-left">
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Proveedor</th>
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Finalidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#C4A882]/20">
                      <td className="px-5 py-3 font-medium">Shopify</td>
                      <td className="px-5 py-3">Gestión del proceso de checkout y carrito de compra</td>
                    </tr>
                    <tr className="border-t border-[#C4A882]/20 bg-[#FAF7F3]">
                      <td className="px-5 py-3 font-medium">Cloudflare</td>
                      <td className="px-5 py-3">Seguridad web y protección contra ataques</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[#2C1810]/60 text-sm">
                En este momento no utilizamos cookies de publicidad ni de analítica de terceros.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">Cómo desactivar las cookies</h2>
              <p className="mb-5">
                Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que
                desactivar cookies estrictamente necesarias puede afectar al funcionamiento del sitio.
              </p>

              <div className="flex flex-col gap-4">
                <div className="bg-white/60 rounded-xl p-5 border border-[#C4A882]/30">
                  <p className="font-semibold text-[#2C1810] mb-1">Google Chrome</p>
                  <p className="text-sm text-[#2C1810]/65">
                    Configuración → Privacidad y seguridad → Cookies y otros datos de sitios
                  </p>
                </div>
                <div className="bg-white/60 rounded-xl p-5 border border-[#C4A882]/30">
                  <p className="font-semibold text-[#2C1810] mb-1">Mozilla Firefox</p>
                  <p className="text-sm text-[#2C1810]/65">
                    Opciones → Privacidad y seguridad → Cookies y datos del sitio
                  </p>
                </div>
                <div className="bg-white/60 rounded-xl p-5 border border-[#C4A882]/30">
                  <p className="font-semibold text-[#2C1810] mb-1">Safari</p>
                  <p className="text-sm text-[#2C1810]/65">
                    Preferencias → Privacidad → Gestionar datos del sitio web
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">Banner de cookies</h2>
              <p>
                Al acceder a nuestra web por primera vez, mostramos un banner de cookies donde puedes
                aceptar o rechazar el uso de cookies no esenciales. Tu elección se guarda en el
                dispositivo durante un año.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
