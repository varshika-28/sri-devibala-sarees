import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, ArrowUpDown, X, AlertCircle } from 'lucide-react'
import { CATEGORIES, ALL_CATEGORIES_ID } from '../config/categories'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function ShopPage() {
  const { products } = useCart()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialCat = searchParams.get('category') || ALL_CATEGORIES_ID
  const initialSearch = searchParams.get('q') || ''

  const [selectedCategory, setSelectedCategory] = useState(initialCat)
  const [searchText, setSearchText] = useState(initialSearch)
  const [sortBy, setSortBy] = useState('default') // 'default', 'price-low', 'price-high'

  // Sync state if URL searchParams change
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || ALL_CATEGORIES_ID)
    setSearchText(searchParams.get('q') || '')
  }, [searchParams])

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId)
    const newParams = new URLSearchParams(searchParams)
    if (catId === ALL_CATEGORIES_ID) {
      newParams.delete('category')
    } else {
      newParams.set('category', catId)
    }
    setSearchParams(newParams)
  }

  const handleSearchChange = (val) => {
    setSearchText(val)
    const newParams = new URLSearchParams(searchParams)
    if (!val.trim()) {
      newParams.delete('q')
    } else {
      newParams.set('q', val)
    }
    setSearchParams(newParams)
  }

  const handleClearFilters = () => {
    setSelectedCategory(ALL_CATEGORIES_ID)
    setSearchText('')
    setSortBy('default')
    setSearchParams({})
  }

  // Filter & Search logic meeting PRD SF-1 through SF-5
  const filteredProducts = useMemo(() => {
    const query = searchText.trim().toLowerCase()

    return products
      .filter((p) => {
        // Must be active
        if (p.isActive === false) return false

        // Category filter
        if (selectedCategory !== ALL_CATEGORIES_ID && p.category !== selectedCategory) {
          return false
        }

        // Text search across name, description, and category name
        if (query) {
          const catObj = CATEGORIES.find(c => c.id === p.category)
          const catName = catObj ? catObj.name.toLowerCase() : ''
          const nameMatches = p.name.toLowerCase().includes(query)
          const descMatches = (p.description || '').toLowerCase().includes(query)
          const catMatches = catName.includes(query)

          if (!nameMatches && !descMatches && !catMatches) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.price - b.price
        }
        if (sortBy === 'price-high') {
          return b.price - a.price
        }
        return 0 // default order in products array
      })
  }, [products, selectedCategory, searchText, sortBy])

  return (
    <div className="shop-page" style={{ padding: '2.5rem 0 4rem 0' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
            Catalogue & Collection
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Explore genuine Indian sarees, soft nighties, in-skirts, dress materials, and matching accessories.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              md: 'row',
              gap: '1rem',
              alignItems: 'stretch',
              justifyContent: 'space-between',
              marginBottom: '1.25rem'
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-subtle)'
                }}
              />
              <input
                type="text"
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search products by title, fabric, or description..."
                className="form-input"
                style={{ paddingLeft: '2.5rem', height: '44px' }}
              />
              {searchText && (
                <button
                  onClick={() => handleSearchChange('')}
                  aria-label="Clear search"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-text-subtle)'
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <ArrowUpDown size={18} color="var(--color-primary)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ height: '44px', minWidth: '170px' }}
                aria-label="Sort products by price"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Categories:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                onClick={() => handleCategoryChange(ALL_CATEGORIES_ID)}
                className={`category-chip ${selectedCategory === ALL_CATEGORIES_ID ? 'active' : ''}`}
              >
                All ({products.length})
              </button>
              {CATEGORIES.map((cat) => {
                const count = products.filter(p => p.category === cat.id).length
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                  >
                    {cat.name} ({count})
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Product Count & Active Filter Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedCategory !== ALL_CATEGORIES_ID && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
            {searchText && ` matching "${searchText}"`}
          </div>

          {(selectedCategory !== ALL_CATEGORIES_ID || searchText || sortBy !== 'default') && (
            <button
              onClick={handleClearFilters}
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-primary)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <X size={14} /> Clear all filters
            </button>
          )}
        </div>

        {/* Product Grid or Empty State per PRD SF-6 */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 1.5rem',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                color: 'var(--color-primary)'
              }}
            >
              <Search size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
              No Products Found
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '450px', margin: '0 auto 1.5rem auto' }}>
              We could not find any items matching your current search or category filter. Try clearing your search or checking another category.
            </p>
            <button onClick={handleClearFilters} className="btn btn-primary">
              Clear Search & Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
