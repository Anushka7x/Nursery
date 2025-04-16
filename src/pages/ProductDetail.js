import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('products');
    const data = stored ? JSON.parse(stored) : [];
    setProduct(data[parseInt(id)] || null);
  }, [id]);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Added to cart!');
  };

  if (!product) return <p className="no-products">Product not found.</p>;

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>
        <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;