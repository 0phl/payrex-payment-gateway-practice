import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import './Shop.css';

const categories = ['all', 'roses', 'seasonal', 'wedding', 'garden', 'tropical', 'modern'];

function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="shop">
      <div className="shop-hero">
        <span className="section-label">Our Collection</span>
        <h1 className="shop-title">Shop All Flowers</h1>
        <p className="shop-subtitle">Handcrafted arrangements for every occasion</p>
      </div>

      <div className="container">
        <div className="shop-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="shop-grid">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
