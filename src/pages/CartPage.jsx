import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, ArrowRight, AlertTriangle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'
import { BUSINESS_RULES } from '../config/shopConfig'

export default function CartPage() {
  const {
    cartLines,
    subtotal,
    total,
    totalItemCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    notices,
    dismissNotice
  } = useCart()

  const [confirmClear, setConfirmClear] = useState(false)
  const navigate = useNavigate()

  if (cartLines.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-bg-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            color: 'var(--color-primary)'
          }}
        >
          <ShoppingBag size={36} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
          Your Cart is Empty
        </h1>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '420px', margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
          Looks like you haven't added any items to your shopping cart yet. Browse our traditional sarees and collections to find something you love.
        </p>
        <Link to="/shop" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
          <ArrowLeft size={16} /> Explore Catalogue
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-page" style={{ padding: '2.5rem 0 4rem 0' }}>
      <div className="container">
        {/* Page Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-primary)' }}>
              Shopping Cart
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Review your items before proceeding to WhatsApp checkout ({totalItemCount} items)
            </p>
          </div>

          <button
            onClick={() => setConfirmClear(true)}
            className="btn btn-outline"
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem', borderColor: '#D3C3B1' }}
          >
            Clear Cart
          </button>
        </div>

        {/* Clear Cart Confirmation Prompt (PRD CART-13) */}
        {confirmClear && (
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1.5px solid #FECACA',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-error)' }}>
              <AlertTriangle size={20} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                Are you sure you want to remove all items from your cart?
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => {
                  clearCart()
                  setConfirmClear(false)
                }}
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--color-error)', padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
              >
                Yes, Clear
              </button>
              <button
                onClick={() => setConfirmClear(false)}
                className="btn btn-outline"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Notices per STK-5 */}
        {notices.map((notice, idx) => (
          <div key={idx} className="notice-box">
            <span>{notice}</span>
            <button onClick={() => dismissNotice(idx)} style={{ fontWeight: 700 }}>
              ✕
            </button>
          </div>
        ))}

        <div className="cart-layout">
          {/* Cart Item Cards List */}
          <div className="cart-items-list">
            {cartLines.map((item) => {
              const effectiveMax = Math.min(item.product.stock, BUSINESS_RULES.MAX_QTY_PER_PRODUCT)
              // Calculate total for this product across all lines in cart
              const productCartTotal = cartLines
                .filter(l => l.productId === item.productId)
                .reduce((sum, l) => sum + l.quantity, 0)

              const canIncrease = productCartTotal < effectiveMax

              return (
                <div key={item.lineKey} className="cart-item-card">
                  <div className="cart-item-img">
                    <img
                      src={item.product.images?.[0] || BUSINESS_RULES.DEFAULT_PLACEHOLDER_IMAGE}
                      alt={item.product.name}
                      onError={(e) => {
                        e.currentTarget.src = BUSINESS_RULES.DEFAULT_PLACEHOLDER_IMAGE
                      }}
                    />
                  </div>

                  <div className="cart-item-details">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Link to={`/product/${item.product.id}`} className="cart-item-title">
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.productId, item.size, item.colour)}
                        aria-label={`Remove ${item.product.name} from cart`}
                        style={{ color: '#9E8D93', padding: '0.25rem', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#B91C1C')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#9E8D93')}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Variant tags */}
                    <div className="cart-item-variant">
                      {item.size && <span>Size: <strong>{item.size}</strong> </span>}
                      {item.colour && <span>Colour: <strong>{item.colour}</strong></span>}
                      {!item.size && !item.colour && <span>Standard Option</span>}
                    </div>

                    <div className="cart-item-price">
                      {formatINR(item.product.price)} each
                    </div>

                    <div className="cart-item-actions">
                      {/* Quantity Stepper */}
                      <div className="qty-stepper" style={{ height: '38px' }}>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.colour, -1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          style={{ width: '38px', height: '38px' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ width: '38px', fontSize: '0.9rem' }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.colour, 1)}
                          disabled={!canIncrease}
                          aria-label="Increase quantity"
                          style={{ width: '38px', height: '38px' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                        {formatINR(item.product.price * item.quantity)}
                      </div>
                    </div>

                    {!canIncrease && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-warning)', marginTop: '0.35rem' }}>
                        Only {effectiveMax} units of this product available
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cart Summary & Checkout Action */}
          <div>
            <div className="summary-box">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-row">
                <span>Items ({totalItemCount}):</span>
                <span>{formatINR(subtotal)}</span>
              </div>

              <div className="summary-row">
                <span>Local Delivery Charges:</span>
                <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>Confirmed via WhatsApp</span>
              </div>

              <div className="summary-row total">
                <span>Total:</span>
                <span className="total-amount">{formatINR(total)}</span>
              </div>

              <div
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-text-subtle)',
                  margin: '1rem 0 1.5rem 0',
                  lineHeight: 1.5,
                  backgroundColor: 'var(--color-bg-subtle)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                * Delivery charges, if any, will be calculated and confirmed by the shop on WhatsApp after receiving your order.
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem 1.25rem', fontSize: '1rem' }}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Link to="/shop" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                  &larr; Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
