'use client'

import { useEffect, useRef, useState } from 'react'

const PRODUCTS = [
  { label: 'Cuddlo Esencial', price: 129 },
  { label: 'Cuddlo Regalo',   price: 155 },
  { label: 'Cuddlo Completo', price: 179 },
  { label: 'Camiseta',        price: 39  },
  { label: 'Camiseta Bordada', price: 49 },
  { label: 'Sudadera',        price: 55  },
  { label: 'Sudadera Bordada', price: 69 },
  { label: 'Tote Bag',        price: 25  },
]

const IMAGE_SLOTS = [
  { label: 'Render del diseño', required: true },
  { label: 'Mockup en prenda',  required: false },
  { label: 'Detalle',           required: false },
]

type SlotState = { url: string; progress: number | null; error: string; preview: string }
const emptySlot = (): SlotState => ({ url: '', progress: null, error: '', preview: '' })

const style = {
  page:        { minHeight: '100vh', background: '#2C1810', padding: '0 0 80px' } as React.CSSProperties,
  card:        { maxWidth: 600, margin: '0 auto', padding: '0 24px' } as React.CSSProperties,
  header:      { padding: '40px 0 36px', borderBottom: '1px solid rgba(196,168,130,0.2)' } as React.CSSProperties,
  logo:        { margin: 0, fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 700, color: '#F5EFE6' } as React.CSSProperties,
  subtitle:    { margin: '4px 0 0', fontSize: 13, color: '#C4A882', letterSpacing: '0.06em', textTransform: 'uppercase' as const },
  label:       { display: 'block', fontSize: 12, fontWeight: 600, color: '#C4A882', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 8 } as React.CSSProperties,
  input:       { width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #4A2E1C', background: '#3D2415', color: '#F5EFE6', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const } as React.CSSProperties,
  select:      { width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #4A2E1C', background: '#3D2415', color: '#F5EFE6', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const, appearance: 'none' as const } as React.CSSProperties,
  field:       { display: 'flex', flexDirection: 'column' as const, gap: 0 } as React.CSSProperties,
  btn:         { width: '100%', padding: '15px', borderRadius: 10, background: '#8B5E3C', color: '#F5EFE6', border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.01em' } as React.CSSProperties,
  btnDisabled: { opacity: 0.6, cursor: 'not-allowed' } as React.CSSProperties,
  success:     { padding: '14px 16px', background: 'rgba(16,64,16,0.6)', borderRadius: 8, color: '#86efac', fontSize: 14, textAlign: 'center' as const, border: '1px solid rgba(134,239,172,0.25)' } as React.CSSProperties,
  error:       { padding: '14px 16px', background: 'rgba(64,16,16,0.6)', borderRadius: 8, color: '#fca5a5', fontSize: 14, textAlign: 'center' as const, border: '1px solid rgba(252,165,165,0.25)' } as React.CSSProperties,
  sectionTitle:{ margin: '0 0 20px', fontSize: 11, fontWeight: 700, color: '#8B5E3C', textTransform: 'uppercase' as const, letterSpacing: '0.12em' } as React.CSSProperties,
}

export default function AdminPage() {
  const [checking, setChecking]   = useState(true)
  const [authed, setAuthed]       = useState(false)

  const [password, setPassword]   = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  const [email, setEmail]               = useState('')
  const [nombre, setNombre]             = useState('')
  const [nombreMascota, setNombreMascota] = useState('')
  const [productIdx, setProductIdx]     = useState(0)
  const [checkoutUrl, setCheckoutUrl]   = useState('')
  const [sending, setSending]           = useState(false)
  const [sent, setSent]                 = useState(false)
  const [sentTo, setSentTo]             = useState('')
  const [sendError, setSendError]       = useState('')

  const [slots, setSlots] = useState<SlotState[]>([emptySlot(), emptySlot(), emptySlot()])
  const fileRefs = useRef<(HTMLInputElement | null)[]>([null, null, null])

  useEffect(() => {
    const isAuthed = sessionStorage.getItem('cuddlo_admin') === 'true'
    const savedPassword = sessionStorage.getItem('cuddlo_admin_pw') ?? ''
    setAuthed(isAuthed)
    if (isAuthed && savedPassword) setPassword(savedPassword)
    setChecking(false)
  }, [])

  function updateSlot(i: number, patch: Partial<SlotState>) {
    setSlots(prev => prev.map((s, idx) => idx === i ? { ...s, ...patch } : s))
  }

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        sessionStorage.setItem('cuddlo_admin', 'true')
        sessionStorage.setItem('cuddlo_admin_pw', password)
        setAuthed(true)
      } else {
        const data = await res.json()
        setAuthError(data.error ?? 'Contraseña incorrecta')
      }
    } catch {
      setAuthError('Error de conexión')
    } finally {
      setAuthLoading(false)
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!slots[0].url) { setSendError('Sube al menos la imagen del render (obligatoria)'); return }
    setSending(true)
    setSent(false)
    setSendError('')
    const product = PRODUCTS[productIdx]
    try {
      const res = await fetch('/api/send-render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${password}` },
        body: JSON.stringify({
          email,
          nombre,
          nombreMascota,
          producto: product.label,
          precio: product.price,
          imagenUrl:  slots[0].url,
          imagenUrl2: slots[1].url || undefined,
          imagenUrl3: slots[2].url || undefined,
          checkoutUrl,
        }),
      })
      if (res.ok) {
        setSentTo(email)
        setSent(true)
        setEmail('')
        setNombre('')
        setNombreMascota('')
        setCheckoutUrl('')
        setProductIdx(0)
        setSlots([emptySlot(), emptySlot(), emptySlot()])
        fileRefs.current.forEach(ref => { if (ref) ref.value = '' })
      } else {
        const data = await res.json()
        setSendError(data.error ?? 'Error enviando el render')
      }
    } catch {
      setSendError('Error de conexión')
    } finally {
      setSending(false)
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('cuddlo_admin')
    sessionStorage.removeItem('cuddlo_admin_pw')
    setAuthed(false)
    setPassword('')
  }

  function handleFileSelect(i: number) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      updateSlot(i, { error: '', progress: 0, preview: URL.createObjectURL(file), url: '' })

      const formData = new FormData()
      formData.append('file', file)

      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/api/upload-render')
      xhr.setRequestHeader('Authorization', `Bearer ${password}`)

      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) updateSlot(i, { progress: Math.round((ev.loaded / ev.total) * 100) })
      }
      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText)
          updateSlot(i, { url: data.url, progress: 100 })
        } else {
          let msg = 'Error al subir la imagen'
          try { msg = JSON.parse(xhr.responseText).error ?? msg } catch {}
          updateSlot(i, { error: msg, progress: null, preview: '' })
        }
      }
      xhr.onerror = () => updateSlot(i, { error: 'Error de conexión al subir la imagen', progress: null, preview: '' })
      xhr.send(formData)
    }
  }

  if (checking) return null

  /* ─── Login screen ─── */
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: '#2C1810', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={style.logo}>Cuddlo</p>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#C4A882' }}>Panel de administración</p>
          </div>
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={style.field}>
              <label style={style.label}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
                required
                style={style.input}
              />
            </div>
            {authError && <p style={{ margin: 0, color: '#fca5a5', fontSize: 13, textAlign: 'center' }}>{authError}</p>}
            <button
              type="submit"
              disabled={authLoading}
              style={{ ...style.btn, ...(authLoading ? style.btnDisabled : {}) }}
            >
              {authLoading ? 'Verificando…' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  /* ─── Admin panel ─── */
  const product = PRODUCTS[productIdx]

  return (
    <div style={style.page}>
      <div style={style.card}>

        {/* Header */}
        <div style={{ ...style.header, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={style.logo}>Cuddlo</p>
            <p style={style.subtitle}>Panel de administración</p>
          </div>
          <button
            onClick={handleLogout}
            style={{ background: 'none', border: '1px solid #4A2E1C', borderRadius: 6, color: '#C4A882', fontSize: 13, padding: '7px 14px', cursor: 'pointer' }}
          >
            Salir
          </button>
        </div>

        {/* Form */}
        <div style={{ paddingTop: 36 }}>
          <p style={style.sectionTitle}>Enviar render al cliente</p>
          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            <div style={style.field}>
              <label style={style.label}>Email del cliente</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="cliente@email.com"
                required
                style={style.input}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={style.field}>
                <label style={style.label}>Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="María"
                  required
                  style={style.input}
                />
              </div>
              <div style={style.field}>
                <label style={style.label}>Nombre mascota</label>
                <input
                  type="text"
                  value={nombreMascota}
                  onChange={e => setNombreMascota(e.target.value)}
                  placeholder="Luna"
                  required
                  style={style.input}
                />
              </div>
            </div>

            <div style={style.field}>
              <label style={style.label}>Producto pedido</label>
              <div style={{ position: 'relative' }}>
                <select
                  value={productIdx}
                  onChange={e => setProductIdx(Number(e.target.value))}
                  style={style.select}
                >
                  {PRODUCTS.map((p, i) => (
                    <option key={p.label} value={i}>
                      {p.label} — {p.price}€
                    </option>
                  ))}
                </select>
                <svg
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  width="12" height="8" viewBox="0 0 12 8" fill="none"
                >
                  <path d="M1 1l5 5 5-5" stroke="#C4A882" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p style={{ margin: '8px 0 0', fontSize: 12, color: '#8B5E3C' }}>
                Precio: {product.price}€
              </p>
            </div>

            {/* Image slots */}
            {IMAGE_SLOTS.map((slot, i) => {
              const s = slots[i]
              return (
                <div key={i} style={{ ...style.field, padding: '16px', background: '#3D2415', borderRadius: 10, border: '1px solid #4A2E1C' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label style={{ ...style.label, marginBottom: 0 }}>
                      Imagen {i + 1}: {slot.label}
                    </label>
                    {!slot.required && (
                      <span style={{ fontSize: 11, color: '#8B5E3C', letterSpacing: '0.06em' }}>OPCIONAL</span>
                    )}
                  </div>

                  <input
                    ref={el => { fileRefs.current[i] = el }}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    style={{ display: 'none' }}
                    onChange={handleFileSelect(i)}
                  />

                  <button
                    type="button"
                    onClick={() => { updateSlot(i, { error: '' }); fileRefs.current[i]?.click() }}
                    style={{
                      ...style.btn,
                      background: s.url ? '#3D5C2C' : '#8B5E3C',
                      fontSize: 13,
                      padding: '10px 14px',
                    }}
                  >
                    {s.url ? `✓ ${slot.label} subida — cambiar` : `Subir ${slot.label.toLowerCase()}`}
                  </button>

                  {s.progress !== null && s.progress < 100 && (
                    <div style={{ marginTop: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: '#C4A882' }}>Subiendo…</span>
                        <span style={{ fontSize: 12, color: '#C4A882' }}>{s.progress}%</span>
                      </div>
                      <div style={{ width: '100%', height: 6, background: '#4A2E1C', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${s.progress}%`, height: '100%', background: '#8B5E3C', borderRadius: 3, transition: 'width 0.2s' }} />
                      </div>
                    </div>
                  )}

                  {s.error && (
                    <p style={{ margin: '8px 0 0', color: '#fca5a5', fontSize: 13 }}>{s.error}</p>
                  )}

                  {s.preview && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.preview}
                      alt={`Vista previa ${slot.label}`}
                      style={{ marginTop: 12, width: '100%', maxWidth: 240, borderRadius: 8, border: '1px solid #4A2E1C', display: 'block' }}
                    />
                  )}

                  {s.url && (
                    <p style={{ margin: '8px 0 0', fontSize: 11, color: '#8B5E3C', wordBreak: 'break-all' }}>{s.url}</p>
                  )}
                </div>
              )
            })}

            <div style={style.field}>
              <label style={style.label}>Link de pago de Shopify</label>
              <input
                type="url"
                value={checkoutUrl}
                onChange={e => setCheckoutUrl(e.target.value)}
                placeholder="https://shop.cuddlo.pet/..."
                required
                style={style.input}
              />
              <p style={{ margin: '8px 0 0', fontSize: 11, color: '#8B5E3C' }}>
                Obtén este link en Shopify Admin → Orders → Create order → Send invoice
              </p>
            </div>

            {sent && (
              <div style={style.success}>
                ✓ Render enviado correctamente a <strong>{sentTo}</strong>
              </div>
            )}
            {sendError && (
              <div style={style.error}>{sendError}</div>
            )}

            <button
              type="submit"
              disabled={sending}
              style={{ ...style.btn, ...(sending ? style.btnDisabled : {}), marginTop: 4 }}
            >
              {sending ? 'Enviando…' : `Enviar render a ${email || 'cliente'} →`}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}
