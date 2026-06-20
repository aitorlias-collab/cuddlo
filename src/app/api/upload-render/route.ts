import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_BYTES = 10 * 1024 * 1024 // 10 MB

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.\-_]/g, '')
    .replace(/-+/g, '-')
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Solo se permiten imágenes JPG, PNG o WebP' }, { status: 400 })
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'El archivo supera el límite de 10 MB' }, { status: 400 })
  }

  const timestamp = Date.now()
  const safeName = sanitizeFilename(file.name)
  const key = `renders/${timestamp}_${safeName}`

  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  })

  const arrayBuffer = await file.arrayBuffer()

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        Body: Buffer.from(arrayBuffer),
        ContentType: file.type,
      })
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    const code = (err as Record<string, unknown>)?.Code ?? (err as Record<string, unknown>)?.name ?? 'unknown'
    console.error('[upload-render] R2 error:', { code, message, bucket: process.env.R2_BUCKET_NAME, accountId: process.env.R2_ACCOUNT_ID })
    return NextResponse.json({ error: `Error al subir a R2: ${code} — ${message}` }, { status: 500 })
  }

  const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`
  return NextResponse.json({ url: publicUrl })
}
