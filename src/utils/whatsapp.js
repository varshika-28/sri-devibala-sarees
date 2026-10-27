/**
 * Sri Devibala Sarees - WhatsApp Message & Order Reference Builder
 * Following USER_PRD.md Section 15.3 and 15.4 exact specifications
 */

import { SHOP_CONFIG, BUSINESS_RULES, isWhatsAppConfigured } from '../config/shopConfig.js'
import { formatINR, formatDate } from './format.js'

/**
 * Generate readable order reference: SDS-YYYYMMDD-XXXX
 * XXXX avoids confusable characters (I, O, 0, 1)
 */
export function generateOrderReference(date = new Date()) {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let randomPart = ''
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `SDS-${yyyy}${mm}${dd}-${randomPart}`
}

/**
 * Builds the exact message template defined in Section 15.4
 */
export function buildWhatsAppMessage({ orderRef, customer, cartLines, subtotal, total }) {
  const dateStr = formatDate(new Date())

  let itemsText = ''
  cartLines.forEach((item, index) => {
    const num = index + 1
    // Build options string if any
    const options = []
    if (item.size) options.push(`Size: ${item.size}`)
    if (item.colour) options.push(`Colour: ${item.colour}`)
    const optionsStr = options.length > 0 ? ` (${options.join(', ')})` : ''

    const unitPriceFormatted = formatINR(item.product.price)
    const lineTotalFormatted = formatINR(item.product.price * item.quantity)

    itemsText += `${num}. ${item.product.name}${optionsStr}\n   Qty: ${item.quantity} x ${unitPriceFormatted} = ${lineTotalFormatted}\n`
  })

  const subtotalFormatted = formatINR(subtotal)
  const totalFormatted = formatINR(total)

  const message = [
    'Hello Sri Devibala Sarees, I would like to place an order.',
    '',
    `Order Reference: ${orderRef}`,
    `Date: ${dateStr}`,
    '',
    'CUSTOMER DETAILS',
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Delivery Address: ${customer.address}`,
    `Note: ${customer.note || 'None'}`,
    '',
    'ORDER ITEMS',
    itemsText.trimEnd(),
    '',
    `Subtotal: ${subtotalFormatted}`,
    `Total (excluding delivery charges): ${totalFormatted}`,
    '',
    'Please confirm availability, delivery charges, and the final amount. Thank you.'
  ].join('\n')

  return message
}

/**
 * Generates WhatsApp click-to-chat URL and validates requirements
 */
export function createWhatsAppOrderUrl({ orderRef, customer, cartLines, subtotal, total }) {
  if (!isWhatsAppConfigured()) {
    return {
      success: false,
      error: 'SHOP_NOT_CONFIGURED',
      message: 'The shop has not configured their WhatsApp number yet. Please contact the shop owner directly.'
    }
  }

  const rawMessage = buildWhatsAppMessage({ orderRef, customer, cartLines, subtotal, total })

  if (rawMessage.length > BUSINESS_RULES.MAX_MESSAGE_CHARS) {
    return {
      success: false,
      error: 'MESSAGE_TOO_LONG',
      message: 'Your order is too long for one WhatsApp message. Please reduce the number of items or send in two separate orders.'
    }
  }

  const encodedMessage = encodeURIComponent(rawMessage)
  const cleanNumber = SHOP_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')
  const url = `https://wa.me/${cleanNumber}?text=${encodedMessage}`

  return {
    success: true,
    url,
    rawMessage,
    orderRef
  }
}
