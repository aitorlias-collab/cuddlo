import Navbar from '@/components/layout/Navbar'
import PricingContent from '@/components/sections/PricingContent'

export const metadata = {
  title: 'Precios — Cuddlo',
  description: 'Elige el Cuddlo perfecto para tu mascota. Sin pago hasta que apruebes el render.',
}

export default function PricingPage() {
  return (
    <main>
      <Navbar />
      <PricingContent />
    </main>
  )
}
