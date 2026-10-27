import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, Plus, Minus, MessageCircle, ShieldCheck, Check, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { getCategoryName } from '../config/categories'
import { formatINR } from '../utils/format'
import { BUSINESS_RULES, SHOP_CONFIG, isWhatsAppConfigured } from '../config/shopConfig'

export default function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { productsMap, addToCart, cartLines } = useCart()

  const product = productsMap[productId]

  // Initial local states
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null)
  const [selectedColour, setSelectedColour] = useState(product?.colours?.[0] || null)
  const [quantity, setQuantity] = useState(1)
  const [errorMessage, setErrorMessage] = useState(null)

  if (!product || product.isActive === false) {
    return (
      <div className="container" style={{ padding: '5rem 1.25rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          Product Not Found
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          The product you are looking for does not exist or has been removed.
        </p>
        <Link to="/shop" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Shop
        </Link>
      </div>
    )
  }

  const isOutOfStock = product.stock <= 0
  const effectiveMax = Math.min(product.stock, BUSINESS_RULES.MAX_QTY_PER_PRODUCT)

  // Current product quantity already in cart
  const currentInCartForProduct = cartLines
    .filter(l => l.productId === product.id)
    .reduce((sum, l) => sum + l.quantity, 0)

  const remainingAvailable = Math.max(0, effectiveMax - currentInCartForProduct)

  const handleQtyChange = (delta) => {
    const nextQty = quantity + delta
    if (nextQty >= 1 && nextQty <= Math.max(1, remainingAvailable)) {
      setQuantity(nextQty)
      setErrorMessage(null)
    }
  }

  const handleAddToCart = () => {
    setErrorMessage(null)
    const res = addToCart(product, {
      size: selectedSize,
      colour: selectedColour,
      quantity
    })

    if (!res.success) {
      setErrorMessage(res.message)
    } else {
      // Reset quantity to 1 after successful addition
      setQuantity(1)
    }
  }

  const isWaConfigured = isWhatsAppConfigured()
  const activeImage = product.images?.[selectedImageIndex] || BUSINESS_RULES.DEFAULT_PLACEHOLDER_IMAGE

  return (
    <div className="product-detail-page" style={{ padding: '2rem 0 4rem 0' }}>
      <div className="container">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.88rem',
            color: 'var(--color-text-muted)',
            marginBottom: '1.5rem',
            fontWeight: 600
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="detail-layout">
          {/* Left Column: Image Gallery */}
          <div className="detail-gallery">
            <div className="detail-main-img">
              <img
                src={activeImage}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src = BUSINESS_RULES.DEFAULT_PLACEHOLDER_IMAGE
                }}
              />
            </div>

            {/* Thumbnail switcher if multiple images exist */}
            {product.images?.length > 1 && (
              <div className="detail-thumbs">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`detail-thumb-btn ${selectedImageIndex === idx ? 'active' : ''}`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      onError={(e) => {
                        e.currentTarget.src = BUSINESS_RULES.DEFAULT_PLACEHOLDER_IMAGE
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Information & Options */}
          <div className="detail-info">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-gold">{getCategoryName(product.category)}</span>
                {isOutOfStock ? (
                  <span className="badge badge-stock-out">Out of stock</span>
                ) : product.stock <= 3 ? (
                  <span className="badge badge-stock-low">Only {product.stock} units available</span>
                ) : (
                  <span className="badge badge-stock-in">In stock ({product.stock})</span>
                )}
              </div>

              <h1 className="detail-title">{product.name}</h1>
              <div className="detail-price" style={{ marginTop: '0.75rem' }}>
                {formatINR(product.price)}
              </div>
            </div>

            {/* Product Description */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                {product.description}
              </p>
            </div>

            {/* Error / Notice box if any */}
            {errorMessage && (
              <div className="notice-box error">
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Size Options (if product defines sizes) */}
            {product.sizes?.length > 0 && (
              <div>
                <div className="variant-group-title">
                  Select Size: <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>{selectedSize}</span>
                </div>
                <div className="variant-options">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`variant-pill ${selectedSize === s ? 'active' : ''}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colour Options (if product defines colours) */}
            {product.colours?.length > 0 && (
              <div>
                <div className="variant-group-title">
                  Select Colour: <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>{selectedColour}</span>
                </div>
                <div className="variant-options">
                  {product.colours.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColour(c)}
                      className={`variant-pill ${selectedColour === c ? 'active' : ''}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart Action */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                <div className="qty-stepper">
                  <button
                    onClick={() => handleQtyChange(-1)}
                    disabled={isOutOfStock || quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => handleQtyChange(1)}
                    disabled={isOutOfStock || quantity >= remainingAvailable}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || remainingAvailable <= 0}
                  className="btn btn-primary"
                  style={{ flex: 1, minWidth: '180px' }}
                >
                  <ShoppingBag size={18} />
                  {isOutOfStock
                    ? 'Out of Stock'
                    : remainingAvailable <= 0
                    ? 'Max In Cart'
                    : 'Add to Cart'}
                </button>
              </div>

              {currentInCartForProduct > 0 && (
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                  ({currentInCartForProduct} already in your cart. Maximum allowed per order: {effectiveMax})
                </div>
              )}
            </div>

            {/* WhatsApp Quick Ask & Local Delivery Notice */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={16} color="var(--color-primary)" />
                <span>Local delivery only. Availability & charges confirmed by shop.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="var(--color-primary)" />
                <span>No online payment gateway. Pay directly upon order confirmation.</span>
              </div>

              {isWaConfigured && (
                <a
                  href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello Sri Devibala Sarees, I have a question regarding: ${product.name} (${formatINR(product.price)})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#25D366',
                    fontWeight: 600,
                    marginTop: '0.25rem'
                  }}
                >
                  <MessageCircle size={16} /> Ask shop about this product on WhatsApp &rarr;
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
