'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'

const TIER_META = [
  { id: 'esencial', name: 'Cuddlo Esencial', price: 129, popular: false },
  { id: 'regalo',   name: 'Cuddlo Regalo',   price: 155, popular: true  },
  { id: 'completo', name: 'Cuddlo Completo', price: 179, popular: false },
]

const ADDON_META = [
  { icon: '🎁', imageSlug: 'addon-caja-regalo',   price: '+25€' },
  { icon: '📿', imageSlug: 'addon-collar-nombre',  price: '+12€' },
  { icon: '🔑', imageSlug: 'addon-llavero',        price: '+20€' },
  { icon: '📦', imageSlug: 'addon-envio-prio',     price: '+15€' },
]

const WEAR_IDS = ['camiseta', 'sudadera', 'tote']

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
        className="w-full flex items-center justify-between py-5 text-left gap-6 group"
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

function PricingHero() {
  const { t } = useLanguage()
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
          {t.pricing.heroTitle}
        </h1>
        <p className="text-ink/60 text-lg max-w-[44ch] mx-auto">
          {t.pricing.heroSubtitle}
        </p>
      </motion.div>
    </section>
  )
}

function PricingTiers() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-cream pb-24 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 items-stretch">
          {TIER_META.map((tier, i) => (
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
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-sand text-ink text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                    {t.pricing.popularBadge}
                  </span>
                </div>
              )}

              <div className="p-8 pt-12 flex flex-col flex-1">
                <p className={`text-xs font-semibold uppercase tracking-[0.12em] mb-4 ${
                  tier.popular ? 'text-sand' : 'text-brown'
                }`}>
                  {tier.name}
                </p>

                <div className="flex items-start gap-1 mb-6">
                  <span className={`text-sm font-medium mt-2 ${tier.popular ? 'text-cream/70' : 'text-ink/50'}`}>€</span>
                  <span className={`font-serif text-5xl font-bold leading-none ${tier.popular ? 'text-cream' : 'text-ink'}`}>
                    {tier.price}
                  </span>
                  <span className={`text-xs mt-auto mb-1 ml-0.5 ${tier.popular ? 'text-cream/50' : 'text-ink/35'}`}>
                    {t.pricing.perUnit}
                  </span>
                </div>

                <ul className="flex flex-col gap-3 flex-1 mb-8">
                  {t.pricing.tierFeatures[i].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check light={tier.popular} />
                      <span className={tier.popular ? 'text-cream/85' : 'text-ink/70'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/register"
                  className={`w-full py-3.5 rounded-full text-sm font-medium text-center transition-all duration-200 ${
                    tier.popular
                      ? 'bg-sand text-ink hover:bg-[#B8976F]'
                      : 'bg-brown text-cream hover:bg-[#7A5235]'
                  }`}
                >
                  {t.pricing.startCta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-ink/40 mt-8"
        >
          {t.pricing.vatNote}
        </motion.p>
      </div>
    </section>
  )
}

function WearPricing() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-cream border-t border-sand/20 py-20 px-6">
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
            Cuddlo Wear
          </h2>
          <p className="text-ink/55 text-base">
            {t.pricing.wearSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {t.pricing.wearItems.map((item, i) => (
            <motion.div
              key={WEAR_IDS[i]}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-sand/20 rounded-2xl
                         shadow-[0_2px_16px_rgba(44,24,16,0.06)]
                         p-7 flex flex-col gap-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif font-bold text-ink text-xl leading-tight">
                  {item.name}
                </h3>
                <span className="shrink-0 text-xs font-medium text-brown
                                 bg-brown/10 border border-brown/15
                                 px-2.5 py-1 rounded-full leading-none">
                  {item.badge}
                </span>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                {item.rows.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-2">
                    <span className="text-sm text-ink/50">{row.label}</span>
                    <span className="font-serif font-bold text-ink text-lg">{row.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="/wear"
            className="bg-brown text-cream px-9 py-4 rounded-full text-sm font-medium
                       hover:bg-[#7A5235] transition-colors duration-200"
          >
            {t.pricing.wearCta}
          </a>
        </motion.div>

      </div>
    </section>
  )
}

function PricingAddons() {
  const { t } = useLanguage()
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
            {t.pricing.addonsTitle}
          </h2>
          <p className="text-ink/55 text-base">
            {t.pricing.addonsSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {t.pricing.addons.map((addon, i) => (
            <motion.div
              key={addon.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
              className="bg-cream rounded-xl overflow-hidden flex flex-col shadow-[0_1px_8px_rgba(44,24,16,0.05)]"
            >
              <AddonImage slug={ADDON_META[i].imageSlug} icon={ADDON_META[i].icon} />

              <div className="p-4 flex flex-col gap-1.5 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-ink leading-snug">{addon.name}</p>
                  <span className="text-sm font-bold text-brown shrink-0">{ADDON_META[i].price}</span>
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
  const { t } = useLanguage()
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
          {t.pricing.faqTitle}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t.pricing.faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PricingCTA() {
  const { t } = useLanguage()
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
          {t.pricing.ctaTitle}
        </h2>
        <p className="text-sand/80 text-lg max-w-[38ch] leading-relaxed">
          {t.pricing.ctaSubtitle}
        </p>
        <a
          href="/register"
          className="bg-sand text-ink px-10 py-5 rounded-full text-base font-medium
                     hover:bg-[#B8976F] transition-colors duration-200"
        >
          {t.pricing.ctaButton}
        </a>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {t.pricing.ctaGuarantees.map((guarantee) => (
            <span key={guarantee} className="flex items-center gap-1.5 text-sm text-sand/60">
              <span className="text-sand" aria-hidden="true">✓</span>
              {guarantee}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default function PricingContent() {
  return (
    <>
      <PricingHero />
      <PricingTiers />
      <WearPricing />
      <PricingAddons />
      <PricingFAQ />
      <PricingCTA />
    </>
  )
}
