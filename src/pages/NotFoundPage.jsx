import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ShoppingBag } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '6rem 1.25rem', textAlign: 'center' }}>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '5rem',
          color: 'var(--color-primary)',
          lineHeight: 1,
          fontWeight: 700,
          marginBottom: '1rem'
        }}
      >
        404
      </div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
        Page Not Found
      </h1>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: '420px', margin: '0 auto 2rem auto', fontSize: '0.95rem' }}>
        The page you are looking for doesn't exist or may have been moved.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={16} /> Return to Home
        </Link>
        <Link to="/shop" className="btn btn-outline">
          <ShoppingBag size={16} /> Browse Collection
        </Link>
      </div>
    </div>
  )
}
