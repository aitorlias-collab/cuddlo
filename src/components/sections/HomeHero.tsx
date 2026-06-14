'use client'

import { motion } from 'framer-motion'

const heroText = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 26 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function HomeHero() {
  const scrollToLines = () => {
    document.getElementById('product-lines')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative pt-40 pb-32 lg:pt-48 lg:pb-40"
      style={{ background: 'linear-gradient(to bottom, #F5EFE6 0%, #FDFAF6 100%)' }}
    >
      {/* Subtle paw pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/pattern-cuddlo-paws.png)',
          backgroundSize: '300px',
          backgroundRepeat: 'repeat',
          opacity: 0.035,
        }}
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          variants={heroText}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-8"
        >
          {/* Eyebrow pill */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full
                       border border-sand/40 text-brown/75 text-sm tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brown/50 flex-shrink-0" />
            Peluches artesanales · Ropa minimalista
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-serif font-bold text-ink"
            style={{
              fontSize: 'clamp(2.75rem, 6.5vw, 5rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            Personalización premium<br className="hidden sm:block" /> para tu mascota
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="text-base lg:text-xl text-ink/60 leading-relaxed max-w-[52ch]"
          >
            Peluches artesanales y ropa minimalista creados a partir de las fotos de tu
            mascota. Aprueba antes de pagar.
          </motion.p>

          {/* CTA */}
          <motion.div variants={item}>
            <button
              onClick={scrollToLines}
              className="bg-brown text-cream px-11 py-4 rounded-full text-base font-medium
                         hover:bg-[#7A5235] transition-colors duration-300 cursor-pointer
                         shadow-[0_4px_20px_rgba(139,94,60,0.22)]"
            >
              Descubre Cuddlo
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
