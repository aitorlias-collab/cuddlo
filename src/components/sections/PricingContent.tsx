'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─── Data ─────────────────────────────────────────── */

const tiers = [
  {
    id: 'esencial',
    name: 'Cuddlo Esencial',
    price: 129,
    popular: false,
    features: [
      'Peluche réplica premium de tu mascota',
      'Render digital para aprobar antes de pagar',
      'Fabricación artesanal',
      'Envío a toda España',
    ],
  },
  {
    id: 'regalo',
    name: 'Cuddlo Regalo',
    price: 155,
    popular: true,
    features: [
      'Todo lo del Esencial',
      'Caja regalo premium con papel de seda',
      'Tarjeta personalizada manuscrita',
      'Lazo y packaging especial',
    ],
  },
  {
    id: 'completo',
    name: 'Cuddlo Completo',
    price: 179,
    popular: false,
    features: [
      'Todo lo del Regalo',
      'Collar con nombre grabado',
      'Llavero mini réplica',
      'Envío prioritario',
    ],
  },
]

const addons = [
  { icon: '🎁', imageSlug: 'addon-caja-regalo',    name: 'Caja regalo premium',  price: '+25€', desc: 'Papel de seda, lazo y tarjeta personalizada' },
  { icon: '📿', imageSlug: 'addon-collar-nombre',  name: 'Collar con nombre',     price: '+12€', desc: 'Grabado con el nombre de tu mascota' },
  { icon: '🔑', imageSlug: 'addon-llavero',        name: 'Llavero mini réplica',  price: '+20€', desc: 'Miniatura del peluche como llavero' },
  { icon: '📦', imageSlug: 'addon-envio-prio',     name: 'Envío prioritario',      price: '+15€', desc: 'Entrega en 10–15 días (vs 3–4 semanas)' },
]

const faqs = [
  {
    q: '¿Cuándo pago?',
    a: 'Solo después de aprobar el render. Si no te convence, no pagas nada. Sin riesgos.',
  },
  {
    q: '¿Cuánto tarda?',
    a: 'El render llega en menos de 48h. El peluche, en 3–4 semanas desde que confirmas el pedido.',
  },
  {
    q: '¿Y si no me gusta el render?',
    a: 'Lo ajustamos sin coste hasta que estés satisfecho. Sin límite de revisiones.',
  },
]

/* ─── Sub-components ────────────────────────────────── */

function AddonImage({ slug, icon }: { slug: string; icon: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className="w-full flex items-center justify-center"
        style={{ aspectRatio: '4/3', background: 'rgba(196,168,130,0.18)' }}
        aria-hidden="true"
      >
        <span className="text-3xl select-none">{icon}</span>
      </div>
    )
  }

  return (
    <div className="w-full" style={{ aspectRatio: '4/3' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/${slug}.jpg`}
        alt=""
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function Check({ light = false }: { light?: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      className={`shrink-0 mt-0.5 ${light ? 'text-sand' : 'text-brown'}`}
    >
      <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.12" />
      <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-sand/30 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-6
                   group"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-ink group-hover:text-brown transition-colors">
          {q}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
          className={`shrink-0 text-sand transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="text-sm text-ink/60 leading-relaxed pb-5">{a}</p>
      </motion.div>
    </div>
  )
}

/* ─── Sections ──────────────────────────────────────── */

function PricingHero() {
  return (
    <section className="bg-cream pt-36 pb-16 text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          className="font-serif font-bold text-ink mb-4"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', textWrap: 'balance' } as React.CSSProperties}
        >
          Elige tu Cuddlo
        </h1>
        <p className="text-ink/60 text-lg max-w-[44ch] mx-auto">
          Sin pago hasta que apruebes el render. Solo pagas si te encanta.
        </p>
      </motion.div>
    </section>
  )
}

function PricingTiers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-cream pb-24 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 items-stretch">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col rounded-2xl ${
                tier.popular
                  ? 'bg-ink text-cream shadow-[0_8px_32px_rgba(44,24,16,0.22)] z-10'
                  : 'bg-white border border-sand/20 shadow-[0_2px_16px_rgba(44,24,16,0.06)]'
              }`}
            >
              {/* Popular badge — floats above the card, no impact on card height */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-sand text-ink text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                    Más popular
                  </span>
                </div>
              )}

              <div className="p-8 pt-12 flex flex-col flex-1">
                {/* Name */}
                <p className={`text-xs font-semibold uppercase tracking-[0.12em] mb-4 ${
                  tier.popular ? 'text-sand' : 'text-brown'
                }`}>
                  {tier.name}
                </p>

                {/* Price */}
                <div className="flex items-start gap-1 mb-6">
                  <span className={`text-sm font-medium mt-2 ${tier.popular ? 'text-cream/70' : 'text-ink/50'}`}>€</span>
                  <span className={`font-serif text-5xl font-bold leading-none ${tier.popular ? 'text-cream' : 'text-ink'}`}>
                    {tier.price}
                  </span>
                  <span className={`text-xs mt-auto mb-1 ml-0.5 ${tier.popular ? 'text-cream/50' : 'text-ink/35'}`}>
                    /único
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check light={tier.popular} />
                      <span className={tier.popular ? 'text-cream/85' : 'text-ink/70'}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="/register"
                  className={`w-full py-3.5 rounded-full text-sm font-medium text-center transition-all duration-200 ${
                    tier.popular
                      ? 'bg-sand text-ink hover:bg-[#B8976F]'
                      : 'bg-brown text-cream hover:bg-[#7A5235]'
                  }`}
                >
                  Empezar
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-ink/40 mt-8"
        >
          Todos los precios incluyen IVA. Sin coste si no apruebas el render.
        </motion.p>
      </div>
    </section>
  )
}

function PricingAddons() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-lavender py-20 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <h2
            className="font-serif font-bold text-ink mb-2"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', textWrap: 'balance' } as React.CSSProperties}
          >
            Personaliza tu pedido
          </h2>
          <p className="text-ink/55 text-base">
            Añade extras a cualquier tier. Se suman al precio final.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {addons.map((addon, i) => (
            <motion.div
              key={addon.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
              className="bg-cream rounded-xl overflow-hidden flex flex-col shadow-[0_1px_8px_rgba(44,24,16,0.05)]"
            >
              {/* Image slot */}
              <AddonImage slug={addon.imageSlug} icon={addon.icon} />

              {/* Text */}
              <div className="p-4 flex flex-col gap-1.5 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-ink leading-snug">{addon.name}</p>
                  <span className="text-sm font-bold text-brown shrink-0">{addon.price}</span>
                </div>
                <p className="text-xs text-ink/50 leading-snug">{addon.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingFAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-cream py-20 px-6">
      <div ref={ref} className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="font-serif font-bold text-ink mb-10"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)' } as React.CSSProperties}
        >
          Preguntas frecuentes
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PricingCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-ink py-24 px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl mx-auto text-center flex flex-col items-center gap-7"
      >
        <h2
          className="font-serif font-bold text-cream"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textWrap: 'balance', lineHeight: 1.1 } as React.CSSProperties}
        >
          ¿Listo para crear el tuyo?
        </h2>
        <p className="text-sand/80 text-lg max-w-[38ch] leading-relaxed">
          El proceso es gratuito hasta que apruebes el render. Sin riesgos.
        </p>
        <a
          href="/register"
          className="bg-sand text-ink px-10 py-5 rounded-full text-base font-medium
                     hover:bg-[#B8976F] transition-colors duration-200"
        >
          Personaliza el tuyo
        </a>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {['Sin pago hasta aprobar', 'Render en 48h', 'Envío a toda España'].map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-sm text-sand/60">
              <span className="text-sand" aria-hidden="true">✓</span>
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

/* ─── Main export ───────────────────────────────────── */

export default function PricingContent() {
  return (
    <>
      <PricingHero />
      <PricingTiers />
      <PricingAddons />
      <PricingFAQ />
      <PricingCTA />
    </>
  )
}
