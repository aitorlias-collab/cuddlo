'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import CartIcon from '@/components/CartIcon'
import { useLanguage } from '@/hooks/useLanguage'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t, lang, setLang } = useLanguage()

  const NAV_LINKS = [
    { label: t.nav.plush,   href: '/plush' },
    { label: t.nav.wear,    href: '/wear' },
    { label: t.nav.pricing, href: '/pricing' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-cream/90 backdrop-blur-md border-b border-sand/25 shadow-[0_1px_8px_rgba(44,24,16,0.06)]'
          : 'bg-cream'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="font-serif text-[1.85rem] font-bold text-brown tracking-tight select-none leading-none">
          Cuddlo
        </a>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href
            return (
              <a
                key={href}
                href={href}
                className={`text-base transition-colors duration-200 ${
                  active
                    ? 'text-brown font-medium'
                    : 'text-ink/60 hover:text-ink'
                }`}
              >
                {label}
              </a>
            )
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language selector — desktop */}
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label="Cambiar idioma"
            className="hidden md:flex items-center text-xs font-medium select-none"
          >
            <span className={lang === 'es' ? 'text-brown font-semibold' : 'text-ink/40 hover:text-ink/70 transition-colors'}>ES</span>
            <span className="mx-1 text-sand">|</span>
            <span className={lang === 'en' ? 'text-brown font-semibold' : 'text-ink/40 hover:text-ink/70 transition-colors'}>EN</span>
          </button>

          {/* Cart icon */}
          <CartIcon />

          {/* CTA — desktop */}
          <a
            href="/register"
            className="hidden md:inline-flex bg-brown text-cream px-6 py-2.5 rounded-full text-sm font-medium
                       hover:bg-[#7A5235] transition-colors duration-200"
          >
            {t.nav.cta}
          </a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5
                       rounded-xl hover:bg-sand/15 transition-colors duration-150"
          >
            <span
              className={`block w-5 h-0.5 bg-ink rounded-full transition-all duration-200 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-ink rounded-full transition-all duration-200 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-ink rounded-full transition-all duration-200 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-sand/20 bg-cream px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href
            return (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-base py-1 transition-colors duration-200 ${
                  active ? 'text-brown font-medium' : 'text-ink/65 hover:text-ink'
                }`}
              >
                {label}
              </a>
            )
          })}

          {/* Language selector — mobile */}
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="text-left text-sm font-medium py-1"
          >
            <span className={lang === 'es' ? 'text-brown font-semibold' : 'text-ink/45'}>ES</span>
            <span className="mx-1 text-sand">|</span>
            <span className={lang === 'en' ? 'text-brown font-semibold' : 'text-ink/45'}>EN</span>
          </button>

          <a
            href="/register"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-brown text-cream px-6 py-3 rounded-full text-sm font-medium text-center
                       hover:bg-[#7A5235] transition-colors duration-200"
          >
            {t.nav.cta}
          </a>
        </div>
      )}
    </motion.nav>
  )
}
