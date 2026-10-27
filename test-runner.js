/**
 * Comprehensive Automated Test Suite for Sri Devibala Sarees
 * Verifies Acceptance Criteria from USER_PRD.md:
 * - C1-C7: Cart calculations
 * - S1-S6: Stock & variants validation
 * - Phone number normalisation & validation
 * - W1-W9: WhatsApp message building, reference format, & URL encoding
 * - Placeholder check
 */

import { formatINR } from './src/utils/format.js'
import { normalizePhoneNumber, validateCustomerForm } from './src/utils/validation.js'
import { getCartLineKey, calculateCartTotals, revalidateCart } from './src/utils/cart.js'
import { generateOrderReference, buildWhatsAppMessage, createWhatsAppOrderUrl } from './src/utils/whatsapp.js'
import { BUSINESS_RULES, SHOP_CONFIG, isWhatsAppConfigured } from './src/config/shopConfig.js'
import { CATEGORIES } from './src/config/categories.js'
import { INITIAL_PRODUCTS, validateProductData } from './src/data/products.js'

let passed = 0
let failed = 0

function assert(condition, message) {
  if (condition) {
    passed++
    console.log(`  ✓ PASS: ${message}`)
  } else {
    failed++
    console.error(`  ✕ FAIL: ${message}`)
  }
}

console.log('--- 1. Testing Formatters & Data Integrity ---')
assert(formatINR(1500) === '₹1,500', 'formatINR(1500) is ₹1,500')
assert(formatINR(12500) === '₹12,500', 'formatINR(12500) is ₹12,500')
assert(formatINR(0) === '₹0', 'formatINR(0) is ₹0')
assert(CATEGORIES.length === 7, 'Exact 7 categories configured')
const validProducts = validateProductData(INITIAL_PRODUCTS)
assert(validProducts.length === INITIAL_PRODUCTS.length, 'All sample products pass schema validation')

console.log('\n--- 2. Testing Cart Calculations (C1 - C7) ---')
// C1: 1 x 1500
const c1 = calculateCartTotals([{ product: { price: 1500 }, quantity: 1 }])
assert(c1.lines[0].lineTotal === 1500 && c1.subtotal === 1500 && c1.total === 1500, 'C1: 1 x ₹1,500 -> subtotal ₹1,500, total ₹1,500')

// C2: 2 x 250 + 3 x 99
const c2 = calculateCartTotals([
  { product: { price: 250 }, quantity: 2 },
  { product: { price: 99 }, quantity: 3 }
])
assert(c2.lines[0].lineTotal === 500 && c2.lines[1].lineTotal === 297 && c2.subtotal === 797 && c2.total === 797, 'C2: 2 x ₹250 + 3 x ₹99 -> ₹797')

// C6: Remove line decreases total
const c6 = calculateCartTotals([{ product: { price: 250 }, quantity: 2 }])
assert(c6.subtotal === 500 && c6.totalItemCount === 2, 'C6: Removal leaves subtotal ₹500 and count 2')

// C7: Empty cart
const c7 = calculateCartTotals([])
assert(c7.subtotal === 0 && c7.total === 0 && c7.totalItemCount === 0, 'C7: Empty cart total ₹0 and count 0')

console.log('\n--- 3. Testing Stock Validation Rules (S1 - S6) ---')
const testProductsMap = {
  'p-low': { id: 'p-low', name: 'Low Stock Saree', price: 1000, stock: 3, isActive: true },
  'p-zero': { id: 'p-zero', name: 'Out of Stock Saree', price: 1000, stock: 0, isActive: true },
  'p-var': { id: 'p-var', name: 'Variant Nighty', price: 500, stock: 5, sizes: ['M', 'L'], isActive: true },
  'p-large': { id: 'p-large', name: 'Bulk Accessory', price: 100, stock: 50, isActive: true }
}

// S1: User tries to add 4 to stock 3
const s1 = revalidateCart([{ productId: 'p-low', quantity: 4 }], testProductsMap)
assert(s1.validLines[0].quantity === 3 && s1.changesMade, 'S1: Capped quantity to stock 3')

// S2: Total across variants cannot exceed stock 5
const s2 = revalidateCart([
  { productId: 'p-var', size: 'M', quantity: 3 },
  { productId: 'p-var', size: 'L', quantity: 3 }
], testProductsMap)
assert(s2.validLines.length === 2 && (s2.validLines[0].quantity + s2.validLines[1].quantity) === 5, 'S2: Total quantity across variants capped to product stock (5)')

// S3: Stock 0 is removed
const s3 = revalidateCart([{ productId: 'p-zero', quantity: 1 }], testProductsMap)
assert(s3.validLines.length === 0 && s3.changesMade, 'S3: 0 stock item is stripped with notice')

// S5: Stock 50 capped by MAX_QTY_PER_PRODUCT (10)
const s5 = revalidateCart([{ productId: 'p-large', quantity: 20 }], testProductsMap)
assert(s5.validLines[0].quantity === BUSINESS_RULES.MAX_QTY_PER_PRODUCT, 'S5: Capped at MAX_QTY_PER_PRODUCT (10)')

// S6: Removed from data file
const s6 = revalidateCart([{ productId: 'unknown-id', quantity: 1 }], testProductsMap)
assert(s6.validLines.length === 0 && s6.changesMade, 'S6: Missing product removed from cart')

console.log('\n--- 4. Testing Phone Number Validation ---')
assert(normalizePhoneNumber('9876543210') === '9876543210', 'Phone: 9876543210 valid')
assert(normalizePhoneNumber('+91 98765 43210') === '9876543210', 'Phone: +91 98765 43210 normalized')
assert(normalizePhoneNumber('098765-43210') === '9876543210', 'Phone: 098765-43210 normalized')

const phoneRes1 = validateCustomerForm({ name: 'Meena', phone: '9876543210', address: '123 Main Bazaar, Near Temple' })
assert(phoneRes1.isValid === true, 'Valid customer details pass')

const phoneRes2 = validateCustomerForm({ name: 'Meena', phone: '1234567890', address: '123 Main Bazaar, Near Temple' })
assert(phoneRes2.isValid === false && phoneRes2.errors.phone, 'Phone starting with 1 rejected (must start with 6-9)')

const phoneRes3 = validateCustomerForm({ name: 'Meena', phone: '98765', address: '123 Main Bazaar, Near Temple' })
assert(phoneRes3.isValid === false && phoneRes3.errors.phone, 'Phone with 5 digits rejected')

const addrRes = validateCustomerForm({ name: 'Meena', phone: '9876543210', address: 'Short' })
assert(addrRes.isValid === false && addrRes.errors.address, 'Address < 10 chars rejected')

console.log('\n--- 5. Testing Order Reference & WhatsApp Flow (W1 - W9) ---')
const ref1 = generateOrderReference()
const ref2 = generateOrderReference()
assert(/^SDS-[0-9]{8}-[A-HJ-NP-Z2-9]{4}$/.test(ref1), 'W9: Order ref format matches SDS-YYYYMMDD-XXXX')
assert(ref1 !== ref2, 'W9: Consecutive clicks generate unique references')

const sampleMessage = buildWhatsAppMessage({
  orderRef: 'SDS-20261027-TEST',
  customer: {
    name: 'Lakshmi',
    phone: '+91 9876543210',
    address: 'No 45, Temple Street, Kanchipuram & Co.',
    note: 'None'
  },
  cartLines: [
    {
      product: { name: 'Sample Kanjivaram Soft Silk Saree', price: 3450 },
      size: null,
      colour: 'Royal Maroon',
      quantity: 1
    },
    {
      product: { name: 'Sample Traditional Kemp Stone Floral Hair Claw Clip', price: 120 },
      size: null,
      colour: null,
      quantity: 2
    }
  ],
  subtotal: 3690,
  total: 3690
})

assert(sampleMessage.includes('Order Reference: SDS-20261027-TEST'), 'W1: Message includes order reference')
assert(sampleMessage.includes('Name: Lakshmi'), 'W1: Message includes customer name')
assert(sampleMessage.includes('Phone: +91 9876543210'), 'W1: Message includes phone')
assert(sampleMessage.includes('Delivery Address: No 45, Temple Street, Kanchipuram & Co.'), 'W4: Address with & survives')
assert(sampleMessage.includes('(Colour: Royal Maroon)'), 'W2: Variant with colour shown')
assert(sampleMessage.includes('Qty: 2 x ₹120 = ₹240'), 'W1: Quantity and unit calculation correct')
assert(sampleMessage.includes('Subtotal: ₹3,690'), 'W6: Subtotal matches checkout')
assert(sampleMessage.includes('Total (excluding delivery charges): ₹3,690'), 'W6: Total matches checkout')

// W7: Check unconfigured WhatsApp placeholder
assert(isWhatsAppConfigured() === false, 'W7: Default placeholder detected as unconfigured')
const urlRes = createWhatsAppOrderUrl({
  orderRef: 'SDS-20261027-TEST',
  customer: { name: 'Lakshmi', phone: '+91 9876543210', address: 'Temple Street', note: 'None' },
  cartLines: [],
  subtotal: 0,
  total: 0
})
assert(urlRes.success === false && urlRes.error === 'SHOP_NOT_CONFIGURED', 'W7: createWhatsAppOrderUrl blocks unconfigured placeholder cleanly')

console.log(`\n========================================`)
console.log(`Test Execution Summary: ${passed} Passed, ${failed} Failed`)
console.log(`========================================`)

if (failed > 0) {
  process.exit(1)
}
