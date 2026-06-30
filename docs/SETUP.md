# 3D Print Shop - Setup Guide

## Prerequisites

- Node.js (v14+)
- npm or yarn
- Modern web browser

## Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Start the server:
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## Using Your Shop

### Add Items
1. Click "+ Add Item" button
2. Fill in:
   - Item name
   - Price
   - Description
   - Category
3. Click "Add Item"

### Place Orders
1. Click on an item
2. Enter:
   - Quantity
   - Your name
   - Email
3. Click "Place Order"
4. Order appears on dashboard

### View Dashboard
1. Click "📊 Dashboard" button
2. See:
   - Total orders
   - Pending orders
   - Total revenue
   - Detailed order list

## Features

✅ Add/remove 3D printed items
✅ Place orders with customer info
✅ Real-time order dashboard
✅ Order status tracking
✅ Revenue tracking
✅ Mobile responsive

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000   # Windows
```

### CORS Errors
- Make sure backend is running on port 5000
- Make sure frontend is on port 3000

### Data Not Persisting
- Current setup uses in-memory storage
- Data resets when server restarts
- For production, add database (MongoDB/PostgreSQL)
