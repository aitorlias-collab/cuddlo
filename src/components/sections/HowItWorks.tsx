'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    icon: '📸',
    title: 'Sube fotos de tu mascota',
    description:
      'Comparte entre 3 y 8 fotos claras desde distintos ángulos. Cuantas más fotos, más fiel es la réplica.',
  },
  {
    number: '02',
    icon: '✦',
    title: 'Aprueba el render antes de pagar',
    description:
      'En menos de 48 horas recibes un render digital. Si algo no te convence, lo ajustamos. Sin coste.',
  },
  {
    number: '03',
    icon: '📦',
    title: 'Confirma y recibe tu peluche',
    description:
      'Una vez aprobado el render, confirmamos el pedido. Tu Cuddlo llega en 3–4 semanas.',
  },
]

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="bg-cream rounded-2xl p-8 flex flex-col gap-5 shadow-[0_2px_16px_rgba(44,24,16,0.07)]"
    >
      {/* Number */}
      <span className="font-serif text-[4rem] font-bold leading-none text-sand select-none">
        {step.number}
      </span>

      {/* Icon + title */}
      <div>
        <p className="text-brown text-lg mb-1">{step.icon}</p>
        <h3 className="font-serif text-lg font-semibold text-ink leading-snug">
          {step.title}
        </h3>
      </div>

      <p className="text-sm text-ink/65 leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  )
}

export default function HowItWorks() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="como-funciona" className="bg-lavender py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2
            className="font-serif font-bold text-ink mb-3"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            Cómo funciona
          </h2>
          <p className="text-ink/65 text-lg max-w-[48ch]">
            Tres pasos sencillos y tu mascota se convierte en el peluche más especial del mundo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <a
            href="#personaliza"
            className="bg-brown text-cream px-8 py-4 rounded-full text-base font-medium
                       hover:bg-[#7A5235] transition-colors duration-200"
          >
            Empieza ahora, es gratis
          </a>
          <p className="text-sm text-ink/50">
            Sin tarjeta. Solo pagas si te encanta el resultado.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
