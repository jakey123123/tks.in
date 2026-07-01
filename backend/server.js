const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let items = [
  { id: 1, name: 'Mini Dragon', description: 'Cute mini dragon figurine', price: 15, image: 'dragon.jpg' },
  { id: 2, name: 'Phone Stand', description: 'Desk phone stand', price: 10, image: 'phone-stand.jpg' },
  { id: 3, name: 'Planter Pot', description: 'Small decorative planter', price: 12, image: 'planter.jpg' }
];

let orders = [];
let itemIdCounter = 4;
let orderIdCounter = 1;

// Routes

// Get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Get single item
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

// Add new item
app.post('/api/items', (req, res) => {
  const { name, description, price, image } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price required' });
  }

  const newItem = {
    id: itemIdCounter++,
    name,
    description: description || '',
    price,
    image: image || 'default.jpg'
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Create order
app.post('/api/orders', (req, res) => {
  const { itemId, quantity, customerName, customerEmail } = req.body;

  if (!itemId || !quantity || !customerName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const item = items.find(i => i.id === parseInt(itemId));
  if (!item) return res.status(404).json({ message: 'Item not found' });

  const order = {
    id: orderIdCounter++,
    itemId: parseInt(itemId),
    itemName: item.name,
    quantity: parseInt(quantity),
    totalPrice: item.price * quantity,
    customerName,
    customerEmail: customerEmail || 'no-email@example.com',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  res.status(201).json(order);
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

// Update order status
app.put('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });

  if (req.body.status) {
    order.status = req.body.status;
  }

  res.json(order);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
