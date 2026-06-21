import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Cookie Policy — Cuddlo',
}

export default function CookiesEnPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F5EFE6] min-h-screen pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">

          <a href="/" className="inline-flex items-center gap-2 text-sm text-[#8B5E3C]/70 hover:text-[#8B5E3C] transition-colors duration-150 mb-10">
            ← Back to home
          </a>

          <h1 className="font-serif font-bold text-[#2C1810] mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
            Cookie Policy
          </h1>
          <p className="text-sm text-[#2C1810]/50 mb-12">Last updated: June 2026</p>

          <div className="flex flex-col gap-10 text-[#2C1810]/80 leading-relaxed" style={{ fontSize: '1rem', lineHeight: '1.8' }}>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">What are cookies?</h2>
              <p>
                Cookies are small text files that websites store on your browser when you visit them.
                They are used to remember your preferences, keep your session active, and improve
                your browsing experience.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">First-party cookies</h2>
              <p>Cuddlo uses the following first-party cookies, strictly necessary for the site to function:</p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-[#C4A882]/40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EDE3D8] text-left">
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Cookie</th>
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Purpose</th>
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#C4A882]/20">
                      <td className="px-5 py-3 font-medium">Session</td>
                      <td className="px-5 py-3">Keep your session active while you browse</td>
                      <td className="px-5 py-3">Session</td>
                    </tr>
                    <tr className="border-t border-[#C4A882]/20 bg-[#FAF7F3]">
                      <td className="px-5 py-3 font-medium">cuddlo_cart</td>
                      <td className="px-5 py-3">Save the contents of your shopping cart</td>
                      <td className="px-5 py-3">7 days</td>
                    </tr>
                    <tr className="border-t border-[#C4A882]/20">
                      <td className="px-5 py-3 font-medium">cuddlo_lang</td>
                      <td className="px-5 py-3">Remember your language preference</td>
                      <td className="px-5 py-3">Persistent</td>
                    </tr>
                    <tr className="border-t border-[#C4A882]/20 bg-[#FAF7F3]">
                      <td className="px-5 py-3 font-medium">cuddlo_cookies</td>
                      <td className="px-5 py-3">Record that you have accepted this cookie policy</td>
                      <td className="px-5 py-3">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">Third-party cookies</h2>
              <p>Some of our service providers may set their own cookies:</p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-[#C4A882]/40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EDE3D8] text-left">
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Provider</th>
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#C4A882]/20">
                      <td className="px-5 py-3 font-medium">Shopify</td>
                      <td className="px-5 py-3">Managing the checkout process and shopping cart</td>
                    </tr>
                    <tr className="border-t border-[#C4A882]/20 bg-[#FAF7F3]">
                      <td className="px-5 py-3 font-medium">Cloudflare</td>
                      <td className="px-5 py-3">Web security and protection against attacks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[#2C1810]/60 text-sm">
                We do not currently use any advertising or third-party analytics cookies.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">How to disable cookies</h2>
              <p className="mb-5">
                You can configure your browser to block or delete cookies. Please note that
                disabling strictly necessary cookies may affect how the site works.
              </p>

              <div className="flex flex-col gap-4">
                <div className="bg-white/60 rounded-xl p-5 border border-[#C4A882]/30">
                  <p className="font-semibold text-[#2C1810] mb-1">Google Chrome</p>
                  <p className="text-sm text-[#2C1810]/65">
                    Settings → Privacy and security → Cookies and other site data
                  </p>
                </div>
                <div className="bg-white/60 rounded-xl p-5 border border-[#C4A882]/30">
                  <p className="font-semibold text-[#2C1810] mb-1">Mozilla Firefox</p>
                  <p className="text-sm text-[#2C1810]/65">
                    Options → Privacy & Security → Cookies and Site Data
                  </p>
                </div>
                <div className="bg-white/60 rounded-xl p-5 border border-[#C4A882]/30">
                  <p className="font-semibold text-[#2C1810] mb-1">Safari</p>
                  <p className="text-sm text-[#2C1810]/65">
                    Preferences → Privacy → Manage Website Data
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">Cookie banner</h2>
              <p>
                When you first visit our website, we display a cookie banner where you can accept
                or decline non-essential cookies. Your choice is saved on your device for one year.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
