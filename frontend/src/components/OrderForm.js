import React, { useState } from 'react';

function OrderForm({ item, onOrder, onCancel }) {
  const [formData, setFormData] = useState({
    itemId: item.id,
    quantity: 1,
    grade: '7r',
    customerName: '',
    customerEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.customerName && formData.customerEmail) {
      onOrder(formData);
    }
  };

  const totalPrice = (item.price * formData.quantity).toFixed(2);

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2>Order: {item.name}</h2>
        <div style={styles.itemSummary}>
          <p>Price per unit: <strong>${item.price.toFixed(2)}</strong></p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Grade *</label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
            >
              <option value="7r">Grade 7R</option>
              <option value="7p">Grade 7P</option>
              <option value="8r">Grade 8R</option>
              <option value="8p">Grade 8P</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label>Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Your Name *</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>
          <div style={styles.formGroup}>
            <label>Email *</label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>
          <div style={styles.totalSection}>
            <h3>Total: ${totalPrice}</h3>
          </div>
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitBtn}>Place Order</button>
            <button type="button" onClick={onCancel} style={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1001
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    maxWidth: '400px',
    width: '90%'
  },
  itemSummary: {
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  totalSection: {
    backgroundColor: '#e8f4f8',
    padding: '15px',
    borderRadius: '5px',
    textAlign: 'center',
    marginBottom: '15px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px'
  },
  submitBtn: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  cancelBtn: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default OrderForm;
