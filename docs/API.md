# 3D Print Shop API Documentation

## Base URL
```
http://localhost:5000/api
```

## Items Endpoints

### GET /items
Get all available items

**Response:**
```json
[
  {
    "id": 1,
    "name": "Miniature Dragon",
    "price": 25.00,
    "description": "Detailed 3D printed dragon",
    "image": "dragon.jpg",
    "category": "Figurines"
  }
]
```

### POST /items
Add a new item

**Request Body:**
```json
{
  "name": "New Item",
  "price": 30.00,
  "description": "Description here",
  "image": "item.jpg",
  "category": "Office"
}
```

### GET /items/:id
Get item by ID

### PUT /items/:id
Update item

### DELETE /items/:id
Delete item

## Orders Endpoints

### GET /orders
Get all orders

### POST /orders
Create new order

**Request Body:**
```json
{
  "itemId": 1,
  "quantity": 2,
  "customerName": "John Doe",
  "customerEmail": "john@example.com"
}
```

**Response:**
```json
{
  "id": 1,
  "itemId": 1,
  "itemName": "Miniature Dragon",
  "quantity": 2,
  "totalPrice": 50.00,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "status": "pending",
  "createdAt": "2024-01-01T12:00:00Z"
}
```

### GET /orders/:id
Get order by ID

### PUT /orders/:id
Update order status

**Request Body:**
```json
{
  "status": "printing"
}
```

## Status Values
- `pending` - New order received
- `printing` - Currently printing
- `completed` - Ready for pickup

## Example Workflow

1. POST to `/items` to add items
2. GET `/items` to display items on shop
3. POST to `/orders` when customer orders
4. GET `/orders` to see all orders
5. PUT `/orders/:id` to update status
