import React, { useState } from 'react';
import './OrderForm.css';

function OrderForm({ items, onPlaceOrder }) {
  const [formData, setFormData] = useState({
    itemId: '',
    quantity: 1,
    customerName: '',
    customerEmail: ''
  });
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'itemId' ? parseInt(value) : value
    }));

    if (name === 'itemId') {
      const item = items.find(i => i.id === parseInt(value));
      setSelectedItem(item);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.itemId || !formData.quantity || !formData.customerName) {
      alert('Please fill in all required fields');
      return;
    }
    await onPlaceOrder(formData);
  };

  const totalPrice = selectedItem ? selectedItem.price * formData.quantity : 0;

  return (
    <div className="order-form-container">
      <div className="order-card">
        <h2>Place an Order</h2>
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label htmlFor="itemId">Select Item *</label>
            <select
              id="itemId"
              name="itemId"
              value={formData.itemId}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose an item --</option>
              {items.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} - ${item.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {selectedItem && (
            <div className="item-summary">
              <h3>{selectedItem.name}</h3>
              <p>{selectedItem.description}</p>
              <p className="item-price">Price: ${selectedItem.price.toFixed(2)}</p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              max="100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customerName">Your Name *</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customerEmail">Email</label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </div>

          {selectedItem && (
            <div className="order-summary">
              <div className="summary-row">
                <span>Item Price:</span>
                <span>${selectedItem.price.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Quantity:</span>
                <span>{formData.quantity}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
