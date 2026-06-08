'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Types ───────────────────────────────────────────────────────────────────

type Product = 'camiseta' | 'sudadera' | 'tote'
type Finish  = 'impreso' | 'bordado'
type Gender  = 'mujer' | 'hombre'
type Color   = 'crema' | 'blanco' | 'negro'
type Size    = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS: { id: Product; name: string; priceImpreso: number; priceBordado: number | null; badge: string }[] = [
  { id: 'camiseta', name: 'Camiseta',  priceImpreso: 39, priceBordado: 49, badge: 'Impreso / Bordado' },
  { id: 'sudadera', name: 'Sudadera',  priceImpreso: 55, priceBordado: 69, badge: 'Impreso / Bordado' },
  { id: 'tote',     name: 'Tote Bag',  priceImpreso: 25, priceBordado: null, badge: 'Impreso' },
]

const COLORS: { id: Color; label: string; hex: string; border: string }[] = [
  { id: 'crema',  label: 'Crema',  hex: '#F5EFE6', border: '#C4A882' },
  { id: 'blanco', label: 'Blanco', hex: '#FFFFFF',  border: '#C4A882' },
  { id: 'negro',  label: 'Negro',  hex: '#1A1A1A',  border: '#1A1A1A' },
]

const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const WEAR_STEPS = [
  {
    number: '01',
    icon: '📸',
    title: 'Elige tu prenda y sube fotos de tu mascota',
    description: 'Selecciona camiseta, sudadera o tote bag, elige el acabado y sube entre 3 y 8 fotos claras desde distintos ángulos.',
  },
  {
    number: '02',
    icon: '✏️',
    title: 'Aprueba la ilustración personalizada antes de producir',
    description: 'En menos de 48 horas recibes la ilustración minimalista de tu mascota. Si algo no te convence, lo ajustamos sin coste.',
  },
  {
    number: '03',
    icon: '📦',
    title: 'Recíbela en casa en 7–10 días',
    description: 'Una vez aprobada la ilustración, confirmamos el pedido. Tu prenda llega impresa o bordada con su etiqueta interior Cuddlo.',
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mb-8"
    >
      <h2
        className="font-serif font-bold text-ink"
        style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', textWrap: 'balance' } as React.CSSProperties}
      >
        {children}
      </h2>
      {sub && <p className="text-ink/60 text-base mt-2 max-w-[52ch]">{sub}</p>}
    </motion.div>
  )
}

function StepCard({ step, index }: { step: typeof WEAR_STEPS[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="bg-cream rounded-2xl p-8 flex flex-col gap-5 shadow-[0_2px_16px_rgba(44,24,16,0.07)]"
    >
      <span className="font-serif text-[4rem] font-bold leading-none text-sand select-none">
        {step.number}
      </span>
      <div>
        <p className="text-brown text-lg mb-1">{step.icon}</p>
        <h3 className="font-serif text-lg font-semibold text-ink leading-snug">{step.title}</h3>
      </div>
      <p className="text-sm text-ink/65 leading-relaxed">{step.description}</p>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function WearContent() {
  const [product,  setProduct]  = useState<Product>('camiseta')
  const [finish,   setFinish]   = useState<Finish>('impreso')
  const [gender,   setGender]   = useState<Gender>('mujer')
  const [color,    setColor]    = useState<Color>('crema')
  const [size,     setSize]     = useState<Size | null>(null)

  const selectedProduct = PRODUCTS.find(p => p.id === product)!
  const isTote = product === 'tote'
  const effectiveFinish: Finish = isTote ? 'impreso' : finish
  const price = effectiveFinish === 'bordado' ? selectedProduct.priceBordado! : selectedProduct.priceImpreso

  // Reset finish to impreso when tote is selected
  function handleProductChange(id: Product) {
    setProduct(id)
    if (id === 'tote') setFinish('impreso')
    setSize(null)
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-cream pt-32 lg:pt-36 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Left: copy */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }}
              className="flex flex-col gap-7"
            >
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
                className="font-serif font-bold text-ink leading-[1.08]"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4rem)', textWrap: 'balance' } as React.CSSProperties}
              >
                Tu mascota,{' '}en tu ropa.
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
                className="text-base lg:text-lg text-ink/70 leading-relaxed max-w-[44ch]"
              >
                Ilustración personalizada a partir de tus fotos. Discreta, elegante, única.
              </motion.p>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
                className="pt-1"
              >
                <a
                  href="#configura"
                  className="inline-flex bg-brown text-cream px-8 py-4 rounded-full text-base font-medium
                             hover:bg-[#7A5235] transition-colors duration-200"
                >
                  Personaliza la tuya
                </a>
              </motion.div>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
                className="text-sm text-ink/45"
              >
                Pequeño diseño en el pecho izquierdo · Etiqueta interior Cuddlo
              </motion.p>
            </motion.div>

            {/* Right: hero image placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="flex justify-center lg:justify-end"
            >
              <div
                className="w-full max-w-sm lg:max-w-none rounded-2xl overflow-hidden
                           shadow-[0_4px_28px_rgba(44,24,16,0.14)] flex items-center justify-center"
                style={{ aspectRatio: '4/5', background: '#C4A882' }}
              >
                <div className="text-center px-10">
                  <div className="w-20 h-20 rounded-full bg-cream/30 mx-auto mb-4 flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                      <circle cx="18" cy="18" r="17" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
                      <path d="M11 25 C11 20 14 16 18 16 C22 16 25 20 25 25" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="18" cy="13" r="3.5" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <p className="text-cream/80 text-sm font-medium">wear-hero.jpg</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CONFIGURADOR ──────────────────────────────────────────────────── */}
      <section id="configura" className="bg-[#FAF7F3] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 flex flex-col gap-14">

          {/* Product selector */}
          <div>
            <SectionTitle sub="Elige la prenda sobre la que quieres imprimir tu ilustración.">
              Elige tu prenda
            </SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PRODUCTS.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleProductChange(p.id)}
                  className={`rounded-2xl border-2 p-6 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brown/50
                    ${product === p.id
                      ? 'border-brown bg-cream shadow-[0_2px_16px_rgba(139,94,60,0.15)]'
                      : 'border-sand/30 bg-cream hover:border-sand/70'
                    }`}
                >
                  {/* Placeholder image */}
                  <div
                    className="w-full rounded-xl mb-4 flex items-center justify-center"
                    style={{ height: 120, background: product === p.id ? '#EDE3D8' : '#F0EAE0' }}
                  >
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      {p.id === 'tote' ? (
                        <>
                          <rect x="10" y="18" width="24" height="20" rx="2" stroke="#8B5E3C" strokeOpacity="0.5" strokeWidth="1.5" />
                          <path d="M16 18 C16 14 28 14 28 18" stroke="#8B5E3C" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
                        </>
                      ) : p.id === 'sudadera' ? (
                        <>
                          <path d="M14 12 L8 20 L14 22 L14 34 L30 34 L30 22 L36 20 L30 12 L26 16 C24 17.5 20 17.5 18 16 Z" stroke="#8B5E3C" strokeOpacity="0.5" strokeWidth="1.5" strokeLinejoin="round" />
                        </>
                      ) : (
                        <>
                          <path d="M16 10 L8 18 L14 20 L14 34 L30 34 L30 20 L36 18 L28 10 L25 14 C23 15.5 21 15.5 19 14 Z" stroke="#8B5E3C" strokeOpacity="0.5" strokeWidth="1.5" strokeLinejoin="round" />
                        </>
                      )}
                    </svg>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-serif font-semibold text-ink text-base">{p.name}</p>
                      <p className="text-brown text-sm mt-0.5">Desde {p.priceImpreso}€</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 mt-0.5
                      ${product === p.id ? 'bg-brown/10 text-brown' : 'bg-sand/20 text-brown/70'}`}>
                      {p.badge}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Finish selector */}
          <div>
            <SectionTitle sub={isTote ? 'La tote bag solo está disponible en acabado impreso.' : 'El bordado añade textura artesanal y un +10€ al precio base.'}>
              Acabado
            </SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(['impreso', 'bordado'] as Finish[]).map(f => {
                const disabled = isTote && f === 'bordado'
                const active = effectiveFinish === f
                return (
                  <button
                    key={f}
                    disabled={disabled}
                    onClick={() => setFinish(f)}
                    className={`rounded-2xl border-2 p-6 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brown/50
                      ${disabled
                        ? 'border-sand/15 bg-sand/5 opacity-40 cursor-not-allowed'
                        : active
                          ? 'border-brown bg-cream shadow-[0_2px_16px_rgba(139,94,60,0.15)]'
                          : 'border-sand/30 bg-cream hover:border-sand/70'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-serif font-semibold text-ink text-base capitalize">{f}</p>
                      {f === 'bordado' && !disabled && (
                        <span className="text-xs px-2 py-1 rounded-full bg-brown/10 text-brown font-medium">+10€</span>
                      )}
                    </div>
                    <p className="text-sm text-ink/60 leading-relaxed">
                      {f === 'impreso'
                        ? 'Colores vivos, detalle máximo, acabado suave al tacto.'
                        : 'Textura artesanal, relieve sutil, acabado premium.'}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Gender selector — hidden for tote */}
          {!isTote && (
            <div>
              <SectionTitle sub="Selecciona el corte que prefieres para tu prenda.">
                Corte
              </SectionTitle>
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                {(['mujer', 'hombre'] as Gender[]).map(g => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`rounded-2xl border-2 p-5 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brown/50
                      ${gender === g
                        ? 'border-brown bg-cream shadow-[0_2px_16px_rgba(139,94,60,0.12)]'
                        : 'border-sand/30 bg-cream hover:border-sand/70'
                      }`}
                  >
                    {/* Silhouette placeholder */}
                    <div className="flex justify-center mb-3">
                      <svg width="40" height="50" viewBox="0 0 40 50" fill="none" aria-hidden="true">
                        {g === 'mujer' ? (
                          <>
                            <ellipse cx="20" cy="9" rx="7" ry="7" stroke="#8B5E3C" strokeOpacity="0.6" strokeWidth="1.5" />
                            <path d="M8 22 C8 16 14 14 20 14 C26 14 32 16 32 22 L30 38 L24 38 L22 30 L18 30 L16 38 L10 38 Z" stroke="#8B5E3C" strokeOpacity="0.6" strokeWidth="1.5" strokeLinejoin="round" />
                          </>
                        ) : (
                          <>
                            <ellipse cx="20" cy="9" rx="7" ry="7" stroke="#8B5E3C" strokeOpacity="0.6" strokeWidth="1.5" />
                            <path d="M6 22 C6 16 13 14 20 14 C27 14 34 16 34 22 L32 42 L25 42 L22 30 L18 30 L15 42 L8 42 Z" stroke="#8B5E3C" strokeOpacity="0.6" strokeWidth="1.5" strokeLinejoin="round" />
                          </>
                        )}
                      </svg>
                    </div>
                    <p className="font-medium text-sm text-ink capitalize">Corte {g}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color selector */}
          <div>
            <SectionTitle sub="Elige el color base de tu prenda.">
              Color
            </SectionTitle>
            <div className="flex gap-5 flex-wrap">
              {COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  aria-label={`Color ${c.label}`}
                  className="flex flex-col items-center gap-2 focus:outline-none group"
                >
                  <div
                    className={`w-10 h-10 rounded-full transition-all duration-200
                      ${color === c.id ? 'ring-2 ring-offset-2 ring-brown scale-110' : 'ring-1 ring-offset-1 ring-transparent group-hover:ring-sand/60 group-hover:scale-105'}`}
                    style={{ background: c.hex, border: `1.5px solid ${c.border}` }}
                  />
                  <span className={`text-xs transition-colors duration-150 ${color === c.id ? 'text-brown font-medium' : 'text-ink/50'}`}>
                    {c.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Size selector — hidden for tote */}
          {!isTote && (
            <div>
              <SectionTitle sub="Elige tu talla. Si tienes dudas, talla hacia arriba.">
                Talla
              </SectionTitle>
              <div className="flex gap-3 flex-wrap">
                {SIZES.map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-14 h-14 rounded-xl border-2 text-sm font-medium transition-all duration-200
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-brown/50
                      ${size === s
                        ? 'border-brown bg-brown text-cream shadow-[0_2px_12px_rgba(139,94,60,0.25)]'
                        : 'border-sand/40 bg-cream text-ink/70 hover:border-sand hover:text-ink'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Summary + CTA */}
          <motion.div
            layout
            className="bg-cream rounded-2xl border border-sand/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5
                       shadow-[0_2px_16px_rgba(44,24,16,0.07)]"
          >
            <div>
              <p className="text-ink/50 text-xs uppercase tracking-widest mb-1">Tu selección</p>
              <p className="font-serif font-semibold text-ink text-lg">
                {selectedProduct.name}
                {!isTote && ` · Corte ${gender}`}
                {' · '}{effectiveFinish === 'impreso' ? 'Impreso' : 'Bordado'}
                {!isTote && size ? ` · Talla ${size}` : ''}
              </p>
              <p className="text-brown font-medium mt-1">
                <span className="text-2xl font-serif font-bold">{price}€</span>
                <span className="text-sm text-ink/45 ml-2">+ envío</span>
              </p>
            </div>
            <a
              href="/register"
              className="bg-brown text-cream px-8 py-4 rounded-full text-base font-medium
                         hover:bg-[#7A5235] transition-colors duration-200 whitespace-nowrap"
            >
              Empieza el diseño
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PRECIOS ───────────────────────────────────────────────────────── */}
      <section className="bg-cream py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <SectionTitle sub="Sin sorpresas. El precio incluye la ilustración personalizada y el envío a toda España.">
            Precios
          </SectionTitle>

          <div className="overflow-x-auto rounded-2xl border border-sand/30 shadow-[0_2px_16px_rgba(44,24,16,0.06)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#FAF7F3] border-b border-sand/25">
                  <th className="text-left px-6 py-4 font-serif font-semibold text-ink text-base">Producto</th>
                  <th className="text-center px-6 py-4 font-serif font-semibold text-ink text-base">Impreso</th>
                  <th className="text-center px-6 py-4 font-serif font-semibold text-ink text-base">Bordado</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p, i) => (
                  <tr key={p.id} className={`border-b border-sand/15 last:border-0 ${i % 2 === 0 ? 'bg-cream' : 'bg-[#FAF7F3]'}`}>
                    <td className="px-6 py-4 font-medium text-ink">{p.name}</td>
                    <td className="px-6 py-4 text-center text-brown font-semibold">{p.priceImpreso}€</td>
                    <td className="px-6 py-4 text-center text-ink/40">
                      {p.priceBordado ? <span className="text-brown font-semibold">{p.priceBordado}€</span> : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-ink/40 mt-4">
            Todos los precios incluyen la ilustración personalizada y etiqueta interior Cuddlo. Envío estándar incluido en España peninsular.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="bg-lavender py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionTitle sub="Tres pasos y tu prenda favorita lleva a tu mascota contigo.">
            Cómo funciona
          </SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {WEAR_STEPS.map((step, i) => (
              <StepCard key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EL DETALLE QUE LO CAMBIA TODO ─────────────────────────────────── */}
      <section className="bg-[#EEEDFE] py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h2
                className="font-serif font-bold text-ink mb-6"
                style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)', textWrap: 'balance' } as React.CSSProperties}
              >
                El detalle que lo cambia todo
              </h2>
              <p className="text-ink/70 text-base lg:text-lg leading-relaxed max-w-[46ch]">
                No es una caricatura. Es su esencia. Capturamos los rasgos únicos de tu mascota —sus orejas, sus manchas, su mirada— y los convertimos en una ilustración minimalista que solo tú reconocerías.
              </p>
              <p className="text-ink/50 text-sm mt-5">
                Cada prenda incluye etiqueta interior Cuddlo.
              </p>
            </motion.div>

            {/* Two placeholders: photo → illustration on garment */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Foto real', bg: '#D4C4B0' },
                { label: 'En la prenda', bg: '#C4A882' },
              ].map(item => (
                <div
                  key={item.label}
                  className="rounded-2xl flex items-center justify-center flex-col gap-2
                             shadow-[0_2px_16px_rgba(44,24,16,0.1)]"
                  style={{ background: item.bg, aspectRatio: '3/4' }}
                >
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <circle cx="18" cy="18" r="17" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" />
                    <path d="M11 25 C11 20 14 16 18 16 C22 16 25 20 25 25" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="18" cy="13" r="3.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" />
                  </svg>
                  <p className="text-cream/75 text-xs font-medium">{item.label}</p>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-ink py-24 lg:py-32">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
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
              ¿Lista para llevarle contigo?
            </h2>

            <p className="text-sand/90 text-lg leading-relaxed max-w-[40ch]">
              Ilustración aprobada antes de producir. Sin riesgos, sin sorpresas.
            </p>

            <a
              href="/register"
              className="bg-sand text-ink px-10 py-5 rounded-full text-base font-medium
                         hover:bg-[#B8976F] transition-colors duration-200"
            >
              Empieza tu diseño
            </a>

            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 pt-2">
              {['Ilustración personalizada', 'Aprueba antes de producir', 'Envío a toda España'].map(text => (
                <span key={text} className="flex items-center gap-2 text-sm text-sand/75">
                  <span className="text-sand font-semibold" aria-hidden="true">✓</span>
                  {text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
