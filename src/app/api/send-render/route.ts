import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface SendRenderPayload {
  email: string
  nombre: string
  nombreMascota: string
  producto: string
  precio: number
  imagenUrl: string
}

// Shopify numeric variant IDs for plush products
const VARIANT_IDS: Record<string, number> = {
  'Cuddlo Esencial': 53276067922248,
  'Cuddlo Regalo':   53276068020552,
  'Cuddlo Completo': 53276068086088,
}

async function createDraftOrder(
  email: string,
  nombreMascota: string,
  producto: string,
  precio: number,
): Promise<string> {
  const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN
  if (!token) {
    console.warn('[send-render] SHOPIFY_ADMIN_ACCESS_TOKEN not set — using fallback URL')
    return 'https://shop.cuddlo.pet'
  }

  const variantId = VARIANT_IDS[producto]

  const lineItem = variantId
    ? { variant_id: variantId, quantity: 1 }
    : { title: producto, price: precio.toFixed(2), quantity: 1, requires_shipping: true }

  const body = {
    draft_order: {
      line_items: [lineItem],
      customer: { email },
      note: `Render de ${nombreMascota}`,
      tags: 'render,cuddlo',
    },
  }

  const res = await fetch(
    `https://cxrkkh-q2.myshopify.com/admin/api/2024-01/draft_orders.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify(body),
    },
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Shopify draft order failed (${res.status}): ${text}`)
  }

  const data = await res.json()
  return data.draft_order.invoice_url as string
}

function buildEmailHtml({
  nombre,
  nombreMascota,
  producto,
  precio,
  imagenUrl,
  invoiceUrl,
}: SendRenderPayload & { invoiceUrl: string }): string {
  const mailtoSubject = encodeURIComponent(`Cambios en el render de ${nombreMascota}`)

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Tu Cuddlo de ${nombreMascota} está listo</title>
</head>
<body style="margin:0;padding:0;background:#F5EFE6;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE6;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0"
             style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;
                    box-shadow:0 4px 24px rgba(44,24,16,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:#2C1810;padding:36px 40px;text-align:center;">
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:32px;
                      font-weight:700;color:#F5EFE6;letter-spacing:-0.5px;">
              Cuddlo
            </p>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding:40px 40px 0;">
            <p style="margin:0;font-size:20px;font-weight:700;color:#2C1810;
                      font-family:Georgia,'Times New Roman',serif;line-height:1.3;">
              Hola ${nombre},
            </p>
            <p style="margin:16px 0 0;font-size:15px;color:#4A3728;line-height:1.7;">
              Hemos creado esta ilustración a partir de las fotos de <strong>${nombreMascota}</strong>.
              Échale un vistazo y dinos qué te parece:
            </p>
          </td>
        </tr>

        <!-- Render image -->
        <tr>
          <td style="padding:28px 40px 0;">
            <img src="${imagenUrl}"
                 alt="Ilustración personalizada de ${nombreMascota}"
                 width="480"
                 style="display:block;width:100%;max-width:480px;height:auto;
                        border-radius:12px;border:0;" />
            <p style="margin:12px 0 0;font-size:12px;color:#A0826A;text-align:center;
                      letter-spacing:0.02em;">
              Ilustración personalizada · ${producto} · ${precio}€
            </p>
          </td>
        </tr>

        <!-- Separator -->
        <tr>
          <td style="padding:28px 40px 0;">
            <div style="height:1px;background:#C4A882;opacity:0.4;"></div>
          </td>
        </tr>

        <!-- CTA buttons -->
        <tr>
          <td style="padding:28px 40px;text-align:center;">
            <!-- Primary CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
              <tr>
                <td style="background:#8B5E3C;border-radius:30px;
                           box-shadow:0 4px 16px rgba(139,94,60,0.28);">
                  <a href="${invoiceUrl}"
                     style="display:block;padding:18px 44px;font-size:16px;
                            font-weight:600;color:#F5EFE6;text-decoration:none;
                            white-space:nowrap;letter-spacing:0.02em;">
                    Me encanta, confirmar pedido →
                  </a>
                </td>
              </tr>
            </table>
            <!-- Secondary CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:16px auto 0;">
              <tr>
                <td style="border:1.5px solid #8B5E3C;border-radius:30px;">
                  <a href="mailto:hello@cuddlo.pet?subject=${mailtoSubject}"
                     style="display:block;padding:15px 36px;font-size:14px;font-weight:600;
                            color:#8B5E3C;text-decoration:none;white-space:nowrap;">
                    Quiero algún cambio
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:20px 0 0;font-size:13px;color:#A0826A;line-height:1.6;">
              Si tienes dudas, responde a este email.<br/>
              Ajustamos el render sin coste hasta que estés satisfecho.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F5EFE6;padding:24px 40px;border-top:1px solid #E8DDD4;
                     text-align:center;">
            <p style="margin:0;font-size:12px;color:#A0826A;line-height:1.8;">
              Cuddlo ·
              <a href="mailto:hello@cuddlo.pet" style="color:#8B5E3C;text-decoration:none;">hello@cuddlo.pet</a>
              · <a href="https://cuddlo.pet" style="color:#8B5E3C;text-decoration:none;">cuddlo.pet</a>
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
  const authHeader = req.headers.get('authorization')
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 })
  }

  const payload: SendRenderPayload = await req.json()
  const { email, nombre, nombreMascota, producto, precio, imagenUrl } = payload

  if (!email || !nombre || !nombreMascota || !producto || !precio || !imagenUrl) {
    return NextResponse.json({ ok: false, error: 'Faltan campos obligatorios' }, { status: 400 })
  }

  let invoiceUrl: string
  try {
    invoiceUrl = await createDraftOrder(email, nombreMascota, producto, precio)
  } catch (err) {
    console.error('[send-render] Draft order error:', err)
    return NextResponse.json({ ok: false, error: 'Error al crear el pedido en Shopify' }, { status: 500 })
  }

  if (!process.env.RESEND_API_KEY) {
    console.log('[send-render] Dev mode — sin RESEND_API_KEY:', { email, nombre, nombreMascota, producto, precio, invoiceUrl })
    return NextResponse.json({ ok: true, dev: true, invoiceUrl })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: `Cuddlo <${process.env.RESEND_FROM ?? 'hello@cuddlo.pet'}>`,
    to: email,
    replyTo: 'hello@cuddlo.pet',
    subject: `Tu Cuddlo de ${nombreMascota} está listo 🐾`,
    html: buildEmailHtml({ email, nombre, nombreMascota, producto, precio, imagenUrl, invoiceUrl }),
  })

  if (error) {
    console.error('[send-render] Resend error:', error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, invoiceUrl })
}
