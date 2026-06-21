'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { es } from '@/i18n/es'
import { en } from '@/i18n/en'

export type Lang = 'es' | 'en'

const translations = { es, en } as const

type LanguageContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: typeof es
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
  t: es,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es')

  useEffect(() => {
    const saved = localStorage.getItem('cuddlo_lang')
    if (saved === 'es' || saved === 'en') {
      setLangState(saved)
    } else {
      const detected: Lang = navigator.language.startsWith('en') ? 'en' : 'es'
      setLangState(detected)
    }
  }, [])

  function setLang(newLang: Lang) {
    setLangState(newLang)
    localStorage.setItem('cuddlo_lang', newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
