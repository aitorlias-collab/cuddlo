import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Terms & Conditions — Cuddlo',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F5EFE6] min-h-screen pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">

          <a href="/" className="inline-flex items-center gap-2 text-sm text-[#8B5E3C]/70 hover:text-[#8B5E3C] transition-colors duration-150 mb-10">
            ← Back to home
          </a>

          <h1 className="font-serif font-bold text-[#2C1810] mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
            Terms & Conditions
          </h1>
          <p className="text-sm text-[#2C1810]/50 mb-12">Last updated: June 2026</p>

          <div className="flex flex-col gap-10 text-[#2C1810]/80 leading-relaxed" style={{ fontSize: '1rem', lineHeight: '1.8' }}>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">1. Service provider</h2>
              <p>
                This website and personalisation service is operated by <strong>Cuddlo</strong>,
                with tax ID <strong>[PENDING]</strong> and registered address at{' '}
                <strong>[PENDING]</strong>. Contact:{' '}
                <a href="mailto:hello@cuddlo.pet" className="text-[#8B5E3C] underline">hello@cuddlo.pet</a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">2. Purchase process</h2>
              <p>The Cuddlo purchase process follows these steps:</p>
              <ol className="mt-3 ml-5 flex flex-col gap-3 list-decimal">
                <li>
                  <strong>Photo upload:</strong> the customer uploads 3 to 8 clear photos of their
                  pet from different angles.
                </li>
                <li>
                  <strong>Render creation:</strong> within 48 hours, Cuddlo sends the customer a
                  digital render of the product for review.
                </li>
                <li>
                  <strong>Approval:</strong> the customer reviews the render and may request
                  adjustments at no extra cost before confirming.{' '}
                  <strong>No payment is taken until this point.</strong>
                </li>
                <li>
                  <strong>Confirmation and payment:</strong> once the customer approves the render,
                  they confirm the order and complete payment.
                </li>
                <li>
                  <strong>Production and shipping:</strong> after confirmation, production begins
                  and the product is shipped to the provided address.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">3. Pricing</h2>
              <p>
                All prices shown on our website are in euros (€) and include VAT in accordance
                with applicable Spanish tax law.
              </p>
              <p className="mt-3">
                Cuddlo reserves the right to change prices at any time, though changes will not
                affect already confirmed orders.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">4. Shipping</h2>
              <div className="mt-3 overflow-x-auto rounded-xl border border-[#C4A882]/40">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EDE3D8] text-left">
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Destination</th>
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Cost</th>
                      <th className="px-5 py-3 font-semibold text-[#2C1810]">Estimated delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#C4A882]/20">
                      <td className="px-5 py-3">Spain (mainland + Balearics)</td>
                      <td className="px-5 py-3 font-semibold text-[#8B5E3C]">€4.99</td>
                      <td className="px-5 py-3">Wear: 7–10 business days · Plush: 3–4 weeks</td>
                    </tr>
                    <tr className="border-t border-[#C4A882]/20 bg-[#FAF7F3]">
                      <td className="px-5 py-3">Europe</td>
                      <td className="px-5 py-3 font-semibold text-[#8B5E3C]">€9.99</td>
                      <td className="px-5 py-3">Wear: 7–10 business days · Plush: 3–4 weeks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-[#2C1810]/60">
                Delivery times are counted from order confirmation (render approval).
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">5. Returns policy</h2>

              <div className="rounded-xl p-5 mb-5 border border-[#8B5E3C]/20" style={{ backgroundColor: 'rgba(139,94,60,0.06)' }}>
                <p className="font-semibold text-[#2C1810] mb-2">
                  Personalised products — withdrawal right exclusion
                </p>
                <p className="text-sm">
                  In accordance with Article 103(c) of Royal Legislative Decree 1/2007 (Spanish
                  Consumer Protection Law),{' '}
                  <strong>personalised products are excluded from the right of withdrawal</strong>,
                  as they are made to the consumer&apos;s specifications.
                </p>
              </div>

              <p>
                Since the customer <strong>expressly approves the render before making any payment</strong>,
                once the order is confirmed no returns will be accepted on aesthetic or personal
                preference grounds.
              </p>

              <p className="mt-4 font-semibold text-[#2C1810]">Exception: defective or damaged products</p>
              <p className="mt-2">
                If the product received is defective or damaged in transit, the customer is entitled
                to a <strong>free replacement</strong> or a <strong>full refund</strong>, at their
                choice.
              </p>
              <p className="mt-3">
                To exercise this right, the customer must contact us at{' '}
                <a href="mailto:hello@cuddlo.pet" className="text-[#8B5E3C] underline">hello@cuddlo.pet</a>{' '}
                within <strong>48 hours</strong> of receiving the order, including photos of the
                product and packaging.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">6. Governing law and jurisdiction</h2>
              <p>
                These terms and conditions are governed by Spanish law. For any disputes arising from
                the use of this website or the services provided, the parties submit to the courts
                of the consumer&apos;s place of residence, in accordance with applicable consumer
                protection legislation.
              </p>
            </section>

            <section>
              <h2 className="font-serif font-semibold text-[#8B5E3C] text-xl mb-4">7. Contact</h2>
              <p>
                For any questions about these terms, please write to us at{' '}
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
