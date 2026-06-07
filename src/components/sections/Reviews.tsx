'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const reviews = [
  {
    stars: 5,
    text: 'Lloramos cuando lo abrimos. Es calcada a mi perra, tiene hasta la mancha en la oreja derecha.',
    name: 'María G.',
    pet: 'Dueña de Mochi, Golden Retriever',
  },
  {
    stars: 5,
    text: 'La calidad es una pasada. El pelo, los ojos, el color... parece de verdad. Ya pedí el segundo para mi madre.',
    name: 'Carlos M.',
    pet: 'Papá de Simba, Maine Coon',
  },
  {
    stars: 5,
    text: 'Perdí a mi gata hace unos meses. Tener su Cuddlo lo significa todo para mí. Gracias por el cuidado que ponéis.',
    name: 'Ana P.',
    pet: 'Mamá de Luna',
  },
]

export default function Reviews() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section className="bg-cream py-24 lg:py-32">
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
            Lo que dicen las familias
          </h2>
          <p className="text-ink/65 text-lg max-w-[44ch]">
            Cada Cuddlo es una historia. Aquí tienes algunas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
              className="flex flex-col gap-4 p-7 rounded-2xl border border-sand/25
                         shadow-[0_1px_10px_rgba(44,24,16,0.05)]"
            >
              {/* Stars */}
              <div className="text-sand text-base tracking-wide" aria-label={`${review.stars} estrellas`}>
                {'★'.repeat(review.stars)}
              </div>

              {/* Quote */}
              <p className="text-ink text-sm leading-relaxed flex-1 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div>
                <p className="text-brown text-sm font-semibold">{review.name}</p>
                <p className="text-ink/50 text-xs mt-0.5">{review.pet}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
