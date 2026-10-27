import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, MessageSquare, ShieldCheck, Truck } from 'lucide-react'
import { SHOP_CONFIG, isWhatsAppConfigured } from '../config/shopConfig'
import { CATEGORIES } from '../config/categories'

export default function Footer() {
  const isWaConfigured = isWhatsAppConfigured()

  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Ordering Note */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-primary)',
                  border: '1px solid var(--color-accent)',
                  color: 'var(--color-accent-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700
                }}
              >
                SDB
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFF8F3' }}>
                {SHOP_CONFIG.shopName}
              </h3>
            </div>
            <p>{SHOP_CONFIG.shortBio}</p>
            <div
              style={{
                marginTop: '1.25rem',
                padding: '0.85rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                borderLeft: '3px solid var(--color-accent)',
                fontSize: '0.82rem'
              }}
            >
              <strong style={{ color: 'var(--color-accent-light)', display: 'block', marginBottom: '0.25rem' }}>
                How Ordering Works:
              </strong>
              Browse our catalogue, add items to cart, and click "Place Order on WhatsApp". We will confirm availability and delivery directly.
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="footer-col">
            <h4>Quick Categories</h4>
            <ul>
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link to={`/shop?category=${c.id}`} style={{ transition: 'color 0.2s' }}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Delivery & Payment Rules */}
          <div className="footer-col">
            <h4>Local Delivery & Pay</h4>
            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <Truck size={18} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#FFFFFF', fontSize: '0.85rem', display: 'block' }}>Delivery Area:</strong>
                <span className="placeholder-callout" style={{ marginTop: '0.2rem' }}>
                  {SHOP_CONFIG.deliveryArea}
                </span>
                <p style={{ fontSize: '0.8rem', marginTop: '0.35rem', color: '#B5A5AA' }}>
                  {SHOP_CONFIG.deliveryNote}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <ShieldCheck size={18} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#FFFFFF', fontSize: '0.85rem', display: 'block' }}>Payment Terms:</strong>
                <p style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: '#B5A5AA' }}>
                  {SHOP_CONFIG.paymentNote}
                </p>
              </div>
            </div>
          </div>

          {/* Col 4: Shop Contact Placeholders */}
          <div className="footer-col" id="about">
            <h4>Store Information</h4>
            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <MapPin size={18} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#FFFFFF', fontSize: '0.85rem', display: 'block' }}>Shop Address:</strong>
                <span className="placeholder-callout" style={{ marginTop: '0.2rem' }}>
                  {SHOP_CONFIG.shopAddress}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <Clock size={18} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#FFFFFF', fontSize: '0.85rem', display: 'block' }}>Business Hours:</strong>
                <p style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: '#B5A5AA' }}>
                  {SHOP_CONFIG.businessHours}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1rem' }}>
              <MessageSquare size={18} color="#25D366" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#FFFFFF', fontSize: '0.85rem', display: 'block' }}>WhatsApp Orders:</strong>
                {isWaConfigured ? (
                  <a
                    href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#25D366', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    Chat with Shop
                  </a>
                ) : (
                  <span className="placeholder-callout" style={{ marginTop: '0.2rem' }}>
                    {SHOP_CONFIG.whatsappNumber}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom / Privacy Notice */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {SHOP_CONFIG.shopName}. Built for local boutique retail.
          </p>
          <p style={{ fontSize: '0.78rem' }}>
            Privacy Note: Customer information is used strictly in-memory to generate your WhatsApp order message. No data is saved to external servers.
          </p>
        </div>
      </div>
    </footer>
  )
}
