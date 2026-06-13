const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const TOKEN  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!
const API_URL = `https://${DOMAIN}/api/2024-01/graphql.json`

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })
  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message)
  return json.data as T
}

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ShopifyVariant {
  id: string
  title: string
  price: { amount: string; currencyCode: string }
  availableForSale: boolean
}

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
  variants: { edges: Array<{ node: ShopifyVariant }> }
  images: { edges: Array<{ node: { url: string; altText: string | null } }> }
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: { amount: string; currencyCode: string }
    image: { url: string; altText: string | null } | null
    product: { title: string; handle: string }
  }
  attributes: Array<{ key: string; value: string }>
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: { amount: string; currencyCode: string }
    subtotalAmount: { amount: string; currencyCode: string }
  }
  lines: { edges: Array<{ node: ShopifyCartLine }> }
}

// ── Fragments ──────────────────────────────────────────────────────────────────

const CART_FRAGMENT = `
  id
  checkoutUrl
  totalQuantity
  cost {
    totalAmount { amount currencyCode }
    subtotalAmount { amount currencyCode }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            image { url altText }
            product { title handle }
          }
        }
        attributes { key value }
      }
    }
  }
`

// ── API functions ──────────────────────────────────────────────────────────────

export async function getProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(`
    query GetProducts {
      products(first: 50) {
        edges {
          node {
            id title handle
            priceRange { minVariantPrice { amount currencyCode } }
            variants(first: 100) { edges { node { id title price { amount currencyCode } availableForSale } } }
            images(first: 1) { edges { node { url altText } } }
          }
        }
      }
    }
  `)
  return data.products.edges.map(e => e.node)
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(`
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id title handle
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 100) { edges { node { id title price { amount currencyCode } availableForSale } } }
        images(first: 1) { edges { node { url altText } } }
      }
    }
  `, { handle })
  return data.product
}

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(`
    mutation CartCreate {
      cartCreate { cart { ${CART_FRAGMENT} } }
    }
  `)
  return data.cartCreate.cart
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1,
  attributes: { key: string; value: string }[] = []
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(`
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FRAGMENT} } }
    }
  `, { cartId, lines: [{ merchandiseId: variantId, quantity, attributes }] })
  return data.cartLinesAdd.cart
}

export async function removeFromCart(cartId: string, lineId: string): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(`
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FRAGMENT} } }
    }
  `, { cartId, lineIds: [lineId] })
  return data.cartLinesRemove.cart
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(`
    mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FRAGMENT} } }
    }
  `, { cartId, lines: [{ id: lineId, quantity }] })
  return data.cartLinesUpdate.cart
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(`
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FRAGMENT} }
    }
  `, { cartId })
  return data.cart
}

// ── Wear variant lookup ────────────────────────────────────────────────────────

const variantCache: Record<string, ShopifyVariant[]> = {}

export async function getWearVariantId(
  product: 'camiseta' | 'sudadera' | 'tote',
  finish: 'impreso' | 'bordado',
  gender: 'mujer' | 'hombre' | null,
  color: 'crema' | 'blanco' | 'negro',
  size: string | null
): Promise<string | null> {
  const handle = product === 'tote' ? 'tote-bag' : `${product}-${gender}`

  if (!variantCache[handle]) {
    const p = await getProductByHandle(handle)
    if (!p) return null
    variantCache[handle] = p.variants.edges.map(e => e.node)
  }

  const variants = variantCache[handle]
  if (product === 'tote') return variants[0]?.id ?? null

  const finishLabel = finish === 'impreso' ? 'Impreso' : 'Bordado'
  const colorLabel  = { crema: 'Crema', blanco: 'Blanco', negro: 'Negro' }[color]
  const targetTitle = `${finishLabel} / ${colorLabel} / ${size}`

  return variants.find(v => v.title === targetTitle)?.id ?? null
}
