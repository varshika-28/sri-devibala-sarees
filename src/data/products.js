/**
 * Sri Devibala Sarees - Initial Product Data
 * As mandated by USER_PRD.md Section 21.2 - 21.4:
 * - All sample/demo products are clearly labelled as "Sample"
 * - Covers all 7 categories: sarees, nighties, inner-skirts, chudidhar-materials, hair-clips, chains, earrings
 * - High-quality curated Unsplash boutique imagery with neutral SVG fallbacks
 * - Prices are whole integers in INR
 */

export const INITIAL_PRODUCTS = [
  // --- SAREES ---
  {
    id: 'saree-001',
    name: 'Sample Kanjivaram Soft Silk Saree',
    description: 'Sample traditional Kanjivaram soft silk saree featuring an ornate golden zari border, rich pallu, and matching unstitched blouse piece. Ideal for weddings and festivals.',
    category: 'sarees',
    price: 3450,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [],
    colours: ['Royal Maroon', 'Temple Green', 'Mustard Gold'],
    stock: 6,
    isActive: true
  },
  {
    id: 'saree-002',
    name: 'Sample Lightweight Chanderi Cotton Saree',
    description: 'Sample handloom Chanderi cotton saree with delicate floral motifs and a lightweight sheen. Comfortable and breathable for summer functions and temple visits.',
    category: 'sarees',
    price: 1850,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [],
    colours: ['Pastel Pink', 'Sky Blue', 'Mint Green'],
    stock: 8,
    isActive: true
  },
  {
    id: 'saree-003',
    name: 'Sample Banarasi Art Silk Saree',
    description: 'Sample festive Banarasi art silk saree woven with intricate floral jaal patterns. Grand look at a friendly budget.',
    category: 'sarees',
    price: 2200,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [],
    colours: ['Crimson Red', 'Peacock Blue'],
    stock: 0, // Demonstrates out-of-stock UI per PRD CP-2
    isActive: true
  },

  // --- NIGHTIES ---
  {
    id: 'nighty-001',
    name: 'Sample Pure Cotton Printed Nighty',
    description: 'Sample 100% combed cotton nighty with fine floral hand-block prints, side pocket, and a comfortable round neck. Soft on the skin for daily home wear.',
    category: 'nighties',
    price: 480,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['L', 'XL', 'XXL'],
    colours: ['Navy Floral', 'Maroon Paisley', 'Teal Green'],
    stock: 12,
    isActive: true
  },
  {
    id: 'nighty-002',
    name: 'Sample Feeding / Front Zip Cotton Nighty',
    description: 'Sample premium soft cotton nighty with discreet dual vertical front zippers. Specially tailored for nursing mothers with maximum ease.',
    category: 'nighties',
    price: 550,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XL', 'XXL'],
    colours: ['Lavender', 'Rose Pink'],
    stock: 5,
    isActive: true
  },

  // --- INNER SKIRTS ---
  {
    id: 'inner-001',
    name: 'Sample Premium 6-Panel Cotton Saree Petticoat',
    description: 'Sample heavy-count pure cotton saree inner skirt (in-skirt) with reinforced waistband and drawstring. Pre-shrunk fabric ensures longevity.',
    category: 'inner-skirts',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Regular (38")', 'Plus (42")'],
    colours: ['Maroon', 'Black', 'Ivory White', 'Golden Yellow'],
    stock: 15,
    isActive: true
  },
  {
    id: 'inner-002',
    name: 'Sample Lycra Saree Silhouette Shapewear',
    description: 'Sample stretchable mermaid cut saree shapewear petticoat with bottom flare for effortless walking and sleek saree draping.',
    category: 'inner-skirts',
    price: 650,
    images: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colours: ['Beige Skin', 'Black', 'Wine Red'],
    stock: 4,
    isActive: true
  },

  // --- CHUDIDHAR MATERIALS ---
  {
    id: 'chudi-001',
    name: 'Sample Chanderi Cotton Chudidhar Material with Dupatta',
    description: 'Sample unstitched 3-piece suit set: Chanderi cotton top with neck embroidery, matching cotton bottom, and a grand printed dupatta.',
    category: 'chudidhar-materials',
    price: 1350,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Unstitched (2.5m each)'],
    colours: ['Olive Green', 'Deep Rust', 'Indigo Blue'],
    stock: 7,
    isActive: true
  },
  {
    id: 'chudi-002',
    name: 'Sample Daily Wear Cotton Bandhani Dress Material',
    description: 'Sample soft Jaipuri bandhani printed top and bottom fabric with chiffon dupatta. Colorfast and easy to maintain.',
    category: 'chudidhar-materials',
    price: 890,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Unstitched (2m each)'],
    colours: ['Yellow & Red', 'Blue & White'],
    stock: 9,
    isActive: true
  },

  // --- HAIR CLIPS ---
  {
    id: 'clip-001',
    name: 'Sample Traditional Kemp Stone Floral Hair Claw Clip',
    description: 'Sample high-durability acrylic clutch clip adorned with antique gold-finish kemp red and green stones. Perfect for festive updos.',
    category: 'hair-clips',
    price: 120,
    images: [
      'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [],
    colours: ['Antique Ruby', 'Emerald Green', 'Multi-colour'],
    stock: 20,
    isActive: true
  },
  {
    id: 'clip-002',
    name: 'Sample Pearl Beaded French Hair Barrette',
    description: 'Sample handcrafted faux pearl hair slide barrette with a sturdy metal lock. Elegant touch for everyday and office hairstyles.',
    category: 'hair-clips',
    price: 150,
    images: [
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [],
    colours: ['Classic Ivory Pearl', 'Rose Gold Pearl'],
    stock: 10,
    isActive: true
  },

  // --- CHAINS ---
  {
    id: 'chain-001',
    name: 'Sample 1-Gram Micro Gold Plated Daily Wear Chain',
    description: 'Sample micro-plated flexible link rope chain with micro polish. Non-allergic and long-lasting shine suitable for daily wear.',
    category: 'chains',
    price: 450,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['18 inches', '22 inches', '24 inches'],
    colours: ['Gold Finish'],
    stock: 8,
    isActive: true
  },
  {
    id: 'chain-002',
    name: 'Sample Traditional Mugappu Side-Pendant Chain',
    description: 'Sample South Indian traditional designer chain featuring an exquisite side peacock mugappu encrusted with synthetic rubies.',
    category: 'chains',
    price: 780,
    images: [
      'https://images.unsplash.com/photo-1611591475152-473523dd665e?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['24 inches'],
    colours: ['Ruby & Gold'],
    stock: 3,
    isActive: true
  },

  // --- EARRINGS ---
  {
    id: 'earring-001',
    name: 'Sample Antique Temple Jhumkas with Pearl Drops',
    description: 'Sample heritage Lakshmi motif bell jhumkas with hanging rice pearls and subtle antique matte gold finish. Lightweight on earlobes.',
    category: 'earrings',
    price: 380,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [],
    colours: ['Antique Gold', 'Matte Ruby'],
    stock: 14,
    isActive: true
  },
  {
    id: 'earring-002',
    name: 'Sample Sparkling American Diamond Daily Studs',
    description: 'Sample classic solitaire floral stud earrings with premium Swiss cubic zirconia stones and push-back lock. Great for everyday elegance.',
    category: 'earrings',
    price: 260,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [],
    colours: ['Silver Rhodium', 'Rose Gold'],
    stock: 16,
    isActive: true
  }
]

/**
 * Validate product data integrity on boot per PRD DATA-1 and DATA-2
 */
export function validateProductData(products) {
  const seenIds = new Set()
  const validProducts = []

  for (const p of products) {
    if (!p.id || seenIds.has(p.id)) {
      console.error(`[DATA ERROR] Duplicate or missing ID for product: ${p.name || 'Unknown'}`)
      continue
    }
    seenIds.add(p.id)

    if (!p.name || p.name.length < 3) {
      console.error(`[DATA ERROR] Invalid product name:`, p)
      continue
    }

    if (typeof p.price !== 'number' || p.price <= 0 || !Number.isInteger(p.price)) {
      console.error(`[DATA ERROR] Price must be a positive integer in INR:`, p)
      continue
    }

    if (!Array.isArray(p.images) || p.images.length === 0) {
      console.error(`[DATA ERROR] Product must have at least one image:`, p)
      continue
    }

    if (typeof p.stock !== 'number' || p.stock < 0) {
      console.error(`[DATA ERROR] Stock must be a non-negative integer:`, p)
      continue
    }

    validProducts.push(p)
  }

  return validProducts
}

// Development check execution
if (import.meta.env && import.meta.env.DEV) {
  validateProductData(INITIAL_PRODUCTS)
}
