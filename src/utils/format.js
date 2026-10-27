/**
 * Sri Devibala Sarees - Currency & Text Formatters
 * Rules: Whole integer rupees with Indian number grouping (CP-4)
 */

export function formatINR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0'
  }
  return `₹${Math.round(amount).toLocaleString('en-IN')}`
}

/**
 * Format date for order reference and display
 * e.g., '27 Oct 2026'
 */
export function formatDate(date = new Date()) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const d = date.getDate()
  const m = months[date.getMonth()]
  const y = date.getFullYear()
  return `${d} ${m} ${y}`
}
