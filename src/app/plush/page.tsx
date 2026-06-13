import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import PlushPricing from '@/components/sections/PlushPricing'
import Reviews from '@/components/sections/Reviews'
import FinalCTA from '@/components/sections/FinalCTA'

export const metadata = {
  title: 'Cuddlo Plush — Tu mascota en peluche',
  description:
    'Réplica artesanal de tu mascota en peluche premium. Aprueba el render antes de pagar. Desde 129€.',
}

export default function PlushPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <PlushPricing />
      <Reviews />
      <FinalCTA />
    </main>
  )
}
