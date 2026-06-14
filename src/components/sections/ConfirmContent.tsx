'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProgressBar from '@/components/ui/ProgressBar'

interface Lead {
  nombre: string
  email: string
  mascota: string
  tipo: string
}

function AnimatedCheck() {
  return (
    <div className="relative flex justify-center mb-8">
      {/* Ripple ring */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-brown/15"
        initial={{ scale: 0.6, opacity: 0.6 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        aria-hidden="true"
      />
      {/* Circle */}
      <motion.div
        className="relative w-24 h-24 rounded-full bg-brown flex items-center justify-center
                   shadow-[0_4px_24px_rgba(139,94,60,0.28)]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.15 }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="M10 24 L20 34 L38 14"
            stroke="#F5EFE6"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.42, delay: 0.65, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>
    </div>
  )
}

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
}

interface WearCartItem {
  id: string
  productName: string
  finish: string
  gender: string | null
  colorLabel: string
  size: string | null
  price: number
}

export default function ConfirmContent() {
  const [lead, setLead] = useState<Lead | null>(null)
  const [photoCount, setPhotoCount] = useState(0)
  const [wearCart, setWearCart] = useState<WearCartItem[]>([])

  useEffect(() => {
    try {
      const l = JSON.parse(localStorage.getItem('cuddlo_lead') ?? '{}')
      const photos: string[] = JSON.parse(localStorage.getItem('cuddlo_photos') ?? '[]')
      const cart: WearCartItem[] = JSON.parse(localStorage.getItem('cuddlo_cart') ?? '[]')

      if (l.nombre) setLead(l)
      setPhotoCount(Array.isArray(photos) ? photos.length : 0)
      if (Array.isArray(cart) && cart.length > 0) setWearCart(cart)

      if (l.nombre && l.email) {
        fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: l.nombre,
            email: l.email,
            nombreMascota: l.mascota ?? '',
            fotos: Array.isArray(photos) ? photos : [],
            wearCart: Array.isArray(cart) ? cart : [],
          }),
        }).catch(() => {})
      }
    } catch {}
  }, [])

  const petName = lead?.mascota || 'tu mascota'
  const firstName = lead?.nombre?.split(' ')[0] ?? ''
  const isWear = wearCart.length > 0
  const wearTotal = wearCart.reduce((sum, item) => sum + item.price, 0)

  const nextSteps = isWear
    ? [
        { icon: '🎨', title: `Creamos la ilustración de ${petName}`,         sub: 'En menos de 48h' },
        { icon: '✉️', title: 'Te la enviamos por email para que la apruebes', sub: 'Sin compromiso de pago' },
        { icon: '📦', title: 'Fabricamos y enviamos tus prendas',             sub: 'Llegan en 7–10 días' },
      ]
    : [
        { icon: '🎨', title: `Creamos el render digital de ${petName}`,       sub: 'En menos de 48h' },
        { icon: '✉️', title: 'Te lo enviamos por email para que lo apruebes', sub: 'Sin compromiso de pago' },
        { icon: '📦', title: 'Si te encanta, confirmamos y lo fabricamos',    sub: 'Llega en 3–4 semanas' },
      ]

  const summary = [
    { label: 'Nombre',         value: lead?.nombre || '—' },
    { label: 'Email',          value: lead?.email  || '—' },
    { label: 'Mascota',        value: petName + (lead?.tipo ? ` (${lead.tipo})` : '') },
    { label: 'Fotos subidas',  value: photoCount ? `${photoCount} foto${photoCount !== 1 ? 's' : ''}` : '—' },
  ]

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center pt-28 pb-16 px-4">
      <div className="w-full max-w-[520px]">
        <ProgressBar active={2} completed />

        {/* Animated checkmark */}
        <AnimatedCheck />

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="text-center mb-10"
        >
          <motion.h1
            variants={fade}
            className="font-serif text-[2rem] font-bold text-ink leading-tight mb-3"
          >
            ¡Tu pedido está en marcha{firstName ? `, ${firstName}` : ''}!
          </motion.h1>
          <motion.p
            variants={fade}
            className="text-sm text-ink/60 leading-relaxed max-w-[42ch] mx-auto"
          >
            {isWear
              ? `Hemos recibido las fotos de ${petName}. En menos de 48h tendrás la ilustración para aprobar antes de fabricar.`
              : `Hemos recibido las fotos de ${petName}. Nuestro equipo las revisará y recibirás el render en menos de 48 horas.`}
          </motion.p>
        </motion.div>

        {/* What happens next */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="rounded-2xl p-6 mb-5"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 16px rgba(44, 24, 16, 0.07)',
          }}
        >
          <motion.p
            variants={fade}
            className="text-xs font-semibold text-brown uppercase tracking-[0.12em] mb-5"
          >
            Qué pasa ahora
          </motion.p>
          <div className="flex flex-col gap-0">
            {nextSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={fade}
                className={`flex items-start gap-4 py-4 ${
                  i < nextSteps.length - 1 ? 'border-b border-sand/20' : ''
                }`}
              >
                <span
                  className="text-xl leading-none mt-0.5 select-none w-7 shrink-0 text-center"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink leading-snug">{step.title}</p>
                  <p className="text-xs text-ink/45 mt-0.5">{step.sub}</p>
                </div>
                <span className="text-xs font-semibold text-sand shrink-0 mt-0.5">
                  0{i + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="border border-sand/30 rounded-2xl p-5 mb-8"
        >
          <p className="text-xs font-semibold text-brown uppercase tracking-[0.12em] mb-4">
            Resumen del pedido
          </p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
            {summary.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs text-ink/40 mb-0.5">{label}</dt>
                <dd className="text-sm font-medium text-ink truncate">{value}</dd>
              </div>
            ))}
          </dl>

          {/* Wear cart breakdown */}
          {isWear && (
            <div className="mt-5 pt-4 border-t border-sand/25">
              <p className="text-xs font-semibold text-brown uppercase tracking-[0.12em] mb-3">
                Prendas
              </p>
              <div className="flex flex-col gap-2">
                {wearCart.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-ink/70">
                      {item.productName}
                      {item.gender ? ` · Corte ${item.gender}` : ''}
                      {' · '}{item.finish === 'impreso' ? 'Impreso' : 'Bordado'}
                      {' · '}{item.colorLabel}
                      {item.size ? ` · ${item.size}` : ''}
                    </span>
                    <span className="font-semibold text-brown ml-3 shrink-0">{item.price}€</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-sand/20">
                <span className="text-xs text-ink/45">Total</span>
                <span className="font-serif font-bold text-ink">{wearTotal}€</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href="/"
            className="w-full py-4 rounded-full text-base font-medium text-center
                       border-2 border-brown text-brown
                       hover:bg-brown hover:text-cream
                       transition-all duration-200"
          >
            Volver a la home
          </a>
          <p className="text-xs text-ink/40">
            ¿Dudas?{' '}
            <a
              href="mailto:hello@cuddlo.pet"
              className="text-brown underline underline-offset-2 hover:text-ink transition-colors"
            >
              hello@cuddlo.pet
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
