import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import Reviews from '@/components/sections/Reviews'
import FinalCTA from '@/components/sections/FinalCTA'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Reviews />
      <FinalCTA />
    </main>
  )
}
