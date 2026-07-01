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
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="dashboard-container">
      <h2>Order Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{orders.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-value" style={{ color: '#f59e0b' }}>{pendingOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Delivered</h3>
          <p className="stat-value" style={{ color: '#10b981' }}>{completedOrders}</p>
        </div>
      </div>

      <div className="orders-table-container">
        <h3>Recent Orders</h3>
        {orders.length === 0 ? (
          <p className="no-orders">No orders yet.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Item</th>
                <th>Customer</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="order-id">#{order.id}</td>
                  <td>{order.itemName}</td>
                  <td>{order.customerName}</td>
                  <td className="quantity">{order.quantity}</td>
                  <td className="price">${order.totalPrice.toFixed(2)}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
