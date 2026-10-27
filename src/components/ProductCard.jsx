import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Eye } from 'lucide-react'
import { formatINR } from '../utils/format'
import { getCategoryName } from '../config/categories'
import { BUSINESS_RULES } from '../config/shopConfig'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [imgSrc, setImgSrc] = useState(product.images?.[0] || BUSINESS_RULES.DEFAULT_PLACEHOLDER_IMAGE)
  const isOutOfStock = product.stock <= 0
  const isLowStock = product.stock > 0 && product.stock <= 3
  const categoryName = getCategoryName(product.category)

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // If the product requires variants, navigate to detail page
    if (product.sizes?.length > 0 || product.colours?.length > 0) {
      window.location.href = `/product/${product.id}`
      return
    }
    addToCart(product, { quantity: 1 })
  }

  const handleImageError = () => {
    setImgSrc(BUSINESS_RULES.DEFAULT_PLACEHOLDER_IMAGE)
  }

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-img-wrap" tabIndex={0}>
        <img
          src={imgSrc}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
          onError={handleImageError}
        />
        {/* Badges */}
        <div className="product-card-badge">
          {isOutOfStock ? (
            <span className="badge badge-stock-out">Out of stock</span>
          ) : isLowStock ? (
            <span className="badge badge-stock-low">Only {product.stock} left</span>
          ) : (
            <span className="badge badge-stock-in">In stock</span>
          )}
        </div>
      </Link>

      <div className="product-card-body">
        <span className="product-card-cat">{categoryName}</span>
        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="product-card-price-row">
          <div className="product-card-price">{formatINR(product.price)}</div>

          {isOutOfStock ? (
            <button className="btn btn-outline" disabled style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
              Unavailable
            </button>
          ) : product.sizes?.length > 0 || product.colours?.length > 0 ? (
            <Link
              to={`/product/${product.id}`}
              className="btn btn-outline"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
            >
              Choose Options
            </Link>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="btn btn-primary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus size={16} /> Add
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
