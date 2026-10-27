/**
 * Sri Devibala Sarees - Central Category Definitions
 * Source of truth for product categories as mandated by USER_PRD.md Section 11.1
 */

export const CATEGORIES = [
  { id: 'sarees', name: 'Sarees', description: 'Graceful silk, cotton, and party wear sarees' },
  { id: 'nighties', name: 'Nighties', description: 'Soft, breathable pure cotton everyday nighties' },
  { id: 'inner-skirts', name: 'Inner Skirts', description: 'Premium cotton petticoats and saree inners' },
  { id: 'chudidhar-materials', name: 'Chudidhar Materials', description: 'Unstitched salwar & chudidhar dress materials' },
  { id: 'hair-clips', name: 'Hair Clips', description: 'Traditional and trendy floral hair accessories' },
  { id: 'chains', name: 'Chains', description: 'Classic gold-finish and everyday fashion chains' },
  { id: 'earrings', name: 'Earrings', description: 'Stunning jhumkas, studs, and boutique drops' },
]

export const ALL_CATEGORIES_ID = 'all'

export function getCategoryName(categoryId) {
  const match = CATEGORIES.find(c => c.id === categoryId)
  return match ? match.name : categoryId
}
