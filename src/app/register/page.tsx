import Navbar from '@/components/layout/Navbar'
import RegisterForm from '@/components/sections/RegisterForm'

export const metadata = {
  title: 'Crea tu Cuddlo — Registro',
  description: 'Empieza aquí. Dinos cómo se llama tu mascota y te enviamos el render en 48 horas.',
}

export default function RegisterPage() {
  return (
    <main>
      <Navbar />
      <RegisterForm />
    </main>
  )
}
