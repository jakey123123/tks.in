import React, { useState } from 'react';
import './Cart.css';

function Cart({ cartItems, onUpdateQuantity, onRemove, onCheckout, onClear }) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!customerName.trim()) {
      alert('Please enter your name');
      return;
    }
    setIsCheckingOut(true);
    const success = await onCheckout(customerName, customerEmail);
    if (success) {
      setCustomerName('');
      setCustomerEmail('');
    }
    setIsCheckingOut(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Add some keychains to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-items">
          <h2>Shopping Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</h2>
          <div className="items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">{item.image}</div>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="price">${item.price.toFixed(2)}</p>
                </div>
                <div className="quantity-control">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                <button
                  className="remove-btn"
                  onClick={() => onRemove(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-panel">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="free">Free</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="checkout-form">
            <h3>Checkout</h3>
            <input
              type="text"
              placeholder="Your Name *"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : 'Complete Order'}
            </button>
            <button
              className="clear-btn"
              onClick={onClear}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
