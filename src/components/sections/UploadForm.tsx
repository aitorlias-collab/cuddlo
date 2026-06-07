'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressBar from '@/components/ui/ProgressBar'

const UPLOADCARE_PUB_KEY = 'demopublickey'
const MIN_PHOTOS = 3
const MAX_PHOTOS = 8

interface Photo {
  id: string
  cdnUrl: string
  preview: string
  name: string
}

const TIPS = [
  { icon: '📸', label: 'De frente' },
  { icon: '👤', label: 'De perfil' },
  { icon: '🔍', label: 'Detalle del pelaje' },
]

async function uploadToUploadcare(file: File): Promise<{ uuid: string; cdnUrl: string }> {
  const fd = new FormData()
  fd.append('UPLOADCARE_PUB_KEY', UPLOADCARE_PUB_KEY)
  fd.append('UPLOADCARE_STORE', 'auto')
  fd.append('file', file)

  const res = await fetch('https://upload.uploadcare.com/base/', {
    method: 'POST',
    body: fd,
  })
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`)
  const data: { file: string } = await res.json()
  return { uuid: data.file, cdnUrl: `https://ucarecdn.com/${data.file}/` }
}

export default function UploadForm() {
  const router = useRouter()
  const [petName, setPetName] = useState('')
  const [photos, setPhotos] = useState<Photo[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const previewUrls = useRef<string[]>([])

  // Load pet name from prior step
  useEffect(() => {
    try {
      const lead = JSON.parse(localStorage.getItem('cuddlo_lead') ?? '{}')
      if (lead.mascota) setPetName(lead.mascota)
    } catch {}
  }, [])

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => { previewUrls.current.forEach(URL.revokeObjectURL) }
  }, [])

  const onDrop = useCallback(
    async (accepted: File[]) => {
      const slots = MAX_PHOTOS - photos.length
      if (slots <= 0) return
      const batch = accepted.slice(0, slots)
      setUploading(true)
      setError(null)

      try {
        const uploaded = await Promise.all(
          batch.map(async (file) => {
            const preview = URL.createObjectURL(file)
            previewUrls.current.push(preview)
            const { uuid, cdnUrl } = await uploadToUploadcare(file)
            return { id: uuid, cdnUrl, preview, name: file.name }
          })
        )
        setPhotos((prev) => [...prev, ...uploaded])
      } catch {
        setError('Error subiendo alguna foto. Comprueba tu conexión e inténtalo de nuevo.')
      } finally {
        setUploading(false)
      }
    },
    [photos.length]
  )

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const found = prev.find((p) => p.id === id)
      if (found) URL.revokeObjectURL(found.preview)
      return prev.filter((p) => p.id !== id)
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    disabled: photos.length >= MAX_PHOTOS || uploading,
    multiple: true,
  })

  const canSubmit = photos.length >= MIN_PHOTOS && !uploading

  function handleNext() {
    if (!canSubmit) return
    localStorage.setItem('cuddlo_photos', JSON.stringify(photos.map((p) => p.cdnUrl)))
    router.push('/confirm')
  }

  const remaining = MIN_PHOTOS - photos.length

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center pt-28 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[560px]"
      >
        <ProgressBar active={1} />

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-[2rem] font-bold text-ink leading-tight mb-2">
            Sube las fotos de {petName || 'tu mascota'}
          </h1>
          <p className="text-sm text-ink/55 max-w-[44ch] mx-auto leading-relaxed">
            Entre 3 y 8 fotos desde diferentes ángulos. Cuantas más, más fiel será la réplica.
          </p>
        </div>

        {/* Tips */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {TIPS.map((tip) => (
            <span
              key={tip.label}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                         text-sm text-brown bg-cream border border-sand/40"
            >
              <span aria-hidden="true">{tip.icon}</span>
              {tip.label}
            </span>
          ))}
        </div>

        {/* Drop zone */}
        <AnimatePresence>
          {photos.length < MAX_PHOTOS && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-10 text-center mb-6
                            transition-colors duration-200
                            ${isDragActive
                              ? 'border-brown bg-brown/5 cursor-copy'
                              : photos.length >= MAX_PHOTOS || uploading
                              ? 'border-sand/30 bg-cream/50 cursor-not-allowed opacity-50'
                              : 'border-sand hover:border-brown hover:bg-sand/5 cursor-pointer'
                            }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-3 select-none pointer-events-none">
                  <span className="text-4xl" aria-hidden="true">
                    {isDragActive ? '📂' : '📷'}
                  </span>
                  <p className="text-sm font-medium text-brown">
                    {isDragActive
                      ? 'Suelta aquí las fotos'
                      : 'Arrastra las fotos o haz clic para seleccionar'}
                  </p>
                  <p className="text-xs text-ink/35">JPG, PNG o WEBP</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Uploading indicator */}
        {uploading && (
          <div className="flex items-center justify-center gap-2 mb-5 text-sm text-brown">
            <span className="w-4 h-4 border-2 border-brown/25 border-t-brown rounded-full animate-spin" />
            Subiendo fotos...
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-700 text-sm text-center mb-5" role="alert">
            {error}
          </p>
        )}

        {/* Photo grid */}
        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <AnimatePresence>
              {photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.preview}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    aria-label={`Eliminar ${photo.name}`}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full
                               bg-ink/75 text-cream text-xs font-bold
                               flex items-center justify-center
                               opacity-0 group-hover:opacity-100
                               hover:bg-ink transition-all duration-150"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Counter + CTA */}
        <div className="flex flex-col items-center gap-4">
          <p className={`text-sm font-medium tabular-nums ${photos.length >= MIN_PHOTOS ? 'text-brown' : 'text-ink/45'}`}>
            {photos.length}/{MAX_PHOTOS} fotos subidas
          </p>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canSubmit}
            className={`w-full py-4 rounded-full text-base font-medium transition-all duration-200
                        ${canSubmit
                          ? 'bg-brown text-cream hover:bg-[#7A5235]'
                          : 'bg-ink/10 text-ink/30 cursor-not-allowed'
                        }`}
          >
            Siguiente → Confirmar pedido
          </button>

          {remaining > 0 && (
            <p className="text-xs text-ink/40">
              Sube {remaining} foto{remaining !== 1 ? 's' : ''} más para continuar
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
