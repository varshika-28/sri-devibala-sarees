import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, MessageCircle, ArrowRight, Sparkles, Shield, HeartHandshake } from 'lucide-react'
import { SHOP_CONFIG, isWhatsAppConfigured } from '../config/shopConfig'
import { CATEGORIES } from '../config/categories'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const { products } = useCart()
  const isWaConfigured = isWhatsAppConfigured()

  // Featured sample products (first 4 items)
  const featuredProducts = products.slice(0, 4)
  // New arrivals (next 4 items)
  const newArrivals = products.slice(4, 8)

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-pattern"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">
              <Sparkles size={14} /> Local Boutique Excellence
            </div>
            <h1 className="hero-title">{SHOP_CONFIG.tagline}</h1>
            <p className="hero-subtitle">
              Welcome to {SHOP_CONFIG.shopName}. Discover handpicked traditional sarees, soft daily wear cotton nighties, unstitched chudidhar sets, and everyday matching jewellery.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-accent" style={{ fontSize: '1rem', padding: '0.85rem 1.75rem' }}>
                <ShoppingBag size={18} /> Shop Catalogue
              </Link>
              {isWaConfigured ? (
                <a
                  href={`https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Sri Devibala Sarees, I would like to inquire about your collection.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ fontSize: '0.95rem' }}
                >
                  <MessageCircle size={18} /> Chat with Us
                </a>
              ) : (
                <span
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    padding: '0.5rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: '#FFE2DE'
                  }}
                >
                  WhatsApp Inquiries: Setup Pending
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section style={{ backgroundColor: 'var(--color-bg-card)', borderBottom: '1px solid var(--color-border)', padding: '2rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)'
                }}
              >
                <Sparkles size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Curated Quality</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Handpicked fabrics & durable micro-plated jewellery.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)'
                }}
              >
                <MessageCircle size={24} color="#25D366" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)' }}>WhatsApp Ordering</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Direct conversation with shop for personalized assistance.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)'
                }}
              >
                <HeartHandshake size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)' }}>Local Friendly Retail</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Trusted neighbourhood boutique shopping experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Shortcuts Section */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Browse Categories</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-primary)' }}>
              Explore Our Collection
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              From ceremonial silks to everyday hair clips and accessories, browse all categories.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '1rem'
            }}
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem 1rem',
                  textAlign: 'center',
                  transition: 'var(--transition)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
                className="category-card"
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent-bg)',
                    border: '1px solid var(--color-accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.75rem',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  {cat.name.slice(0, 1)}
                </div>
                <h4 style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>
                  {cat.name}
                </h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-accent-dark)' }}>
                  View All &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '3rem 0', backgroundColor: 'var(--color-bg-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <span className="badge badge-maroon" style={{ marginBottom: '0.5rem' }}>Handpicked</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--color-primary)' }}>
                Featured Products
              </h2>
            </div>
            <Link to="/shop" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Fresh Stock</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--color-primary)' }}>
                New Arrivals
              </h2>
            </div>
            <Link to="/shop" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Help / Local Delivery Assurance Box */}
      <section style={{ padding: '3rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, #FBF5EE 0%, #F5EAE0 100%)',
              border: '1.5px solid var(--color-accent-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              md: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem'
            }}
          >
            <div style={{ maxWidth: '650px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <MessageCircle size={22} color="#25D366" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-primary)' }}>
                  Questions About Fabric, Fit or Saree Drapes?
                </h3>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                We are a local retail shop and are happy to assist you directly. Add items to your cart to generate an order request, or chat with us for color matching and availability.
              </p>
              <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--color-text-subtle)' }}>
                * Local delivery only. Delivery charges and timing will be confirmed by the shop on WhatsApp.
              </div>
            </div>

            <div>
              <Link to="/shop" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                Start Shopping Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
