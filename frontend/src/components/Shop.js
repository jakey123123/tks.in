import React from 'react';
import './Shop.css';

function Shop({ items, onAddToCart }) {
  return (
    <div className="shop-container">
      <div className="shop-header">
        <h2>Our Keychains</h2>
        <p>Premium 3D printed keychains - Fast, Durable, Affordable</p>
      </div>

      {items.length === 0 ? (
        <div className="no-items">No items available.</div>
      ) : (
        <div className="items-grid">
          {items.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-image">{item.image}</div>
              <div className="item-content">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <div className="item-footer">
                  <span className="price">${item.price.toFixed(2)}</span>
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
