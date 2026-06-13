'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCart } from '@/context/CartContext'

// Variant IDs from the Shopify store (cxrkkh-q2.myshopify.com)
const PLUSH_TIERS = [
  {
    id: 'esencial',
    name: 'Cuddlo Esencial',
    price: 129,
    popular: false,
    variantId: 'gid://shopify/ProductVariant/53276067922248',
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
    variantId: 'gid://shopify/ProductVariant/53276068020552',
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
    variantId: 'gid://shopify/ProductVariant/53276068086088',
    features: [
      'Todo lo del Regalo',
      'Collar con nombre grabado',
      'Llavero mini réplica',
      'Envío prioritario',
    ],
  },
]

function Check({ light = false }: { light?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      className={`shrink-0 mt-0.5 ${light ? 'text-sand' : 'text-brown'}`}
    >
      <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.12" />
      <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PlushPricing() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { addItem, isLoading } = useCart()
  const [adding, setAdding] = useState<string | null>(null)

  async function handleAddToCart(tier: typeof PLUSH_TIERS[0]) {
    setAdding(tier.id)
    try {
      await addItem(tier.variantId, 1)
    } finally {
      setAdding(null)
    }
  }

  return (
    <section id="precios" className="bg-cream py-20 lg:py-28 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <h2
            className="font-serif font-bold text-ink mb-3"
            style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)', textWrap: 'balance' } as React.CSSProperties}
          >
            Elige tu Cuddlo
          </h2>
          <p className="text-ink/60 text-lg max-w-[44ch] mx-auto">
            Sin pago hasta que apruebes el render. Solo pagas si te encanta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 items-stretch">
          {PLUSH_TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col rounded-2xl ${
                tier.popular
                  ? 'bg-ink text-cream shadow-[0_8px_32px_rgba(44,24,16,0.22)] z-10'
                  : 'bg-white border border-[#C4A882]/20 shadow-[0_2px_16px_rgba(44,24,16,0.06)]'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-sand text-ink text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                    Más popular
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
                    /único
                  </span>
                </div>

                <ul className="flex flex-col gap-3 flex-1 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check light={tier.popular} />
                      <span className={tier.popular ? 'text-cream/85' : 'text-ink/70'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleAddToCart(tier)}
                  disabled={isLoading || adding !== null}
                  className={`w-full py-3.5 rounded-full text-sm font-medium text-center
                             transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                    tier.popular
                      ? 'bg-sand text-ink hover:bg-[#B8976F]'
                      : 'bg-brown text-cream hover:bg-[#7A5235]'
                  }`}
                >
                  {adding === tier.id ? 'Añadiendo…' : 'Añadir al carrito'}
                </button>
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
          Todos los precios incluyen IVA. Sin coste si no apruebas el render.
        </motion.p>
      </div>
    </section>
  )
}
