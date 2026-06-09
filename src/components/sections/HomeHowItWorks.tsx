'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    image: '/images/paso1.png',
    title: 'Sube fotos de tu mascota',
    description:
      'Entre 3 y 8 fotos desde distintos ángulos. Cuantas más y mejores, más fiel es el resultado.',
  },
  {
    number: '02',
    image: '/images/paso2.png',
    title: 'Aprueba el diseño antes de pagar',
    description:
      'Render o ilustración en menos de 48 h. Si algo no te convence, lo ajustamos. Sin coste adicional.',
  },
  {
    number: '03',
    image: '/images/paso3.png',
    title: 'Recíbelo en casa',
    description:
      'Te avisamos cuando esté listo para enviar. Sin sorpresas — solo el resultado que aprobaste.',
  },
]

function StepImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full overflow-hidden flex-shrink-0" style={{ aspectRatio: '4/3' }}>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="w-full h-full object-cover"
        sizes="(max-width: 1024px) 100vw, 33vw"
      />
    </div>
  )
}

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="bg-cream rounded-2xl overflow-hidden flex flex-col
                 shadow-[0_2px_18px_rgba(44,24,16,0.07)]"
    >
      <StepImage src={step.image} alt={step.title} />

      <div className="p-8 flex flex-col gap-4">
        <span className="font-serif text-[4rem] font-bold leading-none text-sand select-none">
          {step.number}
        </span>
        <h3
          className="font-serif font-semibold text-ink leading-snug"
          style={{ fontSize: '1.1rem', letterSpacing: '0.005em' } as React.CSSProperties}
        >
          {step.title}
        </h3>
        <p className="text-sm text-ink/60 leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function HomeHowItWorks() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section className="bg-lavender py-28 lg:py-36">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 22 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-14"
        >
          <h2
            className="font-serif font-bold text-ink mb-3"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '0.01em',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            Cómo funciona
          </h2>
          <p className="text-ink/60 text-lg max-w-[50ch]">
            El mismo proceso para peluches y ropa. Sencillo, transparente y sin riesgo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
