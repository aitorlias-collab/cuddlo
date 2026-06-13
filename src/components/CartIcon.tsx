'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'

export default function CartIcon() {
  const { itemCount, openCart } = useCart()

  return (
    <button
      onClick={openCart}
      aria-label={`Carrito${itemCount > 0 ? ` — ${itemCount} producto${itemCount !== 1 ? 's' : ''}` : ''}`}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl
                 hover:bg-sand/15 transition-colors duration-150"
    >
      {/* Shopping bag */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-ink">
        <path
          d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        />
        <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M16 10a4 4 0 01-8 0"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>

      {/* Badge */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full
                       bg-brown text-cream text-[10px] font-bold px-1
                       flex items-center justify-center leading-none pointer-events-none"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
