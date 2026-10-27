import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingBag, Search, Menu, X, Phone, AlertCircle } from 'lucide-react'
import { SHOP_CONFIG, isWhatsAppConfigured } from '../config/shopConfig'
import { CATEGORIES } from '../config/categories'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { totalItemCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    navigate(`/shop?q=${encodeURIComponent(query)}`)
    setMobileMenuOpen(false)
  }

  const hasWhatsApp = isWhatsAppConfigured()

  return (
    <header className="site-header">
      {/* Top Banner with Delivery & WhatsApp Notice */}
      <div className="header-top">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Free local inquiries via WhatsApp • Fast confirmation</span>
          <span style={{ display: 'none', md: 'inline' }}>
            {!hasWhatsApp && <span style={{ opacity: 0.9 }}>WhatsApp placeholder mode active</span>}
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container">
        <div className="header-main">
          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            style={{ display: 'inline-flex', padding: '0.5rem', md: 'none' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} color="#6E1224" /> : <Menu size={24} color="#6E1224" />}
          </button>

          {/* Brand Logo & Name */}
          <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
            <div className="brand-icon">SDB</div>
            <div className="brand-text">
              <h1>{SHOP_CONFIG.shopName}</h1>
              <span>Traditional Boutique</span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              position: 'relative',
              maxWidth: '340px',
              width: '100%',
              display: 'none',
              lg: 'block'
            }}
            className="desktop-search"
          >
            <input
              type="text"
              placeholder="Search sarees, nighties, accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                borderRadius: '9999px',
                paddingRight: '2.5rem',
                fontSize: '0.88rem',
                height: '42px',
                backgroundColor: 'var(--color-bg-subtle)'
              }}
            />
            <button
              type="submit"
              aria-label="Search"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-primary)'
              }}
            >
              <Search size={18} />
            </button>
          </form>

          {/* Desktop Links */}
          <nav className="desktop-nav" style={{ display: 'none', md: 'block' }}>
            <ul className="nav-links">
              <li>
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Shop All
                </NavLink>
              </li>
              <li>
                <a href="#about" className="nav-link">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Cart Icon & Actions */}
          <div className="header-actions">
            <Link to="/cart" className="cart-btn" aria-label={`Shopping cart with ${totalItemCount} items`}>
              <ShoppingBag size={22} />
              {totalItemCount > 0 && <span className="cart-badge">{totalItemCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-dropdown"
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--color-border)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ borderRadius: '9999px', paddingRight: '2.5rem' }}
            />
            <button
              type="submit"
              aria-label="Search"
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-primary)'
              }}
            >
              <Search size={18} />
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontWeight: 600 }}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.4rem 0', color: 'var(--color-primary)' }}>
              Home
            </Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.4rem 0' }}>
              Shop All Products
            </Link>
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-accent-dark)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Categories
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {CATEGORIES.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.4rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingBag size={18} color="var(--color-primary)" />
              Cart ({totalItemCount} items)
            </Link>
          </div>
        </div>
      )}

      {/* Quick Category Bar */}
      <div className="category-quick-bar">
        <div className="container">
          <div className="category-chips">
            <NavLink
              to="/shop"
              end
              className={({ isActive }) => `category-chip ${isActive ? 'active' : ''}`}
            >
              All Items
            </NavLink>
            {CATEGORIES.map((cat) => (
              <NavLink
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className={({ isActive }) => `category-chip ${isActive ? 'active' : ''}`}
              >
                {cat.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
