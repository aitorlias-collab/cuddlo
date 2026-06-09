'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function HomeFinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-ink py-28 lg:py-36">
      <div ref={ref} className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-10"
        >
          <h2
            className="font-serif font-bold text-cream"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              lineHeight: 1.08,
              letterSpacing: '0.01em',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            ¿Listo para empezar?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a
              href="/plush"
              className="border-2 border-cream/25 text-cream px-9 py-4 rounded-full text-base font-medium
                         hover:bg-cream hover:text-ink transition-all duration-300"
            >
              Ver Peluches
            </a>
            <a
              href="/wear"
              className="border-2 border-cream/25 text-cream px-9 py-4 rounded-full text-base font-medium
                         hover:bg-cream hover:text-ink transition-all duration-300"
            >
              Ver Wear
            </a>
          </div>

          <p className="text-sand/60 text-sm">
            Sin tarjeta hasta que apruebes el diseño.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
