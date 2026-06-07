import Navbar from '@/components/layout/Navbar'
import UploadForm from '@/components/sections/UploadForm'

export const metadata = {
  title: 'Sube las fotos — Cuddlo',
  description: 'Sube entre 3 y 8 fotos de tu mascota para crear su peluche personalizado.',
}

export default function UploadPage() {
  return (
    <main>
      <Navbar />
      <UploadForm />
    </main>
  )
}
