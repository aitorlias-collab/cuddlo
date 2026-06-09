'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'cuddlo_cookies'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const t = setTimeout(() => setShow(true), 1500)
    return () => clearTimeout(t)
  }, [])

  const save = (analytics: boolean) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics, essential: true }))
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Aviso de cookies"
          className="fixed bottom-6 left-4 right-4
                     md:left-6 md:right-auto md:w-full md:max-w-[480px]
                     z-[9998] bg-ink rounded-2xl
                     shadow-[0_8px_48px_rgba(44,24,16,0.45),0_2px_12px_rgba(44,24,16,0.25)]
                     p-6 flex flex-col gap-5"
        >
          <p className="text-sm text-cream/75 leading-relaxed">
            Usamos cookies para mejorar tu experiencia. Puedes aceptarlas o rechazar las no
            esenciales.{' '}
            <a
              href="/cookies"
              className="text-sand hover:underline underline-offset-2 transition-colors duration-200"
            >
              Política de cookies
            </a>
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => save(true)}
              className="flex-1 bg-sand text-ink py-2.5 rounded-full text-sm font-medium
                         hover:bg-[#B8976F] transition-colors duration-200"
            >
              Aceptar
            </button>
            <button
              onClick={() => save(false)}
              className="flex-1 border border-cream/25 text-cream py-2.5 rounded-full text-sm font-medium
                         hover:bg-cream/10 transition-colors duration-200"
            >
              Solo esenciales
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
