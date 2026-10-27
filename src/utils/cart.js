/**
 * Sri Devibala Sarees - Cart Calculations & Validation Utilities
 * Pure functions obeying PRD Sections 13.1 - 13.4
 */

import { BUSINESS_RULES } from '../config/shopConfig.js'

/**
 * Creates unique line key: productId + selectedSize + selectedColour
 */
export function getCartLineKey(productId, size = null, colour = null) {
  return `${productId}__size:${size || 'none'}__col:${colour || 'none'}`
}

/**
 * Calculates line totals, subtotal, and item count
 */
export function calculateCartTotals(cartLinesWithProducts) {
  let subtotal = 0
  let totalItemCount = 0

  const processedLines = cartLinesWithProducts.map(line => {
    const unitPrice = line.product ? Math.round(line.product.price) : 0
    const quantity = Math.max(1, Math.round(line.quantity || 1))
    const lineTotal = unitPrice * quantity

    subtotal += lineTotal
    totalItemCount += quantity

    return {
      ...line,
      unitPrice,
      quantity,
      lineTotal
    }
  })

  return {
    lines: processedLines,
    subtotal,
    total: subtotal, // Version 1: Total = Subtotal per PRD CART-6
    totalItemCount
  }
}

/**
 * Validates cart lines against live product data per PRD STK-1 to STK-7.
 * Returns { validLines, notices, changesMade }
 */
export function revalidateCart(storedLines, productsMap) {
  const validLines = []
  const notices = []
  let changesMade = false

  // Track product total quantities across multiple variants in cart
  const productQuantities = {}

  for (const item of storedLines) {
    const product = productsMap[item.productId]

    // 1. Check if product exists and isActive
    if (!product || product.isActive === false) {
      notices.push(`"${product ? product.name : 'An item'}" is no longer available and was removed from your cart.`)
      changesMade = true
      continue
    }

    // 2. Check if product has 0 stock
    if (product.stock <= 0) {
      notices.push(`"${product.name}" is currently out of stock and was removed from your cart.`)
      changesMade = true
      continue
    }

    // 3. Check if stored size or colour is still offered
    if (item.size && (!product.sizes || !product.sizes.includes(item.size))) {
      notices.push(`Size "${item.size}" for "${product.name}" is no longer available.`)
      changesMade = true
      continue
    }

    if (item.colour && (!product.colours || !product.colours.includes(item.colour))) {
      notices.push(`Colour "${item.colour}" for "${product.name}" is no longer available.`)
      changesMade = true
      continue
    }

    // 4. Effective maximum check across product
    const effectiveMax = Math.min(product.stock, BUSINESS_RULES.MAX_QTY_PER_PRODUCT)
    const currentAllocated = productQuantities[product.id] || 0
    const availableForThisLine = Math.max(0, effectiveMax - currentAllocated)

    if (availableForThisLine <= 0) {
      notices.push(`"${product.name}" exceeds available stock (${effectiveMax} max units) and could not be included.`)
      changesMade = true
      continue
    }

    let itemQuantity = Math.max(1, item.quantity)
    if (itemQuantity > availableForThisLine) {
      itemQuantity = availableForThisLine
      notices.push(`Quantity for "${product.name}" was adjusted to ${itemQuantity} due to stock limits.`)
      changesMade = true
    }

    productQuantities[product.id] = (productQuantities[product.id] || 0) + itemQuantity

    validLines.push({
      productId: item.productId,
      size: item.size || null,
      colour: item.colour || null,
      quantity: itemQuantity
    })
  }

  // Cap at MAX_CART_LINES
  if (validLines.length > BUSINESS_RULES.MAX_CART_LINES) {
    validLines.splice(BUSINESS_RULES.MAX_CART_LINES)
    notices.push(`Cart has been limited to ${BUSINESS_RULES.MAX_CART_LINES} items.`)
    changesMade = true
  }

  return {
    validLines,
    notices,
    changesMade
  }
}
