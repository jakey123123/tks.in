const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage
let items = [
  { id: 1, name: 'Miniature Dragon', price: 25.00, description: 'Detailed 3D printed dragon', image: 'dragon.jpg', category: 'Figurines' },
  { id: 2, name: 'Phone Stand', price: 15.00, description: 'Adjustable phone stand', image: 'phone-stand.jpg', category: 'Accessories' },
  { id: 3, name: 'Desk Organizer', price: 30.00, description: 'Multi-compartment desk organizer', image: 'organizer.jpg', category: 'Office' }
];

let orders = [];
let nextItemId = 4;
let nextOrderId = 1;

// Routes

// Get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Get single item
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// Add new item
app.post('/api/items', (req, res) => {
  const { name, price, description, image, category } = req.body;
  const newItem = {
    id: nextItemId++,
    name,
    price,
    description,
    image,
    category
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update item
app.put('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  
  Object.assign(item, req.body);
  res.json(item);
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  items = items.filter(i => i.id != req.params.id);
  res.json({ message: 'Item deleted' });
});

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Create order
app.post('/api/orders', (req, res) => {
  const { itemId, quantity, customerName, customerEmail } = req.body;
  const item = items.find(i => i.id == itemId);
  if (!item) return res.status(404).json({ error: 'Item not found' });

  const order = {
    id: nextOrderId++,
    itemId,
    itemName: item.name,
    quantity,
    totalPrice: item.price * quantity,
    customerName,
    customerEmail,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  res.status(201).json(order);
});

// Get order status
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

// Update order status
app.put('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id == req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  
  order.status = req.body.status || order.status;
  res.json(order);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access backend at http://localhost:${PORT}/api`);
});
