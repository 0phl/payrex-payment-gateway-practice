import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import products from '../data/products';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="product-detail">
        <div className="not-found">
          <h2>Product not found</h2>
          <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-detail">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/shop">Shop</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span>{product.name}</span>
        </div>

        <div className="detail-layout">
          <div className="detail-gallery">
            <div className="detail-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>
          <div className="detail-info">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-name">{product.name}</h1>
            <div className="detail-meta">
              <span className="detail-rating">{product.rating} ★</span>
              <span className="detail-reviews">{product.reviews} reviews</span>
            </div>
            <p className="detail-price">₱{product.price.toLocaleString()}</p>
            <div className="detail-divider"></div>
            <p className="detail-description">{product.longDescription}</p>

            <div className="detail-actions">
              <div className="quantity-selector">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="qty-btn"
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
              <button
                className={`add-to-cart-btn ${added ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            <div className="detail-perks">
              <div className="perk">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Farm fresh guarantee</span>
              </div>
              <div className="perk">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                <span>Free delivery over ₱1,000</span>
              </div>
              <div className="perk">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Arranged by expert florists</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
