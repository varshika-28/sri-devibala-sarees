import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { INITIAL_PRODUCTS } from '../data/products'
import { BUSINESS_RULES } from '../config/shopConfig'
import { getCartLineKey, calculateCartTotals, revalidateCart } from '../utils/cart'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // Master product list (can be swapped or edited in products.js)
  const [products] = useState(() => INITIAL_PRODUCTS.filter(p => p.isActive !== false))
  const [cartLines, setCartLines] = useState([])
  const [notices, setNotices] = useState([])
  const [toastMessage, setToastMessage] = useState(null)

  // Map of active products for O(1) lookups
  const productsMap = useMemo(() => {
    const map = {}
    products.forEach(p => {
      map[p.id] = p
    })
    return map
  }, [products])

  // Load and revalidate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(BUSINESS_RULES.STORAGE_CART_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        const lines = Array.isArray(parsed?.lines) ? parsed.lines : []
        const { validLines, notices: initialNotices } = revalidateCart(lines, productsMap)
        setCartLines(validLines)
        if (initialNotices.length > 0) {
          setNotices(initialNotices)
        }
      }
    } catch (err) {
      console.warn('Could not read cart from localStorage, using fresh session cart.', err)
      setCartLines([])
    }
  }, [productsMap])

  // Sync back to localStorage whenever cartLines change
  useEffect(() => {
    try {
      const payload = {
        version: 1,
        lines: cartLines.map(l => ({
          productId: l.productId,
          size: l.size || null,
          colour: l.colour || null,
          quantity: l.quantity
        }))
      }
      localStorage.setItem(BUSINESS_RULES.STORAGE_CART_KEY, JSON.stringify(payload))
    } catch (err) {
      console.warn('Could not persist cart to localStorage:', err)
    }
  }, [cartLines])

  // Dismiss a notice
  const dismissNotice = useCallback((index) => {
    setNotices(prev => prev.filter((_, i) => i !== index))
  }, [])

  // Auto-dismiss toast after 3 seconds
  const showToast = useCallback((msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(current => (current === msg ? null : current))
    }, 3200)
  }, [])

  /**
   * Add to cart with variant selections & stock enforcement
   */
  const addToCart = useCallback((product, { size = null, colour = null, quantity = 1 } = {}) => {
    if (!product || product.stock <= 0) {
      return { success: false, message: 'This item is out of stock.' }
    }

    // Check variant requirements
    if (product.sizes?.length > 0 && !size) {
      return { success: false, message: 'Please select a size.' }
    }
    if (product.colours?.length > 0 && !colour) {
      return { success: false, message: 'Please select a colour.' }
    }

    const effectiveMax = Math.min(product.stock, BUSINESS_RULES.MAX_QTY_PER_PRODUCT)

    // Current total quantity of this product already in cart
    const currentAllocated = cartLines
      .filter(l => l.productId === product.id)
      .reduce((sum, l) => sum + l.quantity, 0)

    const lineKey = getCartLineKey(product.id, size, colour)
    const existingIndex = cartLines.findIndex(
      l => getCartLineKey(l.productId, l.size, l.colour) === lineKey
    )

    // Check if adding this quantity exceeds effective max
    if (currentAllocated + quantity > effectiveMax) {
      const maxCanAdd = effectiveMax - currentAllocated
      if (maxCanAdd <= 0) {
        return {
          success: false,
          message: `Maximum quantity (${effectiveMax} units) for "${product.name}" already in cart.`
        }
      }
      return {
        success: false,
        message: `Only ${maxCanAdd} more units of "${product.name}" can be added.`
      }
    }

    // Check total cart lines cap
    if (existingIndex === -1 && cartLines.length >= BUSINESS_RULES.MAX_CART_LINES) {
      return {
        success: false,
        message: `Cart cannot exceed ${BUSINESS_RULES.MAX_CART_LINES} items. Please checkout first.`
      }
    }

    setCartLines(prev => {
      const next = [...prev]
      if (existingIndex >= 0) {
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        }
      } else {
        next.push({
          productId: product.id,
          size: size || null,
          colour: colour || null,
          quantity
        })
      }
      return next
    })

    showToast(`Added "${product.name}" to your cart.`)
    return { success: true }
  }, [cartLines, showToast])

  /**
   * Update quantity for a specific line
   */
  const updateQuantity = useCallback((productId, size, colour, delta) => {
    const product = productsMap[productId]
    if (!product) return

    const lineKey = getCartLineKey(productId, size, colour)
    const effectiveMax = Math.min(product.stock, BUSINESS_RULES.MAX_QTY_PER_PRODUCT)

    setCartLines(prev => {
      const line = prev.find(l => getCartLineKey(l.productId, l.size, l.colour) === lineKey)
      if (!line) return prev

      const currentTotalForProduct = prev
        .filter(l => l.productId === productId)
        .reduce((sum, l) => sum + l.quantity, 0)

      const targetLineQty = line.quantity + delta
      if (targetLineQty < 1) {
        return prev // Minimum 1; use remove to delete
      }

      const projectedTotalForProduct = currentTotalForProduct + delta
      if (delta > 0 && projectedTotalForProduct > effectiveMax) {
        showToast(`Stock limit reached for "${product.name}" (Max ${effectiveMax}).`)
        return prev
      }

      return prev.map(l => {
        if (getCartLineKey(l.productId, l.size, l.colour) === lineKey) {
          return { ...l, quantity: targetLineQty }
        }
        return l
      })
    })
  }, [productsMap, showToast])

  /**
   * Remove a line from cart
   */
  const removeFromCart = useCallback((productId, size, colour) => {
    const lineKey = getCartLineKey(productId, size, colour)
    setCartLines(prev => prev.filter(l => getCartLineKey(l.productId, l.size, l.colour) !== lineKey))
    showToast('Item removed from cart.')
  }, [showToast])

  /**
   * Clear the entire cart
   */
  const clearCart = useCallback(() => {
    setCartLines([])
    setNotices([])
    showToast('Cart has been cleared.')
  }, [showToast])

  /**
   * Revalidate cart before checkout or submission
   */
  const revalidateBeforeCheckout = useCallback(() => {
    const { validLines, notices: checkoutNotices, changesMade } = revalidateCart(cartLines, productsMap)
    if (changesMade) {
      setCartLines(validLines)
      setNotices(prev => [...prev, ...checkoutNotices])
    }
    return {
      isValid: !changesMade,
      validLines,
      notices: checkoutNotices
    }
  }, [cartLines, productsMap])

  // Derive cart lines with current product references
  const cartLinesWithProducts = useMemo(() => {
    return cartLines
      .map(line => {
        const product = productsMap[line.productId]
        if (!product) return null
        return {
          ...line,
          product,
          lineKey: getCartLineKey(line.productId, line.size, line.colour)
        }
      })
      .filter(Boolean)
  }, [cartLines, productsMap])

  // Calculate totals
  const totals = useMemo(() => {
    return calculateCartTotals(cartLinesWithProducts)
  }, [cartLinesWithProducts])

  const value = {
    products,
    productsMap,
    cartLines: cartLinesWithProducts,
    subtotal: totals.subtotal,
    total: totals.total,
    totalItemCount: totals.totalItemCount,
    notices,
    toastMessage,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    dismissNotice,
    revalidateBeforeCheckout
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
