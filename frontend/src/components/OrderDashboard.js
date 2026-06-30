import React from 'react';

function OrderDashboard({ orders }) {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📊 Order Dashboard</h2>
        <p>Real-time order monitoring</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <div className="stat-value">{totalOrders}</div>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <div className="stat-value">{pendingOrders}</div>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <div className="stat-value">${totalRevenue.toFixed(2)}</div>
        </div>
      </div>

      <div className="dashboard-orders">
        <h3>All Orders</h3>
        {orders.length === 0 ? (
          <p className="empty-state">No orders yet</p>
        ) : (
          <div className="full-order-list">
            {orders.slice().reverse().map(order => (
              <div key={order.id} className="full-order-card">
                <div>
                  <h4>{order.itemName}</h4>
                  <p>ID: #{order.id}</p>
                  <p style={{fontSize: '12px', marginTop: '5px'}}><strong>Grade: {order.grade.toUpperCase()}</strong></p>
                </div>
                <div>
                  <p><strong>Customer:</strong> {order.customerName}</p>
                  <p>{order.customerEmail}</p>
                </div>
                <div>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p className="order-total">${order.totalPrice.toFixed(2)}</p>
                </div>
                <div className={`order-status status-${order.status}`}>
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDashboard;
