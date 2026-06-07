# Cuddlo — MVP

Peluches personalizados premium de mascotas.
Stack: Next.js 14 + Shopify Headless + Cloudflare Pages

## Arrancar en local
```bash
npm install
cp .env.example .env.local
# Rellenar .env.local con tus credenciales de Shopify
npm run dev
```
Abre http://localhost:3000

## Stack
- **Frontend**: Next.js 14 (App Router)
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Pagos**: Shopify Storefront API
- **Email**: Google Workspace (manual en MVP)
- **Fotos**: Upload directo a email (manual en MVP)
- **Hosting**: Cloudflare Pages

## Estructura
```
src/
├── app/
│   ├── marketing/        → Home, About
│   ├── register/         → Registro del cliente
│   ├── upload/           → Subida de fotos
│   ├── confirmation/     → Confirmación envío fotos
│   └── api/              → Endpoints internos (upload, notify, leads)
├── components/
│   ├── ui/               → Botones, inputs, cards
│   ├── layout/           → Header, Footer, Nav
│   └── sections/         → Secciones de la home
├── lib/                  → Utilidades, Shopify API
├── styles/               → Variables CSS, globals
└── types/                → TypeScript types
```

## Orden de construcción con Claude
1. [ ] Home completa (Hero + HowItWorks + CTA)
2. [ ] Página de registro
3. [ ] Página de subida de fotos
4. [ ] API de notificación por email
5. [ ] Página de confirmación
6. [ ] Conectar Shopify checkout
7. [ ] Deploy en Cloudflare Pages + dominio

> NOTA: este es el esqueleto preparado en sesión. Alternativa recomendada (Opción A):
> clonar github.com/vercel/commerce y construir la identidad de Cuddlo encima.
