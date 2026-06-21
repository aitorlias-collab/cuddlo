'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'

type Line = {
  id: string
  title: string
  description: string
  buttonLabel: string
  href: string
  imageSrc: string
  imageAlt: string
}

const LINES_META = [
  { id: 'plush', title: 'Cuddlo Plush', href: '/plush', imageSrc: '/images/hero.jpg', imageAlt: 'Dachshund y su réplica en peluche — Cuddlo Plush' },
  { id: 'wear',  title: 'Cuddlo Wear',  href: '/wear',  imageSrc: '/images/wear-hero.png', imageAlt: 'Ropa personalizada con ilustración de tu mascota — Cuddlo Wear' },
]

function ProductCard({ line, index }: { line: Line; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-3xl overflow-hidden
                 border border-sand/20 bg-cream
                 shadow-[0_2px_24px_rgba(44,24,16,0.07)]
                 hover:shadow-[0_12px_48px_rgba(44,24,16,0.14)]
                 hover:scale-[1.02]
                 transition-all duration-500 ease-out"
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5 z-10
                   bg-sand/0 group-hover:bg-sand/70
                   transition-colors duration-500"
      />

      <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={line.imageSrc}
          alt={line.imageAlt}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      </div>

      <div className="flex flex-col gap-5 p-8 flex-1">
        <h3
          className="font-serif font-bold text-ink"
          style={{
            fontSize: 'clamp(1.55rem, 2.5vw, 2rem)',
            letterSpacing: '0.01em',
          } as React.CSSProperties}
        >
          {line.title}
        </h3>

        <p className="text-ink/65 text-base leading-relaxed flex-1">
          {line.description}
        </p>

        <a
          href={line.href}
          className="self-start border border-brown text-brown px-7 py-3 rounded-full text-sm font-medium
                     hover:bg-brown hover:text-cream transition-all duration-300"
        >
          {line.buttonLabel}
        </a>
      </div>
    </motion.div>
  )
}

export default function HomeProductLines() {
  const { t } = useLanguage()
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  const lines: Line[] = [
    { ...LINES_META[0], description: t.homeProductLines.plush.description, buttonLabel: t.homeProductLines.plush.buttonLabel },
    { ...LINES_META[1], description: t.homeProductLines.wear.description,  buttonLabel: t.homeProductLines.wear.buttonLabel },
  ]

  return (
    <section id="product-lines" className="bg-cream py-28 lg:py-36">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-16 text-center"
        >
          <h2
            className="font-serif font-bold text-ink"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              letterSpacing: '0.01em',
            } as React.CSSProperties}
          >
            {t.homeProductLines.sectionTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {lines.map((line, i) => (
            <ProductCard key={line.id} line={line} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
