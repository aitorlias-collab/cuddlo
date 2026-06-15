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

function buildEmailHtml({
  nombre,
  nombreMascota,
  producto,
  precio,
  imagenUrl,
  checkoutUrl,
}: SendRenderPayload & { checkoutUrl: string }): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>El render de ${nombreMascota} está listo</title>
</head>
<body style="margin:0;padding:0;background:#F5EFE6;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE6;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0"
             style="background:#ffffff;border-radius:20px;overflow:hidden;
                    box-shadow:0 4px 24px rgba(44,24,16,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:#2C1810;padding:32px 40px;text-align:center;">
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;
                      font-weight:700;color:#F5EFE6;letter-spacing:-0.5px;">
              Cuddlo
            </p>
            <p style="margin:6px 0 0;font-size:13px;color:#C4A882;letter-spacing:0.06em;
                      text-transform:uppercase;">
              Personalización premium para tu mascota
            </p>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding:40px 40px 0;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#2C1810;
                      font-family:Georgia,'Times New Roman',serif;line-height:1.3;">
              Hola ${nombre}, el render de <em>${nombreMascota}</em> está listo 🐾
            </p>
            <p style="margin:16px 0 0;font-size:15px;color:#4A3728;line-height:1.7;">
              Hemos terminado tu diseño personalizado. Aquí tienes una vista previa —
              si todo se ve perfecto, haz clic en el botón para confirmar tu pedido y
              proceder al pago.
            </p>
          </td>
        </tr>

        <!-- Product badge -->
        <tr>
          <td style="padding:20px 40px 0;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#F5EFE6;border:1px solid #C4A882;border-radius:30px;
                           padding:6px 16px;">
                  <p style="margin:0;font-size:13px;font-weight:600;color:#8B5E3C;
                             letter-spacing:0.04em;">
                    ${producto} · ${precio}€
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Render image -->
        <tr>
          <td style="padding:28px 40px;">
            <div style="border-radius:12px;overflow:hidden;background:#F5EFE6;
                        box-shadow:0 2px 16px rgba(44,24,16,0.10);">
              <img src="${imagenUrl}"
                   alt="Render personalizado de ${nombreMascota}"
                   width="480"
                   style="display:block;width:100%;max-width:480px;height:auto;
                          border-radius:12px;" />
            </div>
          </td>
        </tr>

        <!-- CTA buttons -->
        <tr>
          <td style="padding:0 40px 16px;text-align:center;">
            <!-- Primary CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
              <tr>
                <td style="background:#8B5E3C;border-radius:50px;
                           box-shadow:0 4px 16px rgba(139,94,60,0.28);">
                  <a href="${checkoutUrl}"
                     style="display:block;padding:16px 40px;font-size:16px;
                            font-weight:600;color:#ffffff;text-decoration:none;
                            white-space:nowrap;letter-spacing:0.02em;">
                    Confirmar pedido y pagar →
                  </a>
                </td>
              </tr>
            </table>
            <!-- Secondary CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:16px auto 0;">
              <tr>
                <td style="border:1.5px solid #8B5E3C;border-radius:50px;">
                  <a href="mailto:hello@cuddlo.pet?subject=Cambios en el render de ${encodeURIComponent(nombreMascota)}"
                     style="display:block;padding:13px 32px;font-size:14px;font-weight:600;
                            color:#8B5E3C;text-decoration:none;white-space:nowrap;">
                    Solicitar cambios
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:24px 40px 0;">
            <div style="height:1px;background:#E8DDD4;"></div>
          </td>
        </tr>

        <!-- What happens next -->
        <tr>
          <td style="padding:28px 40px 0;">
            <p style="margin:0 0 16px;font-size:12px;font-weight:700;color:#8B5E3C;
                      text-transform:uppercase;letter-spacing:0.1em;">
              ¿Qué pasa después?
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                ['1', 'Confirmas el render', 'Si todo está perfecto, haz clic en "Confirmar pedido y pagar".'],
                ['2', 'Producción artesanal', 'Empezamos a fabricar tu pedido. El proceso tarda 3–4 semanas.'],
                ['3', 'Envío a casa', 'Recibirás tu pedido con seguimiento en la dirección que nos indiques.'],
              ]
                .map(
                  ([num, title, desc]) =>
                    `<tr>
                      <td style="padding:0 0 16px;vertical-align:top;">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="width:28px;height:28px;background:#2C1810;border-radius:50%;
                                       text-align:center;vertical-align:middle;padding-bottom:2px;">
                              <span style="font-size:12px;font-weight:700;color:#F5EFE6;">${num}</span>
                            </td>
                            <td style="padding-left:12px;vertical-align:top;">
                              <p style="margin:0;font-size:14px;font-weight:600;color:#2C1810;">${title}</p>
                              <p style="margin:3px 0 0;font-size:13px;color:#6B5040;line-height:1.5;">${desc}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>`
                )
                .join('')}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F5EFE6;padding:24px 40px;margin-top:16px;border-top:1px solid #E8DDD4;">
            <p style="margin:0;font-size:14px;color:#8B5E3C;line-height:1.6;">
              Con cariño, el equipo de Cuddlo 🐾
            </p>
            <p style="margin:6px 0 0;font-size:12px;color:#A0826A;">
              ¿Tienes alguna duda? Escríbenos a
              <a href="mailto:hello@cuddlo.pet" style="color:#8B5E3C;text-decoration:none;">hello@cuddlo.pet</a>
            </p>
            <p style="margin:14px 0 0;font-size:11px;color:#B89880;">
              Cuddlo · Personalización premium para tu mascota
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
  const payload: SendRenderPayload = await req.json()
  const { email, nombre, nombreMascota, producto, precio, imagenUrl } = payload

  if (!email || !nombre || !nombreMascota || !producto || !precio || !imagenUrl) {
    return NextResponse.json({ ok: false, error: 'Faltan campos obligatorios' }, { status: 400 })
  }

  // Link directo a la tienda — se reemplazará con draft order cuando se configure el Admin API
  const checkoutUrl = 'https://shop.cuddlo.pet'

  if (!process.env.RESEND_API_KEY) {
    console.log('[send-render] Dev mode — sin RESEND_API_KEY:', { email, nombre, nombreMascota, producto, precio })
    return NextResponse.json({ ok: true, dev: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: `Cuddlo <${process.env.RESEND_FROM ?? 'hello@cuddlo.pet'}>`,
    to: email,
    replyTo: 'hello@cuddlo.pet',
    subject: `El render de ${nombreMascota} está listo 🐾`,
    html: buildEmailHtml({ email, nombre, nombreMascota, producto, precio, imagenUrl, checkoutUrl }),
  })

  if (error) {
    console.error('[send-render] Resend error:', error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
