// === src/pages/ProductManager.js ===
import React, { useState } from 'react';
import './ProductManager.css';

const ProductManager = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: 'Plants',
  });

  const user = JSON.parse(localStorage.getItem('currentUser'));

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    if (!product.name || !product.price || !product.image) {
      alert('Please fill all fields.');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('products')) || [];
    existing.push(product);
    localStorage.setItem('products', JSON.stringify(existing));
    alert('Product added!');
    setProduct({ name: '', price: '', image: '', description: '', category: 'Plants' });
  };

  return (
    <div className="product-manager">
      <h2>Add Product</h2>
      <div className="form-group">
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price (₹)" />
        <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" />
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" />
        <select name="category" value={product.category} onChange={handleChange}>
          <option>Plants</option>
          <option>Seeds</option>
          <option>Flowers</option>
          <option>Pots</option>
          <option>Decor</option>
        </select>
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {!user && (
        <button onClick={() => window.location.href = '/login'} className="checkout-helper-btn">
          Please login to continue
        </button>
      )}
      {user?.isAdmin && (
        <button onClick={() => window.location.href = '/orders'} className="checkout-helper-btn">
          Go to Admin Panel
        </button>
      )}
    </div>
  );
};

export default ProductManager;