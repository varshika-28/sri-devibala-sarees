/**
 * Sri Devibala Sarees - Shop Configuration & Business Constants
 * Placeholders are marked clearly per USER_PRD.md Section 15.2 and Section 16.
 */

export const SHOP_CONFIG = {
  shopName: 'Sri Devibala Sarees',
  tagline: 'Traditional Elegance, Everyday Style',
  shortBio: 'Your local boutique for handpicked sarees, comfortable daily wear, unstitched salwar materials, and curated accessories.',
  
  // WhatsApp configuration:
  // Must be in international format without '+', spaces, or leading zeros (e.g., '919876543210')
  // Read from Vite environment variable VITE_SHOP_WHATSAPP_NUMBER or fallback to placeholder.
  whatsappNumber: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SHOP_WHATSAPP_NUMBER) || '[SHOP_WHATSAPP_NUMBER_PLACEHOLDER]',

  // Shop contact & address placeholders (to be updated by shop owner)
  shopAddress: '[SHOP_ADDRESS_PLACEHOLDER - Local shop address to be provided]',
  contactPhone: '[SHOP_PHONE_PLACEHOLDER]',
  businessHours: 'Mon - Sat: 9:30 AM - 8:30 PM | Sunday: 10:00 AM - 2:00 PM (Subject to confirmation)',
  
  // Delivery & local coverage details
  deliveryArea: '[DELIVERY_AREA_TO_BE_PROVIDED_BY_SHOP]',
  deliveryNote: 'Local delivery only. Availability, exact delivery charges, and timing are confirmed directly by the shop on WhatsApp.',
  paymentNote: 'No online payment gateway. Payment arrangements (Cash on Delivery or direct UPI upon order acceptance) will be shared by the shop on WhatsApp.',
  orderDisclaimer: 'Please note: Clicking "Place Order on WhatsApp" prepares your order request. Your order is NOT confirmed until you press Send in WhatsApp and our shop confirms acceptance.'
}

// Business Rules Constants (USER_PRD Section 13.4 & 15.2)
export const BUSINESS_RULES = {
  MAX_QTY_PER_PRODUCT: 10,
  MAX_CART_LINES: 20,
  MAX_MESSAGE_CHARS: 1500,
  STORAGE_CART_KEY: 'sri-devibala-sarees-cart',
  DEFAULT_PLACEHOLDER_IMAGE: '/images/placeholder-product.svg'
}

/**
 * Checks whether the shop's WhatsApp number is configured with valid digits.
 * Returns true only if it contains a non-placeholder international number (min 10 digits).
 */
export function isWhatsAppConfigured() {
  const num = SHOP_CONFIG.whatsappNumber
  if (!num || num.includes('[') || num.includes('PLACEHOLDER')) {
    return false
  }
  // International number digits only without +, 10-15 digits
  return /^[0-9]{10,15}$/.test(num.trim())
}
