import React, { useState, useEffect } from 'react';
import ItemsList from './components/ItemsList';
import AddItem from './components/AddItem';
import OrderForm from './components/OrderForm';
import OrderDashboard from './components/OrderDashboard';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchItems();
    fetchOrders();
    // Poll for new orders every 2 seconds
    const interval = setInterval(fetchOrders, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/items`);
      setItems(await response.json());
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`);
      setOrders(await response.json());
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      await fetchItems();
      setShowAddItem(false);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleOrder = async (orderData) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const newOrder = await response.json();
      setOrders([...orders, newOrder]);
      setShowOrderForm(false);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🎨 3D Print Shop</h1>
        <div className="header-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => setShowDashboard(!showDashboard)}
          >
            {showDashboard ? 'Shop' : '📊 Dashboard'}
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddItem(!showAddItem)}
          >
            {showAddItem ? 'Close' : '+ Add Item'}
          </button>
        </div>
      </header>

      {showAddItem && (
        <AddItem onAdd={handleAddItem} onCancel={() => setShowAddItem(false)} />
      )}

      <main className="main-content">
        {showDashboard ? (
          <OrderDashboard orders={orders} />
        ) : (
          <div className="container">
            <div className="items-section">
              <h2>Available Items</h2>
              <ItemsList 
                items={items}
                onSelectItem={(item) => {
                  setSelectedItem(item);
                  setShowOrderForm(true);
                }}
              />
            </div>

            {showOrderForm && selectedItem && (
              <OrderForm 
                item={selectedItem}
                onOrder={handleOrder}
                onCancel={() => setShowOrderForm(false)}
              />
            )}

            <div className="orders-section">
              <h2>Recent Orders</h2>
              <div className="orders-list">
                {orders.length === 0 ? (
                  <p className="empty-state">No orders yet</p>
                ) : (
                  orders.slice().reverse().slice(0, 5).map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-info">
                        <h4>{order.itemName}</h4>
                        <p>Qty: {order.quantity} | Total: ${order.totalPrice.toFixed(2)}</p>
                        <p className="customer">by {order.customerName}</p>
                      </div>
                      <div className={`order-status status-${order.status}`}>
                        {order.status}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
