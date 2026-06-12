import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isHome ? 'navbar-home' : 'navbar-page'}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            Bloomfield
          </Link>
          <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>
          <div className="navbar-actions">
            <Link to="/cart" className="cart-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </Link>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <Link to="/" className="mobile-link">Home</Link>
          <Link to="/shop" className="mobile-link">Shop</Link>
          <Link to="/about" className="mobile-link">About</Link>
          <Link to="/cart" className="mobile-link">Cart ({itemCount})</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
