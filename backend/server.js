const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let items = [
  { id: 1, name: 'Dragon Keychain', description: 'Cute mini dragon keychain', price: 8.99, image: '🐉', category: 'keychain' },
  { id: 2, name: 'Star Keychain', description: 'Shiny star-shaped keychain', price: 7.99, image: '⭐', category: 'keychain' },
  { id: 3, name: 'Heart Keychain', description: 'Love heart keychain', price: 7.99, image: '❤️', category: 'keychain' },
  { id: 4, name: 'Skull Keychain', description: 'Cool skull keychain', price: 8.99, image: '💀', category: 'keychain' },
  { id: 5, name: 'Cube Keychain', description: 'Geometric cube keychain', price: 9.99, image: '🎲', category: 'keychain' },
  { id: 6, name: 'Moon Keychain', description: 'Crescent moon keychain', price: 8.49, image: '🌙', category: 'keychain' },
  { id: 7, name: 'Flower Keychain', description: 'Pretty flower keychain', price: 7.49, image: '🌸', category: 'keychain' },
  { id: 8, name: 'Lightning Keychain', description: 'Electric lightning bolt keychain', price: 8.99, image: '⚡', category: 'keychain' }
];

let orders = [];
let itemIdCounter = 9;
let orderIdCounter = 1;

// Routes

// Get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Get items by category
app.get('/api/items/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredItems = items.filter(i => i.category === category);
  res.json(filteredItems);
});

// Get single item
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

// Add new item
app.post('/api/items', (req, res) => {
  const { name, description, price, image, category } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price required' });
  }

  const newItem = {
    id: itemIdCounter++,
    name,
    description: description || '',
    price,
    image: image || '📦',
    category: category || 'other'
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Create order from cart
app.post('/api/orders', (req, res) => {
  const { cartItems, customerName, customerEmail } = req.body;

  if (!cartItems || cartItems.length === 0 || !customerName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  let totalPrice = 0;
  const orderItems = [];

  // Validate all items exist and calculate total
  for (let cartItem of cartItems) {
    const item = items.find(i => i.id === cartItem.id);
    if (!item) {
      return res.status(404).json({ message: `Item ${cartItem.id} not found` });
    }
    totalPrice += item.price * cartItem.quantity;
    orderItems.push({
      itemId: item.id,
      itemName: item.name,
      quantity: cartItem.quantity,
      price: item.price
    });
  }

  const order = {
    id: orderIdCounter++,
    items: orderItems,
    totalPrice,
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
