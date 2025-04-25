import React, { useState, useEffect } from 'react';
import './Checkout.css';

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [selected, setSelected] = useState(null);
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('addresses')) || [];
    setAddresses(stored);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.name || !form.phone || !form.address) return alert("Fill all fields.");
    const updated = [...addresses];
    if (editIndex !== null) {
      updated[editIndex] = form;
    } else {
      updated.push(form);
    }
    localStorage.setItem('addresses', JSON.stringify(updated));
    setAddresses(updated);
    setForm({ name: '', phone: '', address: '' });
    setEditIndex(null);
  };

  const handleEdit = (i) => {
    setForm(addresses[i]);
    setEditIndex(i);
  };

  const handleDelete = (i) => {
    const updated = [...addresses];
    updated.splice(i, 1);
    localStorage.setItem('addresses', JSON.stringify(updated));
    setAddresses(updated);
    if (selected === i) setSelected(null);
  };

  const handlePlaceOrder = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.length) return alert("Cart is empty!");
    if (selected === null) return alert("Please select a delivery address!");

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const date = new Date().toLocaleDateString();
    const newOrders = cart.map((item, i) => ({
      id: `ORD${Date.now()}${i}`,
      name: item.name,
      price: item.price * (item.quantity || 1),
      date,
      address: addresses[selected],
      status: "Pending"
    }));

    localStorage.setItem('orders', JSON.stringify([...orders, ...newOrders]));
    localStorage.removeItem('cart');
    alert("Order placed successfully!");
    window.location.href = "/order-confirmation";
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="address-form">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <button onClick={handleSave}>{editIndex !== null ? "Update" : "Save"} Address</button>
      </div>

      <h3>Saved Addresses</h3>
      <div className="address-list">
        {addresses.map((addr, i) => (
          <div key={i} className={`address-card ${selected === i ? 'selected' : ''}`}>
            <p><strong>{addr.name}</strong></p>
            <p>{addr.phone}</p>
            <p>{addr.address}</p>
            <div className="addr-actions">
              <button onClick={() => setSelected(i)}>Select</button>
              <button onClick={() => handleEdit(i)}>Edit</button>
              <button onClick={() => handleDelete(i)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {selected !== null && (
        <div className="final-checkout">
          <button className="confirm-btn" onClick={handlePlaceOrder}>Confirm & Place Order</button>
        </div>
      )}

   
    </div>
  );
};

export default Checkout;
