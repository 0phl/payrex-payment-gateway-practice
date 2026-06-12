import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, index = 0 }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="product-card-overlay">
          <span className="product-card-cta">View Details</span>
        </div>
      </div>
      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-card-category">{product.category}</span>
          <span className="product-card-rating">{product.rating}</span>
        </div>
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">₱{product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
