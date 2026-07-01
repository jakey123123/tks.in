import React, { useState } from 'react';
import './ItemList.css';

function ItemList({ items, onAddItem }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', image: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please fill in name and price');
      return;
    }
    await onAddItem({
      ...formData,
      price: parseFloat(formData.price)
    });
    setFormData({ name: '', description: '', price: '', image: '' });
    setShowForm(false);
  };

  return (
    <div className="items-container">
      <div className="items-header">
        <h2>Available Items</h2>
        <button className="add-item-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add New Item'}
        </button>
      </div>

      {showForm && (
        <form className="add-item-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">Add Item</button>
        </form>
      )}

      <div className="items-grid">
        {items.length === 0 ? (
          <p className="no-items">No items available yet.</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className="placeholder">📦</div>
                )}
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="price">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ItemList;
