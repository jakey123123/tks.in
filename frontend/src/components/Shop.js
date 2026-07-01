import React from 'react';
import './Shop.css';

function Shop({ items, onAddToCart }) {
  return (
    <div className="shop-container">
      <div className="shop-header">
        <h2>✨ Our Premium Keychains</h2>
        <p>Affordable, Durable & Stylish - All Under ₹100!</p>
      </div>

      {items.length === 0 ? (
        <div className="no-items">No items available.</div>
      ) : (
        <div className="items-grid">
          {items.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-badge">Best Deal</div>
              <div className="item-image">{item.image}</div>
              <div className="item-content">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <div className="item-footer">
                  <span className="price">₹{item.price}</span>
                  <button
                    className="add-btn"
                    onClick={() => onAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;
