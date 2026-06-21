import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WearContent from '@/components/sections/WearContent'

export const metadata = {
  title: 'Cuddlo Wear — Tu mascota en tu ropa',
  description: 'Ropa premium minimalista con la ilustración personalizada de tu mascota. Camisetas, sudaderas y tote bags. Impreso o bordado.',
}

export default function WearPage() {
  return (
    <main>
      <Navbar />
      <WearContent />
      <Footer />
    </main>
  )
}
