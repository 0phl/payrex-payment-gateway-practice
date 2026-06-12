import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import './Home.css';

function Home() {
  const heroRef = useRef(null);
  const featured = products.slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      <section className="hero" ref={heroRef}>
        <div className="hero-video-wrap">
          <div className="hero-video-overlay"></div>
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1920&h=1080&fit=crop"
          >
            <source src="https://cdn.pixabay.com/video/2020/07/30/45349-445278498_large.mp4" type="video/mp4" />
          </video>
          <div className="hero-fallback"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-label">Artisan Floristry</span>
            <h1 className="hero-title">
              <span className="hero-line">Where Nature</span>
              <span className="hero-line">Meets Art</span>
            </h1>
            <p className="hero-subtitle">
              Handcrafted arrangements from Manila's finest flower studio. 
              Same-day delivery across Metro Manila.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn-primary">
                Explore Collection
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link to="/about" className="btn-secondary">Our Story</Link>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      <section className="marquee-section">
        <div className="marquee-track">
          <div className="marquee-content">
            <span>Fresh Blooms</span>
            <span className="marquee-dot"></span>
            <span>Same-Day Delivery</span>
            <span className="marquee-dot"></span>
            <span>Handcrafted</span>
            <span className="marquee-dot"></span>
            <span>Farm to Door</span>
            <span className="marquee-dot"></span>
            <span>Fresh Blooms</span>
            <span className="marquee-dot"></span>
            <span>Same-Day Delivery</span>
            <span className="marquee-dot"></span>
            <span>Handcrafted</span>
            <span className="marquee-dot"></span>
            <span>Farm to Door</span>
            <span className="marquee-dot"></span>
          </div>
          <div className="marquee-content" aria-hidden="true">
            <span>Fresh Blooms</span>
            <span className="marquee-dot"></span>
            <span>Same-Day Delivery</span>
            <span className="marquee-dot"></span>
            <span>Handcrafted</span>
            <span className="marquee-dot"></span>
            <span>Farm to Door</span>
            <span className="marquee-dot"></span>
            <span>Fresh Blooms</span>
            <span className="marquee-dot"></span>
            <span>Same-Day Delivery</span>
            <span className="marquee-dot"></span>
            <span>Handcrafted</span>
            <span className="marquee-dot"></span>
            <span>Farm to Door</span>
            <span className="marquee-dot"></span>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <span className="section-label">Curated for You</span>
              <h2 className="section-title">Featured Arrangements</h2>
            </div>
            <Link to="/shop" className="view-all">
              View All
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="split-section reveal">
        <div className="split-image">
          <img
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=960&h=1200&fit=crop"
            alt="Flower arrangement"
          />
        </div>
        <div className="split-content">
          <span className="section-label">Our Philosophy</span>
          <h2 className="split-title">Every Petal Tells a Story</h2>
          <p className="split-text">
            We source directly from local farms in Benguet and Davao, 
            ensuring the freshest blooms reach your doorstep. Each arrangement 
            is a unique composition, crafted by hand with intention and care.
          </p>
          <Link to="/about" className="btn-primary">
            Learn More
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </section>

      <section className="full-image-section reveal">
        <Link to="/shop" className="full-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=1920&h=800&fit=crop"
            alt="Flower studio"
          />
          <div className="full-image-overlay">
            <span className="full-image-text">View Our Full Collection</span>
          </div>
        </Link>
        <Link to="/shop" className="full-image-link">Shop All Arrangements</Link>
      </section>

      <section className="testimonials-section reveal">
        <div className="container">
          <span className="section-label">What People Say</span>
          <h2 className="section-title">From Our Customers</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <p>"Absolutely stunning arrangements. The attention to detail is remarkable — every flower was perfectly placed."</p>
              <div className="testimonial-author">
                <span className="testimonial-name">Maria Santos</span>
                <span className="testimonial-role">Verified Buyer</span>
              </div>
            </div>
            <div className="testimonial">
              <p>"Bloomfield has been our go-to for every occasion. The flowers always arrive fresh and beautifully wrapped."</p>
              <div className="testimonial-author">
                <span className="testimonial-name">Ana Reyes</span>
                <span className="testimonial-role">Regular Customer</span>
              </div>
            </div>
            <div className="testimonial">
              <p>"Ordered for my mother's birthday — she was absolutely delighted. The delivery was prompt and the packaging immaculate."</p>
              <div className="testimonial-author">
                <span className="testimonial-name">Carla Cruz</span>
                <span className="testimonial-role">Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">Bloomfield</span>
            <p className="footer-tagline">Artisan floristry for every moment.</p>
          </div>
          <div className="footer-columns">
            <div className="footer-col">
              <h4>Shop</h4>
              <Link to="/shop">All Flowers</Link>
              <Link to="/shop">Roses</Link>
              <Link to="/shop">Seasonal</Link>
              <Link to="/shop">Wedding</Link>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <a href="#">Sustainability</a>
              <a href="#">Careers</a>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <a href="#">Contact</a>
              <a href="#">Delivery Info</a>
              <a href="#">FAQ</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Bloomfield. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
