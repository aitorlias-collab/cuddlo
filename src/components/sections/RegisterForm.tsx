'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import ProgressBar from '@/components/ui/ProgressBar'

interface LeadData {
  nombre: string
  email: string
  mascota: string
  tipo: string
}

interface FormErrors {
  nombre?: string
  email?: string
  mascota?: string
}


function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-brown">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border bg-cream/60 text-ink placeholder-ink/30 text-sm ' +
  'focus:outline-none transition-colors duration-200 ' +
  'border-sand focus:border-brown focus:ring-1 focus:ring-brown'

const inputErrorClass =
  'w-full px-4 py-3 rounded-xl border bg-cream/60 text-ink placeholder-ink/30 text-sm ' +
  'focus:outline-none transition-colors duration-200 ' +
  'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400'

export default function RegisterForm() {
  const router = useRouter()

  const [form, setForm] = useState<LeadData>({
    nombre: '',
    email: '',
    mascota: '',
    tipo: 'Perro',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  function set(field: keyof LeadData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }
  }

  function validate(): boolean {
    const next: FormErrors = {}

    if (!form.nombre.trim()) next.nombre = 'Campo obligatorio'
    if (!form.email.trim()) {
      next.email = 'Campo obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Introduce un email válido'
    }
    if (!form.mascota.trim()) next.mascota = 'Campo obligatorio'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    localStorage.setItem('cuddlo_lead', JSON.stringify({ ...form, ts: Date.now() }))
    router.push('/upload')
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center pt-28 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[480px]"
      >
        {/* Progress */}
        <ProgressBar active={0} />

        {/* Card */}
        <div
          className="rounded-2xl p-8 sm:p-10"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 24px rgba(44, 24, 16, 0.08)',
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-[2rem] font-bold text-ink leading-tight mb-2">
              Crea tu Cuddlo
            </h1>
            <p className="text-sm text-ink/55">
              Es gratis hasta que apruebes el render.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <Field label="Nombre completo" error={errors.nombre}>
              <input
                type="text"
                value={form.nombre}
                onChange={set('nombre')}
                placeholder="Tu nombre"
                autoComplete="name"
                className={errors.nombre ? inputErrorClass : inputClass}
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="tu@email.com"
                autoComplete="email"
                inputMode="email"
                className={errors.email ? inputErrorClass : inputClass}
              />
            </Field>

            <Field label="Nombre de tu mascota" error={errors.mascota}>
              <input
                type="text"
                value={form.mascota}
                onChange={set('mascota')}
                placeholder="¿Cómo se llama?"
                className={errors.mascota ? inputErrorClass : inputClass}
              />
            </Field>

            <Field label="Tipo de mascota">
              <div className="relative">
                <select
                  value={form.tipo}
                  onChange={set('tipo')}
                  className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                >
                  <option value="Perro">🐕 Perro</option>
                  <option value="Gato">🐈 Gato</option>
                  <option value="Otro">🐾 Otro</option>
                </select>
                {/* Custom chevron */}
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M3 5l4 4 4-4"
                      stroke="#C4A882"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </Field>

            {/* CTA */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 bg-brown text-cream py-4 rounded-full text-base font-medium
                         hover:bg-[#7A5235] transition-colors duration-200
                         disabled:opacity-60 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-cream/40 border-t-cream rounded-full animate-spin" />
                  Guardando...
                </>
              ) : (
                'Siguiente → Sube las fotos'
              )}
            </button>
          </form>

          {/* Trust note */}
          <p className="text-center text-xs text-ink/40 mt-5">
            🔒 Tus datos están seguros. No compartimos tu información.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
