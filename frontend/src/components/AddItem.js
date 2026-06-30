import React, { useState } from 'react';

function AddItem({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Figurines',
    image: 'item.jpg'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.description) {
      onAdd(formData);
      setFormData({
        name: '',
        price: '',
        description: '',
        category: 'Figurines',
        image: 'item.jpg'
      });
    }
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Miniature Dragon"
            />
          </div>
          <div style={styles.formGroup}>
            <label>Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              required
              placeholder="25.00"
            />
          </div>
          <div style={styles.formGroup}>
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your 3D print"
              rows="3"
            />
          </div>
          <div style={styles.formGroup}>
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option>Figurines</option>
              <option>Accessories</option>
              <option>Office</option>
              <option>Home Decor</option>
              <option>Other</option>
            </select>
          </div>
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitBtn}>Add Item</button>
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
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    maxWidth: '400px',
    width: '90%'
  },
  formGroup: {
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
    backgroundColor: '#667eea',
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

export default AddItem;
