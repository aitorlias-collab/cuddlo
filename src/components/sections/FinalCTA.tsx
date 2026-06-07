'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const guarantees = [
  'Sin pago hasta aprobar el render',
  'Render en menos de 48 h',
  'Envío a toda España',
]

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="personaliza" className="bg-ink py-24 lg:py-32">
      <div ref={ref} className="max-w-2xl mx-auto px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-7"
        >
          <h2
            className="font-serif font-bold text-cream"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)',
              lineHeight: 1.08,
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            El peluche más especial del mundo
          </h2>

          <p className="text-sand/90 text-lg leading-relaxed max-w-[40ch]">
            Solo aceptamos 15 nuevos pedidos al mes. El proceso es gratuito
            hasta que apruebes el resultado.
          </p>

          <a
            href="/register"
            className="bg-sand text-ink px-10 py-5 rounded-full text-base font-medium
                       hover:bg-[#B8976F] transition-colors duration-200"
          >
            Personaliza el tuyo
          </a>

          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 pt-2">
            {guarantees.map((text) => (
              <span key={text} className="flex items-center gap-2 text-sm text-sand/75">
                <span className="text-sand font-semibold" aria-hidden="true">✓</span>
                {text}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
