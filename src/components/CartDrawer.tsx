'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const { isOpen, closeCart, lines, total, itemCount, checkoutUrl, removeItem, isLoading, cartError, clearCartError } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-[60] flex flex-col
                       bg-[#F5EFE6] shadow-[-8px_0_32px_rgba(44,24,16,0.14)]"
            aria-label="Carrito de compra"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#C4A882]/25">
              <div className="flex items-center gap-3">
                <h2 className="font-serif font-bold text-ink text-xl">Tu carrito</h2>
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key="count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="w-5 h-5 rounded-full bg-brown text-cream text-xs font-bold
                                 flex items-center justify-center"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="w-9 h-9 rounded-full bg-[#C4A882]/20 hover:bg-[#C4A882]/40 transition-colors
                           flex items-center justify-center text-ink/60 hover:text-ink"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Error banner */}
            {cartError && (
              <div className="mx-6 mt-4 flex items-start gap-3 rounded-xl bg-red-100 px-4 py-3">
                <p className="flex-1 text-sm text-red-700">{cartError}</p>
                <button
                  onClick={clearCartError}
                  aria-label="Cerrar error"
                  className="text-red-400 hover:text-red-600 shrink-0"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center pb-16">
                  <div className="w-16 h-16 rounded-full bg-[#C4A882]/20 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                      <path d="M9 11V7a5 5 0 0110 0v4" stroke="#8B5E3C" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
                      <rect x="4" y="11" width="20" height="14" rx="2" stroke="#8B5E3C" strokeOpacity="0.5" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <p className="font-serif font-semibold text-ink text-lg">Tu carrito está vacío</p>
                  <p className="text-sm text-ink/50">Añade algún producto para comenzar</p>
                  <button
                    onClick={closeCart}
                    className="mt-2 bg-brown text-cream px-6 py-3 rounded-full text-sm font-medium
                               hover:bg-[#7A5235] transition-colors duration-200"
                  >
                    Seguir explorando
                  </button>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-[#C4A882]/20">
                  <AnimatePresence initial={false}>
                    {lines.map(line => (
                      <motion.div
                        key={line.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 py-4"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl bg-[#EDE3D8] flex items-center justify-center shrink-0 overflow-hidden">
                          {line.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={line.image}
                              alt={line.productTitle}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M20 7H4a1 1 0 00-1 1v11a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z"
                                    stroke="#8B5E3C" strokeOpacity="0.5" strokeWidth="1.5" strokeLinejoin="round" />
                              <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
                                    stroke="#8B5E3C" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-ink leading-snug">{line.productTitle}</p>
                          {line.variantTitle !== 'Default Title' && (
                            <p className="text-xs text-ink/50 mt-0.5 truncate">{line.variantTitle}</p>
                          )}
                          {line.attributes.length > 0 && (
                            <p className="text-xs text-ink/40 mt-0.5 truncate">
                              {line.attributes.map(a => a.value).join(' · ')}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-1.5">
                            <p className="font-serif font-semibold text-brown text-base">
                              {line.price.toFixed(2).replace('.', ',')}€
                            </p>
                            <span className="text-xs text-ink/40">× {line.quantity}</span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(line.id)}
                          aria-label={`Eliminar ${line.productTitle}`}
                          disabled={isLoading}
                          className="w-7 h-7 rounded-full bg-[#C4A882]/20 hover:bg-red-100 hover:text-red-500
                                     text-ink/40 flex items-center justify-center transition-colors shrink-0
                                     self-start mt-0.5 disabled:opacity-50"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="border-t border-[#C4A882]/25 px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-ink/60 text-sm">Total</p>
                  <p className="font-serif font-bold text-ink text-2xl">
                    {total.toFixed(2).replace('.', ',')}€
                  </p>
                </div>
                <button
                  onClick={() => { if (checkoutUrl) window.location.href = checkoutUrl }}
                  disabled={!checkoutUrl || isLoading}
                  className="w-full bg-brown text-cream py-4 rounded-full text-sm font-medium text-center
                             hover:bg-[#7A5235] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Cargando…' : 'Finalizar compra →'}
                </button>
                <p className="text-xs text-ink/35 text-center mt-3">
                  Pago seguro · Envío a toda España
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
