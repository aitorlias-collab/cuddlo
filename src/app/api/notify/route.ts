import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface WearCartItem {
  productName: string
  finish: string
  gender: string | null
  colorLabel: string
  size: string | null
  price: number
}

interface NotifyPayload {
  nombre: string
  email: string
  nombreMascota: string
  fotos: string[]
  wearCart?: WearCartItem[]
}

function buildEmailHtml({ nombre, email, nombreMascota, fotos, wearCart }: NotifyPayload): string {
  const isWear = Array.isArray(wearCart) && wearCart.length > 0
  const wearTotal = isWear ? wearCart!.reduce((s, i) => s + i.price, 0) : 0
  const photoThumbs = fotos
    .map(
      (url) =>
        `<a href="${url}" style="display:inline-block;margin:4px;">
          <img src="${url}" width="120" height="120"
               style="object-fit:cover;border-radius:8px;border:1px solid #e8ddd4;" alt="foto" />
        </a>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#F5EFE6;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE6;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(44,24,16,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#2C1810;padding:28px 36px;">
            <p style="margin:0;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#F5EFE6;letter-spacing:-0.5px;">
              Cuddlo
            </p>
            <p style="margin:6px 0 0;font-size:13px;color:#C4A882;">Nuevo pedido recibido</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 36px;">
            <p style="margin:0 0 24px;font-size:15px;color:#2C1810;line-height:1.6;">
              Hola, acaba de llegar un nuevo lead. Aquí tienes los detalles:
            </p>

            <!-- Lead info table -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8DDD4;border-radius:10px;overflow:hidden;margin-bottom:28px;">
              ${[
                ['Nombre',   nombre],
                ['Email',    email],
                ['Mascota',  nombreMascota],
                ['Fotos',    `${fotos.length} foto${fotos.length !== 1 ? 's' : ''} subida${fotos.length !== 1 ? 's' : ''}`],
              ]
                .map(
                  ([label, value], i) =>
                    `<tr style="background:${i % 2 === 0 ? '#FDFAF7' : '#ffffff'};">
                      <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#8B5E3C;text-transform:uppercase;letter-spacing:0.06em;width:110px;">${label}</td>
                      <td style="padding:12px 16px;font-size:14px;color:#2C1810;">${value}</td>
                    </tr>`
                )
                .join('')}
            </table>

            <!-- Wear cart -->
            ${isWear ? `
            <p style="margin:0 0 12px;font-size:12px;font-weight:600;color:#8B5E3C;text-transform:uppercase;letter-spacing:0.06em;">
              Prendas del pedido
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8DDD4;border-radius:10px;overflow:hidden;margin-bottom:28px;">
              ${wearCart!.map((item, i) => `
                <tr style="background:${i % 2 === 0 ? '#FDFAF7' : '#ffffff'};">
                  <td style="padding:10px 16px;font-size:13px;color:#2C1810;">
                    <strong>${item.productName}</strong>
                    ${item.gender ? ` · Corte ${item.gender}` : ''}
                    · ${item.finish === 'impreso' ? 'Impreso' : 'Bordado'}
                    · ${item.colorLabel}
                    ${item.size ? ` · Talla ${item.size}` : ''}
                  </td>
                  <td style="padding:10px 16px;font-size:13px;font-weight:600;color:#8B5E3C;text-align:right;white-space:nowrap;">${item.price}€</td>
                </tr>
              `).join('')}
              <tr style="background:#F5EFE6;border-top:1px solid #E8DDD4;">
                <td style="padding:10px 16px;font-size:13px;font-weight:600;color:#2C1810;">Total</td>
                <td style="padding:10px 16px;font-size:15px;font-weight:700;color:#2C1810;text-align:right;">${wearTotal}€</td>
              </tr>
            </table>
            ` : ''}

            <!-- Photos -->
            ${fotos.length > 0 ? `
            <p style="margin:0 0 12px;font-size:12px;font-weight:600;color:#8B5E3C;text-transform:uppercase;letter-spacing:0.06em;">
              Fotos de la mascota
            </p>
            <div style="line-height:0;">${photoThumbs}</div>
            ` : ''}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F5EFE6;padding:20px 36px;border-top:1px solid #E8DDD4;">
            <p style="margin:0;font-size:12px;color:#8B5E3C;">
              Cuddlo · hello@cuddlo.pet
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  const payload: NotifyPayload = await req.json()
  const { nombre, email, nombreMascota, fotos } = payload

  if (!process.env.RESEND_API_KEY) {
    console.log('[cuddlo/notify] Dev mode — no RESEND_API_KEY, logging lead:', {
      nombre,
      email,
      nombreMascota,
      fotos: fotos.length,
    })
    return NextResponse.json({ ok: true, dev: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'Cuddlo <notificaciones@cuddlo.com>',
    to: process.env.RESEND_TO ?? 'hello@cuddlo.pet',
    subject: `Nuevo pedido${Array.isArray(payload.wearCart) && payload.wearCart.length > 0 ? ' · Wear' : ''}: ${nombreMascota} de ${nombre}`,
    html: buildEmailHtml(payload),
  })

  if (error) {
    console.error('[cuddlo/notify] Resend error:', error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
