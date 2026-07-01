import React, { useState, useEffect } from 'react';
import './App.css';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard';

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('shop');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Fetch items on mount
  useEffect(() => {
    fetchItems();
    fetchOrders();
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/items`);
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to load items: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find(c => c.id === item.id);
    if (existingItem) {
      setCart(cart.map(c =>
        c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(c => c.id !== itemId));
  };

  const updateCartQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(c =>
        c.id === itemId ? { ...c, quantity } : c
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = async (customerName, customerEmail) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: cart.map(item => ({ id: item.id, quantity: item.quantity })),
          customerName,
          customerEmail
        })
      });
      if (!response.ok) throw new Error('Failed to place order');
      const newOrder = await response.json();
      setOrders([...orders, newOrder]);
      setError(null);
      clearCart();
      alert('Order placed successfully! Order ID: ' + newOrder.id);
      setActiveTab('dashboard');
      return true;
    } catch (err) {
      setError('Failed to place order: ' + err.message);
      console.error(err);
      return false;
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1>🔑 KeyChain Store</h1>
          <p>Premium 3D Printed Keychains - Best Deals Under ₹100</p>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <nav className="nav-tabs">
        <button
          className={`tab ${activeTab === 'shop' ? 'active' : ''}`}
          onClick={() => setActiveTab('shop')}
        >
          🛍️ Shop
        </button>
        <button
          className={`tab ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          🛒 Cart ({cartCount})
        </button>
        <button
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📦 Orders
        </button>
      </nav>

      <main className="container">
        {loading && activeTab === 'shop' && <div className="loading">Loading items...</div>}

        {activeTab === 'shop' && !loading && (
          <Shop items={items} onAddToCart={addToCart} />
        )}

        {activeTab === 'cart' && (
          <Cart
            cartItems={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemove={removeFromCart}
            onCheckout={handleCheckout}
            onClear={clearCart}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard orders={orders} />
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 KeyChain Store. Fast Delivery | Best Quality | Affordable Prices</p>
      </footer>
    </div>
  );
}

export default App;
