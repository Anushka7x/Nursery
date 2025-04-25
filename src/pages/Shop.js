// === src/pages/Shop.js ===
import React, { useEffect, useState } from 'react';
import './Shop.css';

const Shop = () => {
  const [shopData, setShopData] = useState({});
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  useEffect(() => {
    const defaultSections = {
     
    };

    const added = JSON.parse(localStorage.getItem('products')) || [];
    const updatedSections = { ...defaultSections };

    added.forEach((item) => {
      const cat = item.category || 'Plants';
      if (!updatedSections[cat]) updatedSections[cat] = [];
      updatedSections[cat].push(item);
    });

    setShopData(updatedSections);
  }, []);

  const handleDelete = (productToDelete) => {
    const all = JSON.parse(localStorage.getItem('products')) || [];
    const updated = all.filter(p => p.name !== productToDelete.name);
    localStorage.setItem('products', JSON.stringify(updated));
    window.location.reload();
  };

  const handleEdit = (item) => {
    setEditing(item);
    setEditName(item.name);
    setEditPrice(item.price);
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="shop-container">
      <h2 className="shop-title">Shop All Categories</h2>

      {Object.entries(shopData).map(([category, items], idx) => (
        <div key={idx} className="shop-section">
          <h3>{category}</h3>
          <div className="shop-grid">
            {items.map((item, i) => (
              <div className="product-card" key={i}>
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>

                <div className="admin-actions">
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item)}>Delete</button>
                </div>
                <button className="cart-btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {editing && (
        <div className="edit-modal">
          <div className="edit-content">
            <h3>Edit Product</h3>
            <input type="text" value={editName} onChange={e => setEditName(e.target.value)} />
            <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} />
            <button onClick={() => {
              const all = JSON.parse(localStorage.getItem('products')) || [];
              const updated = all.map(p =>
                p.name === editing.name ? { ...p, name: editName, price: editPrice } : p
              );
              localStorage.setItem('products', JSON.stringify(updated));
              setEditing(null);
              window.location.reload();
            }}>Save</button>
            <button onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
