'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'

const slides = [
  { src: '/images/hero.jpg',  alt: 'Peluche personalizado de mascota — Cuddlo' },
  { src: '/images/hero2.jpg', alt: 'Réplica en peluche de tu perro o gato — Cuddlo' },
]

const heroText = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const paused = useRef(false)

  const advance = useCallback(() => {
    setCurrent(c => (c + 1) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) advance()
    }, 4000)
    return () => clearInterval(timer)
  }, [advance])

  return (
    <div
      className="relative w-full max-w-sm lg:max-w-none rounded-2xl overflow-hidden
                 shadow-[0_4px_28px_rgba(44,24,16,0.14)]"
      style={{ aspectRatio: '4/5' }}
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      ))}

      <div
        className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10"
        role="tablist"
        aria-label="Imágenes del producto"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Imagen ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-brown scale-110'
                : 'bg-white/70 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const { hero } = t
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' })

  return (
    <section className="bg-cream pt-32 lg:pt-36">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center pb-20">

          {/* Left: copy */}
          <motion.div
            variants={heroText}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-7"
          >
            <motion.h1
              variants={heroItem}
              className="font-serif font-bold text-ink leading-[1.08]"
              style={{
                fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
                textWrap: 'balance',
              } as React.CSSProperties}
            >
              {hero.title}
            </motion.h1>

            <motion.p variants={heroItem} className="text-base lg:text-lg text-ink/70 leading-relaxed max-w-[44ch]">
              {hero.subtitle}
            </motion.p>

            <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href="#personaliza"
                className="bg-brown text-cream px-8 py-4 rounded-full text-base font-medium
                           hover:bg-[#7A5235] transition-colors duration-200 text-center"
              >
                {hero.ctaPrimary}
              </a>
              <a
                href="#como-funciona"
                className="border border-sand text-brown px-8 py-4 rounded-full text-base font-medium
                           hover:bg-sand/10 transition-colors duration-200 text-center"
              >
                {hero.ctaSecondary}
              </a>
            </motion.div>
          </motion.div>

          {/* Right: image slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm lg:max-w-none">
              <HeroSlider />
            </div>
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 10 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="border-t border-sand/30 py-5"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm text-brown">
            <span>{hero.trustFamilies}</span>
            <span className="hidden sm:block text-sand" aria-hidden="true">·</span>
            <span>{hero.trustRating}</span>
            <span className="hidden sm:block text-sand" aria-hidden="true">·</span>
            <span>{hero.trustRender}</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
