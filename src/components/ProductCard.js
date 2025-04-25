import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, index }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${index}`} className="card-link">
        {product.image && <img src={product.image} alt={product.name} className="card-img" />}
        <h3>{product.name}</h3>
        <p>💵 {product.price}</p>
        <p>{product.description}</p>
        <p className="product-category">📦 {product.category}</p>
      </Link>
    </div>
  );
};

export default ProductCard;