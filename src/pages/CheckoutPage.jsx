import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageCircle, AlertTriangle, ShieldCheck, CheckCircle2, Copy } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'
import { validateCustomerForm } from '../utils/validation'
import { generateOrderReference, createWhatsAppOrderUrl } from '../utils/whatsapp'
import { SHOP_CONFIG, isWhatsAppConfigured } from '../config/shopConfig'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartLines, subtotal, total, revalidateBeforeCheckout, clearCart } = useCart()

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [submissionError, setSubmissionError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Post-submission modal / guidance state
  const [openedWhatsAppState, setOpenedWhatsAppState] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // If cart is empty, redirect back or show notice
  if (cartLines.length === 0 && !openedWhatsAppState) {
    return (
      <div className="container" style={{ padding: '4rem 1.25rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          Your Cart is Empty
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link to="/shop" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Shop
        </Link>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear field-specific error as user types per CHK-1
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    setSubmissionError(null)

    // 1. Validate Form Fields per Section 14
    const validation = validateCustomerForm(formData)
    if (!validation.isValid) {
      setFieldErrors(validation.errors)
      return
    }

    // 2. Revalidate Cart against current stock per STK-5 & STK-6
    const { isValid: cartIsValid, notices } = revalidateBeforeCheckout()
    if (!cartIsValid) {
      setSubmissionError('Cart contents were updated due to stock or availability changes. Please review your updated order below.')
      return
    }

    // 3. Double-click prevention
    if (isSubmitting) return
    setIsSubmitting(true)

    // 4. Generate Order Reference per click (SDS-YYYYMMDD-XXXX)
    const orderRef = generateOrderReference(new Date())

    // 5. Create WhatsApp link
    const waResult = createWhatsAppOrderUrl({
      orderRef,
      customer: validation.sanitized,
      cartLines,
      subtotal,
      total
    })

    if (!waResult.success) {
      setSubmissionError(waResult.message)
      setIsSubmitting(false)
      return
    }

    // 6. Open WhatsApp click-to-chat link
    try {
      window.open(waResult.url, '_blank', 'noopener,noreferrer')
    } catch (err) {
      console.warn('Pop-up prevented direct open, manual link provided.', err)
    }

    // 7. Store state to show guidance screen per WA-4 & WA-5
    setOpenedWhatsAppState({
      orderRef,
      url: waResult.url,
      rawMessage: waResult.rawMessage,
      customer: validation.sanitized
    })

    setIsSubmitting(false)
  }

  const handleCopyMessage = () => {
    if (openedWhatsAppState?.rawMessage) {
      navigator.clipboard.writeText(openedWhatsAppState.rawMessage)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    }
  }

  const isWaConfigured = isWhatsAppConfigured()

  return (
    <div className="checkout-page" style={{ padding: '2.5rem 0 4rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/cart')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.88rem',
              color: 'var(--color-text-muted)',
              marginBottom: '1rem',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} /> Back to Cart
          </button>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-primary)' }}>
            Checkout & WhatsApp Order
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Enter your delivery details to generate a complete, formatted order message for Sri Devibala Sarees.
          </p>
        </div>

        {/* Post-Submit Guidance Screen per WA-4 & WA-5 */}
        {openedWhatsAppState ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid var(--color-accent-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem 1.75rem',
              maxWidth: '680px',
              margin: '0 auto',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-whatsapp-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                color: 'var(--color-whatsapp)'
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
              Order Reference: {openedWhatsAppState.orderRef}
            </span>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary)', margin: '0.5rem 0 1rem 0' }}>
              Order Request Prepared!
            </h2>

            <p style={{ color: 'var(--color-text-main)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              WhatsApp should now be open in a new tab. <strong>Please remember to press "Send" in WhatsApp</strong> to share your order with our shop.
            </p>

            <div
              style={{
                backgroundColor: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'left',
                fontSize: '0.88rem',
                color: 'var(--color-text-muted)',
                marginBottom: '1.75rem'
              }}
            >
              <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '0.4rem' }}>
                Important Ordering Note:
              </strong>
              Your order is <strong>not confirmed</strong> until the shop receives your WhatsApp message, checks live stock, and agrees on delivery arrangements and payment with you.
            </div>

            {/* Direct Link button if popup was blocked */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <a
                href={openedWhatsAppState.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: '0.85rem' }}
              >
                <MessageCircle size={18} /> Open WhatsApp Again
              </a>

              <button
                onClick={handleCopyMessage}
                className="btn btn-outline"
                style={{ padding: '0.75rem', fontSize: '0.88rem' }}
              >
                <Copy size={16} /> {copiedLink ? 'Copied Message to Clipboard!' : 'Copy Order Text to Clipboard'}
              </button>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                onClick={() => {
                  clearCart()
                  navigate('/')
                }}
                className="btn btn-primary"
                style={{ fontSize: '0.9rem' }}
              >
                I have sent the order, clear cart
              </button>

              <button
                onClick={() => setOpenedWhatsAppState(null)}
                className="btn btn-outline"
                style={{ fontSize: '0.9rem' }}
              >
                Back to Edit Order
              </button>
            </div>
          </div>
        ) : (
          /* Normal Checkout View */
          <div className="cart-layout">
            {/* Left: Customer Info Form */}
            <div>
              <form
                onSubmit={handleSubmitOrder}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
                noValidate
              >
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
                  Customer & Delivery Details
                </h2>

                {submissionError && (
                  <div className="notice-box error" style={{ marginBottom: '1.25rem' }}>
                    <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                    <span>{submissionError}</span>
                  </div>
                )}

                {/* WhatsApp configuration warning banner if not configured */}
                {!isWaConfigured && (
                  <div className="notice-box" style={{ marginBottom: '1.25rem' }}>
                    <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                    <div>
                      <strong>Shop WhatsApp Configuration Required:</strong>
                      <p style={{ fontSize: '0.82rem', marginTop: '0.2rem' }}>
                        The shop's WhatsApp number is currently set to placeholder <span className="placeholder-callout">{SHOP_CONFIG.whatsappNumber}</span>. Please configure <code>VITE_SHOP_WHATSAPP_NUMBER</code> in your environment before placing live orders.
                      </p>
                    </div>
                  </div>
                )}

                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="customer-name" className="form-label">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="customer-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. S. Meenakshi"
                    className={`form-input ${fieldErrors.name ? 'has-error' : ''}`}
                    required
                  />
                  {fieldErrors.name && <div className="form-error">{fieldErrors.name}</div>}
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                  <label htmlFor="customer-phone" className="form-label">
                    Mobile Number (WhatsApp) <span className="req">*</span>
                  </label>
                  <input
                    id="customer-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210 or +91 98765 43210"
                    className={`form-input ${fieldErrors.phone ? 'has-error' : ''}`}
                    required
                  />
                  <div className="form-hint">10-digit Indian mobile number for order coordination.</div>
                  {fieldErrors.phone && <div className="form-error">{fieldErrors.phone}</div>}
                </div>

                {/* Local Delivery Address */}
                <div className="form-group">
                  <label htmlFor="customer-address" className="form-label">
                    Local Delivery Address <span className="req">*</span>
                  </label>
                  <textarea
                    id="customer-address"
                    name="address"
                    rows={3}
                    autoComplete="street-address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House/Door No., Street name, Landmark, Area name"
                    className={`form-textarea ${fieldErrors.address ? 'has-error' : ''}`}
                    required
                  />
                  <div className="form-hint">
                    Local delivery only. We deliver to: <span className="placeholder-callout">{SHOP_CONFIG.deliveryArea}</span>
                  </div>
                  {fieldErrors.address && <div className="form-error">{fieldErrors.address}</div>}
                </div>

                {/* Optional Note */}
                <div className="form-group">
                  <label htmlFor="customer-note" className="form-label">
                    Delivery Instructions or Note <span style={{ fontWeight: 400, color: 'var(--color-text-subtle)' }}>(Optional)</span>
                  </label>
                  <textarea
                    id="customer-note"
                    name="note"
                    rows={2}
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Any specific instructions, preferred delivery timing, or saree matching queries..."
                    className={`form-textarea ${fieldErrors.note ? 'has-error' : ''}`}
                  />
                  {fieldErrors.note && <div className="form-error">{fieldErrors.note}</div>}
                </div>

                {/* Action Button */}
                <div style={{ marginTop: '1.75rem' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting || cartLines.length === 0}
                    className="btn btn-whatsapp"
                    style={{ width: '100%', padding: '0.95rem 1.5rem', fontSize: '1.05rem' }}
                  >
                    <MessageCircle size={20} />
                    Place Order on WhatsApp
                  </button>

                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--color-text-subtle)',
                      textAlign: 'center',
                      marginTop: '0.75rem',
                      lineHeight: 1.4
                    }}
                  >
                    Clicking opens your WhatsApp app with a prefilled message. You must tap "Send" in WhatsApp. No online payment is charged on this site.
                  </p>
                </div>
              </form>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div className="summary-box">
                <h3 className="summary-title">Order Items ({cartLines.length})</h3>

                <div style={{ maxHeight: '320px', overflowY: 'auto', marginBottom: '1.25rem', paddingRight: '0.25rem' }}>
                  {cartLines.map((item) => (
                    <div
                      key={item.lineKey}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0',
                        borderBottom: '1px solid var(--color-border)',
                        fontSize: '0.88rem'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{item.product.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                          Qty: {item.quantity}
                          {item.size && ` • Size: ${item.size}`}
                          {item.colour && ` • Colour: ${item.colour}`}
                        </div>
                      </div>
                      <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                        {formatINR(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatINR(subtotal)}</span>
                </div>

                <div className="summary-row">
                  <span>Delivery Charges:</span>
                  <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>Confirmed via WhatsApp</span>
                </div>

                <div className="summary-row total">
                  <span>Estimated Total:</span>
                  <span className="total-amount">{formatINR(total)}</span>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--color-bg-subtle)',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-muted)',
                    marginTop: '1rem',
                    lineHeight: 1.5
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>
                    <ShieldCheck size={16} /> No Payment Required Now
                  </div>
                  Payment options and delivery confirmation will be shared directly by the shop after your WhatsApp message is reviewed.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
