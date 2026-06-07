import Navbar from '@/components/layout/Navbar'
import ConfirmContent from '@/components/sections/ConfirmContent'

export const metadata = {
  title: 'Pedido recibido — Cuddlo',
  description: 'Tu pedido está en marcha. Recibirás el render de tu Cuddlo en menos de 48 horas.',
}

export default function ConfirmPage() {
  return (
    <main>
      <Navbar />
      <ConfirmContent />
    </main>
  )
}
