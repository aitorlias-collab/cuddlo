'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

type Product = 'camiseta' | 'sudadera' | 'tote'
type Finish  = 'impreso' | 'bordado'
type Gender  = 'mujer' | 'hombre'
type Color   = 'crema' | 'blanco' | 'negro'
type Size    = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

interface CartItem {
  id: string
  product: Product
  productName: string
  finish: Finish
  gender: Gender | null
  color: Color
  colorLabel: string
  size: Size | null
  price: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { id: 'camiseta' as const, name: 'Camiseta', badge: 'Impreso / Bordado', priceImpreso: 39, priceBordado: 49  },
  { id: 'sudadera' as const, name: 'Sudadera', badge: 'Impreso / Bordado', priceImpreso: 55, priceBordado: 69  },
  { id: 'tote'     as const, name: 'Tote Bag', badge: 'Solo impreso',       priceImpreso: 25, priceBordado: null },
]

const COLORS: { id: Color; label: string; hex: string; ring: string }[] = [
  { id: 'crema',  label: 'Crema',  hex: '#F5EFE6', ring: '#C4A882' },
  { id: 'blanco', label: 'Blanco', hex: '#FFFFFF',  ring: '#C4A882' },
  { id: 'negro',  label: 'Negro',  hex: '#1A1A1A',  ring: '#555555' },
]

const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const WEAR_STEPS = [
  { number: '01', icon: '📸', title: 'Elige tus prendas y sube fotos de tu mascota',      description: 'Configura cada prenda por separado y sube 3–8 fotos claras desde distintos ángulos.' },
  { number: '02', icon: '✏️', title: 'Aprueba la ilustración antes de producir',          description: 'En menos de 48h recibes la ilustración. Si no te convence, la ajustamos sin coste.' },
  { number: '03', icon: '📦', title: 'Recíbelas en casa en 7–10 días',                    description: 'Una vez aprobada, fabricamos todas las prendas de tu pedido. Etiqueta interior Cuddlo.' },
]

// ─── Utilities ────────────────────────────────────────────────────────────────

function getPrice(product: Product, finish: Finish): number {
  const p = PRODUCTS.find(x => x.id === product)!
  return finish === 'bordado' && p.priceBordado ? p.priceBordado : p.priceImpreso
}

function itemDescription(item: CartItem): string {
  return [
    item.finish === 'impreso' ? 'Impreso' : 'Bordado',
    item.gender ? `Corte ${item.gender}` : null,
    item.colorLabel,
    item.size ? `Talla ${item.size}` : null,
  ].filter(Boolean).join(' · ')
}

// Smooth scroll to a ref with navbar offset + optional delay
function scrollToRef(ref: React.RefObject<HTMLElement | null>, delay = 200) {
  setTimeout(() => {
    if (!ref.current) return
    const top = ref.current.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }, delay)
}

// ─── Sub-components ───────────────────────────────────────────────────────────

// Animated step section — fades in when visible
function RevealSection({
  visible,
  sectionRef,
  children,
}: {
  visible: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sectionRef: React.RefObject<any>
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Step heading with number bubble + inline summary when done
function StepHeading({
  step,
  label,
  done,
  summary,
}: {
  step: number
  label: string
  done: boolean
  summary?: string
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <motion.span
          animate={{ backgroundColor: done ? '#8B5E3C' : '#E8DDD4', color: done ? '#F5EFE6' : '#8B5E3C' }}
          transition={{ duration: 0.3 }}
          className="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0"
        >
          {done ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6.5l3 3 5-5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : step}
        </motion.span>
        <h3 className="font-serif font-semibold text-ink text-lg leading-tight">{label}</h3>
      </div>
      <AnimatePresence>
        {done && summary && (
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-brown font-medium text-right ml-4 shrink-0"
          >
            {summary}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

// Product icon SVGs
function ProductIcon({ id }: { id: Product }) {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {id === 'tote' ? (
        <>
          <rect x="10" y="20" width="28" height="22" rx="2" stroke="#8B5E3C" strokeOpacity="0.55" strokeWidth="1.5" />
          <path d="M17 20C17 14 31 14 31 20" stroke="#8B5E3C" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : id === 'sudadera' ? (
        <path d="M14 13L6 22l7 2v13h22V24l7-2-8-11-5 4c-2.5 1.5-7.5 1.5-10 0z"
              stroke="#8B5E3C" strokeOpacity="0.55" strokeWidth="1.5" strokeLinejoin="round" />
      ) : (
        <path d="M16 11L8 20l7 2v15h18V22l7-2-8-11-4 4c-2 1.5-6 1.5-8 0z"
              stroke="#8B5E3C" strokeOpacity="0.55" strokeWidth="1.5" strokeLinejoin="round" />
      )}
    </svg>
  )
}

// Cart item row
function CartRow({ item, onRemove }: { item: CartItem; onRemove: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex items-center gap-4 py-4 border-b border-sand/20 last:border-0"
    >
      <div className="w-10 h-10 rounded-xl bg-[#EDE3D8] flex items-center justify-center shrink-0">
        <ProductIcon id={item.product} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-ink">{item.productName}</p>
        <p className="text-xs text-ink/50 mt-0.5 truncate">{itemDescription(item)}</p>
      </div>
      <p className="font-serif font-semibold text-brown text-base shrink-0">{item.price}€</p>
      <button
        onClick={onRemove}
        aria-label={`Eliminar ${item.productName}`}
        className="w-6 h-6 rounded-full bg-sand/20 text-ink/40 hover:bg-red-100 hover:text-red-500
                   flex items-center justify-center text-sm transition-colors duration-150 shrink-0"
      >
        ×
      </button>
    </motion.div>
  )
}

// How it works step card
function StepCard({ step, index }: { step: typeof WEAR_STEPS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="bg-cream rounded-2xl p-8 flex flex-col gap-5 shadow-[0_2px_16px_rgba(44,24,16,0.07)]"
    >
      <span className="font-serif text-[4rem] font-bold leading-none text-sand select-none">{step.number}</span>
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
  // Configurator state — each step nullable until selected
  const [product, setProduct] = useState<Product | null>(null)
  const [finish,  setFinish]  = useState<Finish | null>(null)
  const [gender,  setGender]  = useState<Gender | null>(null)
  const [color,   setColor]   = useState<Color | null>(null)
  const [size,    setSize]    = useState<Size | null>(null)

  // Cart
  const [cart, setCart] = useState<CartItem[]>([])
  const [justAdded, setJustAdded] = useState(false)

  // Section refs for guided scroll
  const productRef = useRef<HTMLDivElement>(null)
  const finishRef  = useRef<HTMLDivElement>(null)
  const genderRef  = useRef<HTMLDivElement>(null)
  const colorRef   = useRef<HTMLDivElement>(null)
  const sizeRef    = useRef<HTMLDivElement>(null)
  const addBtnRef  = useRef<HTMLDivElement>(null)
  const cartRef    = useRef<HTMLDivElement>(null)

  const isTote = product === 'tote'

  // Step visibility — each section only appears when previous is complete
  const showFinish  = product !== null && !isTote
  const showGender  = showFinish && finish !== null
  const showColor   = (isTote && product !== null) || (showGender && gender !== null)
  const showSize    = !isTote && showColor && color !== null
  const isComplete  = isTote
    ? product !== null && color !== null
    : product !== null && finish !== null && gender !== null && color !== null && size !== null

  // Step numbers adapt when tote (no finish/gender steps)
  const colorStep = isTote ? 2 : 4
  const sizeStep  = 5

  // ── Handlers with guided scroll ──

  function handleProduct(id: Product) {
    const changed = id !== product
    setProduct(id)
    if (changed) { setFinish(null); setGender(null); setColor(null); setSize(null) }
    scrollToRef(id === 'tote' ? colorRef : finishRef, 220)
  }

  function handleFinish(f: Finish) {
    setFinish(f)
    scrollToRef(genderRef, 200)
  }

  function handleGender(g: Gender) {
    setGender(g)
    scrollToRef(colorRef, 200)
  }

  function handleColor(c: Color) {
    setColor(c)
    scrollToRef(isTote ? addBtnRef : sizeRef, 200)
  }

  function handleSize(s: Size) {
    setSize(s)
    scrollToRef(addBtnRef, 200)
  }

  // ── Add to cart ──

  function handleAddToCart() {
    if (!isComplete || !product || !color) return

    const productData  = PRODUCTS.find(p => p.id === product)!
    const colorData    = COLORS.find(c => c.id === color)!
    const effectFinish: Finish = isTote ? 'impreso' : (finish ?? 'impreso')

    const item: CartItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      product,
      productName: productData.name,
      finish: effectFinish,
      gender: isTote ? null : gender,
      color,
      colorLabel: colorData.label,
      size: isTote ? null : size,
      price: getPrice(product, effectFinish),
    }

    setCart(prev => [...prev, item])
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2200)

    // Reset configurator for next item
    setProduct(null); setFinish(null); setGender(null); setColor(null); setSize(null)

    // Scroll to cart (with delay so it has time to render)
    setTimeout(() => scrollToRef(cartRef, 50), 320)
  }

  function removeFromCart(id: string) {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-cream pt-32 lg:pt-36 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

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
                  <div className="w-20 h-20 rounded-full bg-cream/25 mx-auto mb-4 flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                      <circle cx="18" cy="18" r="17" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
                      <path d="M11 25C11 20 14 16 18 16c4 0 7 4 7 9" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="18" cy="13" r="3.5" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <p className="text-cream/70 text-sm font-medium">wear-hero.jpg</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONFIGURADOR GUIADO ───────────────────────────────────────────── */}
      <section id="configura" className="bg-[#FAF7F3] py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2
              className="font-serif font-bold text-ink mb-2"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', textWrap: 'balance' } as React.CSSProperties}
            >
              Configura tu pedido
            </h2>
            <p className="text-ink/55 text-base">
              Cada elección te llevará al siguiente paso. Puedes añadir varias prendas antes de continuar.
            </p>
          </motion.div>

          <div className="flex flex-col gap-10">

            {/* ── PASO 1: Prenda ────────────────────────────────────────── */}
            <div ref={productRef}>
              <StepHeading
                step={1}
                label="Elige tu prenda"
                done={product !== null}
                summary={product ? PRODUCTS.find(p => p.id === product)?.name : undefined}
              />
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {PRODUCTS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleProduct(p.id)}
                    className={`rounded-2xl border-2 p-4 sm:p-5 text-left transition-all duration-200
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-brown/40
                      ${product === p.id
                        ? 'border-brown bg-cream shadow-[0_2px_16px_rgba(139,94,60,0.15)]'
                        : 'border-sand/30 bg-cream hover:border-sand/70 hover:shadow-[0_1px_8px_rgba(44,24,16,0.06)]'
                      }`}
                  >
                    <div
                      className="w-full rounded-xl mb-3 flex items-center justify-center"
                      style={{ height: 80, background: product === p.id ? '#EDE3D8' : '#F0EAE0' }}
                    >
                      <ProductIcon id={p.id} />
                    </div>
                    <p className="font-serif font-semibold text-ink text-sm leading-tight">{p.name}</p>
                    <p className="text-brown text-xs mt-0.5">Desde {p.priceImpreso}€</p>
                    <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded-full font-medium mt-1.5
                      ${product === p.id ? 'bg-brown/10 text-brown' : 'bg-sand/20 text-brown/60'}`}>
                      {p.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── PASO 2: Acabado (no tote) ─────────────────────────────── */}
            <RevealSection visible={showFinish} sectionRef={finishRef}>
              <StepHeading
                step={2}
                label="Acabado"
                done={finish !== null}
                summary={finish ? (finish === 'impreso' ? 'Impreso' : 'Bordado (+10€)') : undefined}
              />
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {(['impreso', 'bordado'] as Finish[]).map(f => (
                  <button
                    key={f}
                    onClick={() => handleFinish(f)}
                    className={`rounded-2xl border-2 p-5 text-left transition-all duration-200
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-brown/40
                      ${finish === f
                        ? 'border-brown bg-cream shadow-[0_2px_16px_rgba(139,94,60,0.15)]'
                        : 'border-sand/30 bg-cream hover:border-sand/70'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-serif font-semibold text-ink capitalize">{f}</p>
                      {f === 'bordado' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-brown/10 text-brown font-medium">+10€</span>
                      )}
                    </div>
                    <p className="text-sm text-ink/55 leading-relaxed">
                      {f === 'impreso'
                        ? 'Colores vivos, detalle máximo, acabado suave al tacto.'
                        : 'Textura artesanal, relieve sutil, acabado premium.'}
                    </p>
                  </button>
                ))}
              </div>
            </RevealSection>

            {/* ── PASO 3: Corte (no tote) ───────────────────────────────── */}
            <RevealSection visible={showGender} sectionRef={genderRef}>
              <StepHeading
                step={3}
                label="Corte"
                done={gender !== null}
                summary={gender ? `Corte ${gender}` : undefined}
              />
              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xs">
                {(['mujer', 'hombre'] as Gender[]).map(g => (
                  <button
                    key={g}
                    onClick={() => handleGender(g)}
                    className={`rounded-2xl border-2 py-5 px-4 text-center transition-all duration-200
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-brown/40
                      ${gender === g
                        ? 'border-brown bg-cream shadow-[0_2px_16px_rgba(139,94,60,0.12)]'
                        : 'border-sand/30 bg-cream hover:border-sand/70'
                      }`}
                  >
                    <div className="flex justify-center mb-2">
                      <svg width="36" height="46" viewBox="0 0 40 50" fill="none" aria-hidden="true">
                        {g === 'mujer' ? (
                          <>
                            <ellipse cx="20" cy="9" rx="7" ry="7" stroke="#8B5E3C" strokeOpacity="0.6" strokeWidth="1.5" />
                            <path d="M8 22c0-6 6-8 12-8s12 2 12 8l-2 16H24l-2-8h-4l-2 8H10Z" stroke="#8B5E3C" strokeOpacity="0.6" strokeWidth="1.5" strokeLinejoin="round" />
                          </>
                        ) : (
                          <>
                            <ellipse cx="20" cy="9" rx="7" ry="7" stroke="#8B5E3C" strokeOpacity="0.6" strokeWidth="1.5" />
                            <path d="M6 22c0-6 7-8 14-8s14 2 14 8l-2 20H25l-3-12h-4l-3 12H8Z" stroke="#8B5E3C" strokeOpacity="0.6" strokeWidth="1.5" strokeLinejoin="round" />
                          </>
                        )}
                      </svg>
                    </div>
                    <p className="font-medium text-sm text-ink capitalize">Corte {g}</p>
                  </button>
                ))}
              </div>
            </RevealSection>

            {/* ── PASO 4/2: Color ───────────────────────────────────────── */}
            <RevealSection visible={showColor} sectionRef={colorRef}>
              <StepHeading
                step={colorStep}
                label="Color"
                done={color !== null}
                summary={color ? COLORS.find(c => c.id === color)?.label : undefined}
              />
              <div className="flex gap-6 flex-wrap">
                {COLORS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleColor(c.id)}
                    aria-label={`Color ${c.label}`}
                    className="flex flex-col items-center gap-2 focus:outline-none group"
                  >
                    <div
                      className={`w-11 h-11 rounded-full transition-all duration-200
                        ${color === c.id
                          ? 'ring-2 ring-offset-2 ring-brown scale-110'
                          : 'ring-1 ring-offset-1 ring-sand/30 group-hover:scale-105 group-hover:ring-sand/60'
                        }`}
                      style={{ background: c.hex, border: `1.5px solid ${c.ring}` }}
                    />
                    <span className={`text-xs transition-colors duration-150
                      ${color === c.id ? 'text-brown font-semibold' : 'text-ink/45'}`}>
                      {c.label}
                    </span>
                  </button>
                ))}
              </div>
            </RevealSection>

            {/* ── PASO 5: Talla (no tote) ───────────────────────────────── */}
            <RevealSection visible={showSize} sectionRef={sizeRef}>
              <StepHeading
                step={sizeStep}
                label="Talla"
                done={size !== null}
                summary={size ? `Talla ${size}` : undefined}
              />
              <div className="flex gap-2 flex-wrap">
                {SIZES.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSize(s)}
                    className={`w-14 h-14 rounded-xl border-2 text-sm font-medium transition-all duration-200
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-brown/40
                      ${size === s
                        ? 'border-brown bg-brown text-cream shadow-[0_2px_12px_rgba(139,94,60,0.25)]'
                        : 'border-sand/40 bg-cream text-ink/70 hover:border-sand hover:text-ink'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-xs text-ink/35 mt-3">¿Dudas con la talla? Elige la siguiente.</p>
            </RevealSection>

            {/* ── AÑADIR AL PEDIDO ──────────────────────────────────────── */}
            <RevealSection visible={isComplete} sectionRef={addBtnRef}>
              <div className="bg-cream rounded-2xl border border-sand/30 p-5 sm:p-6
                              shadow-[0_2px_16px_rgba(44,24,16,0.07)]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-ink/40 uppercase tracking-widest mb-1">Esta prenda</p>
                    <p className="font-serif font-semibold text-ink">
                      {product ? PRODUCTS.find(p => p.id === product)?.name : ''}
                      {!isTote && gender ? ` · Corte ${gender}` : ''}
                      {finish ? ` · ${finish === 'impreso' ? 'Impreso' : 'Bordado'}` : ''}
                      {color ? ` · ${COLORS.find(c => c.id === color)?.label}` : ''}
                      {size ? ` · ${size}` : ''}
                    </p>
                    <p className="text-brown font-bold text-2xl font-serif mt-1">
                      {product && (isTote ? 'impreso' : finish)
                        ? getPrice(product, isTote ? 'impreso' : (finish ?? 'impreso')) + '€'
                        : ''}
                    </p>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="bg-brown text-cream px-7 py-3.5 rounded-full text-sm font-medium
                               hover:bg-[#7A5235] transition-colors duration-200 whitespace-nowrap"
                  >
                    + Añadir al pedido
                  </button>
                </div>
              </div>
            </RevealSection>

            {/* ── CARRITO ───────────────────────────────────────────────── */}
            <AnimatePresence>
              {(cart.length > 0 || justAdded) && (
                <motion.div
                  ref={cartRef}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border-2 border-brown/20 bg-cream overflow-hidden
                             shadow-[0_4px_24px_rgba(139,94,60,0.1)]"
                >
                  {/* Cart header */}
                  <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-sand/20 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-brown text-cream text-xs font-bold flex items-center justify-center">
                        {cart.length}
                      </span>
                      <p className="font-serif font-semibold text-ink text-base">
                        {cart.length === 1 ? '1 prenda añadida' : `${cart.length} prendas añadidas`}
                      </p>
                    </div>
                    {/* Flash "añadido" confirmation */}
                    <AnimatePresence>
                      {justAdded && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-brown font-medium flex items-center gap-1"
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6.5l3 3 5-5.5" stroke="#8B5E3C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Añadida
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Cart items */}
                  <div className="px-5 sm:px-6">
                    <AnimatePresence>
                      {cart.map(item => (
                        <CartRow key={item.id} item={item} onRemove={() => removeFromCart(item.id)} />
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Total + CTAs */}
                  <div className="px-5 sm:px-6 py-5 bg-[#FAF7F3] border-t border-sand/20">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-ink/55 text-sm">Total del pedido</p>
                      <p className="font-serif font-bold text-ink text-2xl">{total}€</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => scrollToRef(productRef, 0)}
                        className="flex-1 py-3 rounded-full border-2 border-sand/50 text-brown text-sm font-medium
                                   hover:border-brown/50 hover:bg-brown/5 transition-colors duration-200 text-center"
                      >
                        + Añadir otra prenda
                      </button>
                      <button
                        onClick={() => {
                          localStorage.setItem('cuddlo_cart', JSON.stringify(cart))
                          window.location.href = '/register'
                        }}
                        className="flex-1 py-3 rounded-full bg-brown text-cream text-sm font-medium
                                   hover:bg-[#7A5235] transition-colors duration-200 text-center"
                      >
                        Continuar con el diseño →
                      </button>
                    </div>
                    <p className="text-xs text-ink/35 text-center mt-3">
                      Sin pago hasta aprobar la ilustración
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* ── PRECIOS ───────────────────────────────────────────────────────── */}
      <section className="bg-cream py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2
              className="font-serif font-bold text-ink mb-2"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)' } as React.CSSProperties}
            >
              Precios
            </h2>
            <p className="text-ink/55 text-base max-w-[48ch]">
              Sin sorpresas. El precio incluye la ilustración personalizada y el envío a toda España.
            </p>
          </motion.div>

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
                    <td className="px-6 py-4 text-center font-semibold text-brown">{p.priceImpreso}€</td>
                    <td className="px-6 py-4 text-center">
                      {p.priceBordado
                        ? <span className="font-semibold text-brown">{p.priceBordado}€</span>
                        : <span className="text-ink/30">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink/35 mt-3">
            Todos los precios incluyen ilustración personalizada y etiqueta interior Cuddlo. Envío estándar incluido en España peninsular.
          </p>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ─────────────────────────────────────────────────── */}
      <section className="bg-lavender py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2
              className="font-serif font-bold text-ink mb-2"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)' } as React.CSSProperties}
            >
              Cómo funciona
            </h2>
            <p className="text-ink/60 text-base max-w-[48ch]">
              Tres pasos y tus prendas favoritas llevan a tu mascota contigo.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {WEAR_STEPS.map((step, i) => <StepCard key={i} step={step} index={i} />)}
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
              <p className="text-ink/45 text-sm mt-5">Cada prenda incluye etiqueta interior Cuddlo.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
              className="grid grid-cols-2 gap-4"
            >
              {[{ label: 'Foto real', bg: '#D4C4B0' }, { label: 'En la prenda', bg: '#C4A882' }].map(item => (
                <div
                  key={item.label}
                  className="rounded-2xl flex items-center justify-center flex-col gap-2
                             shadow-[0_2px_16px_rgba(44,24,16,0.1)]"
                  style={{ background: item.bg, aspectRatio: '3/4' }}
                >
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <circle cx="18" cy="18" r="17" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" />
                    <path d="M11 25c0-5 3-9 7-9s7 4 7 9" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="18" cy="13" r="3.5" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" />
                  </svg>
                  <p className="text-cream/70 text-xs font-medium">{item.label}</p>
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
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)', lineHeight: 1.08, textWrap: 'balance' } as React.CSSProperties}
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
