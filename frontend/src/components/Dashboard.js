import React from 'react';
import './Dashboard.css';

function Dashboard({ orders }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'processing':
        return '#3b82f6';
      case 'shipped':
        return '#10b981';
      case 'delivered':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalItems = orders.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
  }, 0);

  return (
    <div className="dashboard-container">
      <h2>Your Orders</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{orders.length}</p>
        </div>
        <div className="stat-card">
          <h3>Items Ordered</h3>
          <p className="stat-value">{totalItems}</p>
        </div>
        <div className="stat-card">
          <h3>Total Spent</h3>
          <p className="stat-value">${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="orders-section">
        <h3>Order History</h3>
        {orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📭</div>
            <p>No orders yet. Start shopping!</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <h4>Order #{order.id}</h4>
                    <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="order-items">
                  {order.items.map(item => (
                    <div key={item.itemId} className="order-item">
                      <span>{item.itemName}</span>
                      <span className="qty">x{item.quantity}</span>
                      <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="order-footer">
                  <span>Customer: {order.customerName}</span>
                  <span className="order-total">Total: ${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
