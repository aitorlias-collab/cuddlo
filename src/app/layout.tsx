import type { Metadata } from 'next'
import { Bodoni_Moda, Inter } from 'next/font/google'
import '@/styles/globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import CookieBanner from '@/components/CookieBanner'
import Providers from '@/components/Providers'

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  adjustFontFallback: false,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Cuddlo — El peluche personalizado de tu mascota',
  description:
    'Convierte a tu perro o gato en un peluche único y premium. Envía fotos, aprueba el render, y recibe tu réplica en 3–4 semanas.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bodoniModa.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-cream text-ink">
        <Providers>
          <CustomCursor />
          <CookieBanner />
          {children}
        </Providers>
      </body>
    </html>
  )
}
