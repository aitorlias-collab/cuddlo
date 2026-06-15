'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  type ShopifyCart,
  createCart,
  addToCart,
  removeFromCart,
  updateCartLine,
  getCart,
} from '@/lib/shopify'

export interface CartLine {
  id: string
  quantity: number
  variantId: string
  variantTitle: string
  productTitle: string
  price: number
  image: string | null
  attributes: { key: string; value: string }[]
}

interface CartContextValue {
  cart: ShopifyCart | null
  lines: CartLine[]
  itemCount: number
  total: number
  checkoutUrl: string | null
  isOpen: boolean
  isLoading: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (variantId: string, quantity?: number, attributes?: { key: string; value: string }[]) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

function normalizeLines(shopifyCart: ShopifyCart): CartLine[] {
  return shopifyCart.lines.edges.map(({ node }) => ({
    id: node.id,
    quantity: node.quantity,
    variantId: node.merchandise.id,
    variantTitle: node.merchandise.title,
    productTitle: node.merchandise.product.title,
    price: parseFloat(node.merchandise.price.amount),
    image: node.merchandise.image?.url ?? null,
    attributes: node.attributes,
  }))
}

function buildCheckoutUrl(shopifyCheckoutUrl: string): string {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? ''
  return shopifyCheckoutUrl.replace(`https://${domain}`, 'https://shop.cuddlo.pet')
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart]       = useState<ShopifyCart | null>(null)
  const [isOpen, setIsOpen]   = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const savedId = localStorage.getItem('cuddlo_cart_id')
    if (!savedId) return
    getCart(savedId)
      .then(c => { if (c) setCart(c) })
      .catch(() => localStorage.removeItem('cuddlo_cart_id'))
  }, [])

  const ensureCart = useCallback(async (): Promise<string> => {
    if (cart) return cart.id
    const newCart = await createCart()
    setCart(newCart)
    localStorage.setItem('cuddlo_cart_id', newCart.id)
    return newCart.id
  }, [cart])

  const addItem = useCallback(async (
    variantId: string,
    quantity = 1,
    attributes: { key: string; value: string }[] = []
  ) => {
    setIsLoading(true)
    try {
      const cartId = await ensureCart()
      const updated = await addToCart(cartId, variantId, quantity, attributes)
      setCart(updated)
      localStorage.setItem('cuddlo_cart_id', updated.id)
      setIsOpen(true)
    } catch (err) {
      console.error('[Cart] addItem failed:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [ensureCart])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return
    setIsLoading(true)
    try {
      const updated = await removeFromCart(cart.id, lineId)
      setCart(updated)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return
    setIsLoading(true)
    try {
      const updated = await updateCartLine(cart.id, lineId, quantity)
      setCart(updated)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const lines      = cart ? normalizeLines(cart) : []
  const itemCount  = cart?.totalQuantity ?? 0
  const total      = cart ? parseFloat(cart.cost.totalAmount.amount) : 0
  const checkoutUrl = cart ? buildCheckoutUrl(cart.checkoutUrl) : null

  return (
    <CartContext.Provider value={{
      cart, lines, itemCount, total, checkoutUrl,
      isOpen, isLoading,
      openCart:  () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem, removeItem, updateQuantity,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
