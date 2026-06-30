import React from 'react';

function ItemsList({ items, onSelectItem }) {
  return (
    <div className="items-grid">
      {items.map(item => (
        <div 
          key={item.id} 
          className="item-card"
          onClick={() => onSelectItem(item)}
        >
          <div className="item-image">🎨</div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p className="item-price">${item.price.toFixed(2)}</p>
          <small style={{color: '#95a5a6'}}>{item.category}</small>
        </div>
      ))}
    </div>
  );
}

export default ItemsList;
