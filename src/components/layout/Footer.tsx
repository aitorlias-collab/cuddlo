'use client'

import { useLanguage } from '@/hooks/useLanguage'

export default function Footer() {
  const { t } = useLanguage()
  const { legal, tagline, rights } = t.footer

  return (
    <footer className="bg-cream border-t border-[#C4A882]/30 py-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-serif text-xl font-bold text-[#8B5E3C]">Cuddlo</span>
            <p className="text-xs text-[#2C1810]/50 text-center sm:text-left">{tagline}</p>
          </div>

          <nav className="flex items-center gap-5 text-sm text-[#8B5E3C]">
            <a href={legal.privacyHref} className="hover:underline transition-all duration-150">
              {legal.privacy}
            </a>
            <span className="text-[#C4A882]" aria-hidden="true">·</span>
            <a href={legal.cookiesHref} className="hover:underline transition-all duration-150">
              {legal.cookies}
            </a>
            <span className="text-[#C4A882]" aria-hidden="true">·</span>
            <a href={legal.termsHref} className="hover:underline transition-all duration-150">
              {legal.terms}
            </a>
          </nav>

        </div>

        <p className="mt-8 text-center text-xs text-[#2C1810]/35">{rights}</p>
      </div>
    </footer>
  )
}
