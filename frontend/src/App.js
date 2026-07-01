import React, { useState, useEffect } from 'react';
import './App.css';
import ItemList from './components/ItemList';
import OrderForm from './components/OrderForm';
import Dashboard from './components/Dashboard';

function App() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('items');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Fetch items on mount
  useEffect(() => {
    fetchItems();
    fetchOrders();
  }, []);

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

  const handleAddItem = async (itemData) => {
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
      });
      if (!response.ok) throw new Error('Failed to add item');
      const newItem = await response.json();
      setItems([...items, newItem]);
      setError(null);
    } catch (err) {
      setError('Failed to add item: ' + err.message);
      console.error(err);
    }
  };

  const handlePlaceOrder = async (orderData) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) throw new Error('Failed to place order');
      const newOrder = await response.json();
      setOrders([...orders, newOrder]);
      setError(null);
      alert('Order placed successfully! Order ID: ' + newOrder.id);
    } catch (err) {
      setError('Failed to place order: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🖨️ 3D Print Shop</h1>
        <p>Quality 3D printed items</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <nav className="nav-tabs">
        <button
          className={`tab ${activeTab === 'items' ? 'active' : ''}`}
          onClick={() => setActiveTab('items')}
        >
          Items
        </button>
        <button
          className={`tab ${activeTab === 'order' ? 'active' : ''}`}
          onClick={() => setActiveTab('order')}
        >
          Place Order
        </button>
        <button
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
      </nav>

      <main className="container">
        {loading && activeTab === 'items' && <div className="loading">Loading items...</div>}

        {activeTab === 'items' && !loading && (
          <ItemList items={items} onAddItem={handleAddItem} />
        )}

        {activeTab === 'order' && (
          <OrderForm items={items} onPlaceOrder={handlePlaceOrder} />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard orders={orders} />
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 3D Print Shop. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
