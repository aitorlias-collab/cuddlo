import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Privacy Policy — Cuddlo',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F5EFE6] min-h-screen pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">

          <a href="/" className="inline-flex items-center gap-2 text-sm text-[#8B5E3C]/70 hover:text-[#8B5E3C] transition-colors duration-150 mb-10">
            ← Back to home
          </a>

          <h1 className="font-serif font-bold text-[#2C1810] mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
            Privacy Policy
          </h1>
          <p className="text-sm text-[#2C1810]/50 mb-12">Last updated: June 2026</p>

          <div className="flex flex-col gap-10 text-[#2C1810]/80 leading-relaxed" style={{ fontSize: '1rem', lineHeight: '1.8' }}>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">1. Data controller</h2>
              <p>
                The data controller responsible for your personal data is <strong>Cuddlo</strong>,
                with tax ID <strong>[PENDING]</strong> and registered address at <strong>[PENDING]</strong>.
              </p>
              <p className="mt-3">
                You can contact us at any time at{' '}
                <a href="mailto:hello@cuddlo.pet" className="text-[#8B5E3C] underline">hello@cuddlo.pet</a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">2. Data we collect</h2>
              <p>As part of our service, we collect the following personal data:</p>
              <ul className="mt-3 ml-5 flex flex-col gap-2 list-disc">
                <li>First and last name</li>
                <li>Email address</li>
                <li>Photos of your pet (uploaded voluntarily for product creation)</li>
                <li>Shipping address</li>
                <li>Any additional contact details you provide during the ordering process</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">3. Purpose of processing</h2>
              <p>Your data is used exclusively to:</p>
              <ul className="mt-3 ml-5 flex flex-col gap-2 list-disc">
                <li>Process and manage your order</li>
                <li>Create and send you a digital render of your pet for approval</li>
                <li>Coordinate production and shipping once the render is approved</li>
                <li>Handle enquiries and complaints related to your order</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">4. Legal basis</h2>
              <p>
                The legal basis for processing your data is the <strong>performance of a contract</strong>{' '}
                (Art. 6.1.b GDPR): your data is necessary to provide the service you have requested.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">5. Data retention</h2>
              <p>
                We retain your personal data for the duration of the commercial relationship and,
                once it ends, for the legally required periods to address any potential liabilities
                or claims.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">6. Data sharing with third parties</h2>
              <p>
                We do not share your data with third parties except for service providers strictly
                necessary to fulfil your order:
              </p>
              <ul className="mt-3 ml-5 flex flex-col gap-2 list-disc">
                <li><strong>Shopify</strong> — order management and payment processing platform</li>
                <li><strong>Resend</strong> — transactional email delivery service</li>
                <li><strong>Cloudflare</strong> — image storage and web infrastructure</li>
              </ul>
              <p className="mt-3">
                All providers are bound by the same confidentiality obligations and only process
                data as instructed by us.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">7. Your rights</h2>
              <p>Under the GDPR and applicable data protection law, you have the right to:</p>
              <ul className="mt-3 ml-5 flex flex-col gap-2 list-disc">
                <li><strong>Access</strong> — know what data we hold about you</li>
                <li><strong>Rectification</strong> — correct inaccurate or incomplete data</li>
                <li><strong>Erasure</strong> — request deletion of your data ("right to be forgotten")</li>
                <li><strong>Data portability</strong> — receive your data in a structured format</li>
                <li><strong>Objection and restriction</strong> of processing in cases provided by law</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, write to us at{' '}
                <a href="mailto:hello@cuddlo.pet" className="text-[#8B5E3C] underline">hello@cuddlo.pet</a>.
                We will respond within one month.
              </p>
              <p className="mt-3">
                You also have the right to lodge a complaint with the relevant data protection
                authority in your country of residence.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
