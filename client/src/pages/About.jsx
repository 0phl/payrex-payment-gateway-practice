import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <span className="section-label">Our Story</span>
          <h1 className="about-title">
            Where Nature<br />Meets Artistry
          </h1>
          <p className="about-subtitle">
            Bloomfield was born from a simple belief: flowers have the power 
            to transform moments into memories.
          </p>
        </div>
      </section>

      <section className="about-split reveal">
        <div className="container">
          <div className="about-split-grid">
            <div className="about-split-image">
              <img
                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=1000&fit=crop"
                alt="Our flower studio"
              />
            </div>
            <div className="about-split-content">
              <span className="section-label">Est. 2020</span>
              <h2>Fresh From Farm to Your Door</h2>
              <p>
                What started as a small corner stall in Quezon City has grown 
                into Manila's most loved online flower shop. We partner directly 
                with local farms in Benguet and Davao to bring you the freshest 
                blooms at fair prices.
              </p>
              <p>
                Every arrangement is handcrafted by our team of expert florists 
                who share a passion for turning nature's beauty into art. We believe 
                that everyone deserves access to beautiful flowers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section reveal">
        <div className="container">
          <span className="section-label">What We Stand For</span>
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-number">01</span>
              <h3>Sustainability</h3>
              <p>We use eco-friendly packaging and work with farms that practice sustainable agriculture.</p>
            </div>
            <div className="value-card">
              <span className="value-number">02</span>
              <h3>Community</h3>
              <p>We support local farmers and hire from the communities we serve.</p>
            </div>
            <div className="value-card">
              <span className="value-number">03</span>
              <h3>Quality</h3>
              <p>Every stem is inspected. Every arrangement is guaranteed. Your satisfaction is our promise.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta reveal">
        <div className="container">
          <h2>Ready to Brighten Someone's Day?</h2>
          <p>Shop our collection of handcrafted arrangements delivered fresh to your door.</p>
          <Link to="/shop" className="btn-primary">
            Shop Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
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
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <a href="#">Sustainability</a>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <a href="#">Contact</a>
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

export default About;
