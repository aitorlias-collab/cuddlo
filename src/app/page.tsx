import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomeHero from '@/components/sections/HomeHero'
import HomeProductLines from '@/components/sections/HomeProductLines'
import HomeHowItWorks from '@/components/sections/HomeHowItWorks'
import HomeFinalCTA from '@/components/sections/HomeFinalCTA'

export const metadata: Metadata = {
  title: 'Cuddlo — Personalización premium para tu mascota',
  description:
    'Peluches artesanales y ropa minimalista creados a partir de las fotos de tu mascota. Aprueba antes de pagar.',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <div className="h-px bg-[#C4A882]/30" />
        <HomeProductLines />
        <div className="h-px bg-[#C4A882]/30" />
        <HomeHowItWorks />
        <div className="h-px bg-[#C4A882]/30" />
        <HomeFinalCTA />
      </main>
      <Footer />
    </>
  )
}
