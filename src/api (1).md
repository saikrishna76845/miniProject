# ShopEase - Mini E-Commerce API

A RESTful e-commerce API built with Express.js and MongoDB.

**Live URL:** https://shop-ease-mit.vercel.app/

---

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
  - [Authentication](#authentication-apis)
  - [Products](#product-apis)
  - [Cart](#cart-apis)
- [Data Models](#data-models)
- [Demo Credentials](#demo-credentials)

---

## Getting Started

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Seed Database

```bash
node seedUser.js    # Seed demo users
node seed.js        # Seed sample products
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
PORT=3000
```

---

## API Reference

**Base URL:** `https://shop-ease-mit.vercel.app/api`

---

## Authentication APIs

### 1. Sign Up

Create a new user account.

**Endpoint:** `POST /api/auth/signup`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "password": "password123"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Error Responses:**

- `400` - Email already registered / Mobile number already registered / Validation error

---

### 2. Login

Authenticate user with email or mobile.

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```json
{
  "emailOrMobile": "john@example.com",
  "password": "password123"
}
```

Or with mobile:

```json
{
  "emailOrMobile": "1234567890",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Error Responses:**

- `400` - Please provide email/mobile and password
- `401` - Invalid credentials

---

### 3. Forgot Password

Reset password using email.

**Endpoint:** `POST /api/auth/forgot-password`

**Request Body:**

```json
{
  "email": "john@example.com",
  "newPassword": "newpassword123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password reset successful"
}
```

**Error Responses:**

- `400` - Please provide email and new password
- `404` - No user found with this email

---

## Product APIs

### 1. Get All Products

Retrieve products with filtering, sorting, and pagination.

**Endpoint:** `GET /api/products`

**Query Parameters:**

| Parameter | Type   | Description                                      | Example        |
|-----------|--------|--------------------------------------------------|----------------|
| filter    | string | Search in name, description, category, brand, tags | `filter=pen`   |
| sortBy    | string | Field to sort by                                 | `sortBy=price` |
| order     | string | Sort order: `asc` or `desc`                      | `order=asc`    |
| page      | number | Page number (default: 1)                         | `page=1`       |
| limit     | number | Items per page (default: 10)                     | `limit=10`     |

**Example Requests:**

```
GET /api/products
GET /api/products?filter=electronics
GET /api/products?sortBy=price&order=asc
GET /api/products?sortBy=rating&order=desc
GET /api/products?page=2&limit=20
GET /api/products?filter=pen&sortBy=price&order=asc&page=1&limit=10
```

**Response (200):**

```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "name": "Wireless Headphones",
      "description": "High quality wireless headphones",
      "price": 99.99,
      "discountPrice": 79.99,
      "imageUrl": "https://example.com/image.jpg",
      "images": [],
      "category": "Electronics",
      "brand": "Sony",
      "rating": 4.5,
      "numReviews": 120,
      "stock": 50,
      "deliveryCharges": 5,
      "freeDelivery": false,
      "deliveryDays": 3,
      "isActive": true,
      "isFeatured": true,
      "tags": ["wireless", "audio"],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Product

Retrieve a product by ID.

**Endpoint:** `GET /api/products/:id`

**Example:**

```
GET /api/products/64f1a2b3c4d5e6f7g8h9i0j1
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Wireless Headphones",
    "description": "High quality wireless headphones",
    "price": 99.99,
    "discountPrice": 79.99,
    "imageUrl": "https://example.com/image.jpg",
    "images": [],
    "category": "Electronics",
    "brand": "Sony",
    "rating": 4.5,
    "numReviews": 120,
    "stock": 50,
    "deliveryCharges": 5,
    "freeDelivery": false,
    "deliveryDays": 3,
    "isActive": true,
    "isFeatured": true,
    "tags": ["wireless", "audio"],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

- `404` - Product not found

---

### 3. Create Product

Add a new product.

**Endpoint:** `POST /api/products`

**Request Body:**

```json
{
  "name": "Wireless Headphones",
  "description": "High quality wireless headphones with noise cancellation",
  "price": 99.99,
  "discountPrice": 79.99,
  "imageUrl": "https://example.com/image.jpg",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "category": "Electronics",
  "brand": "Sony",
  "rating": 4.5,
  "numReviews": 0,
  "stock": 100,
  "deliveryCharges": 5,
  "freeDelivery": false,
  "deliveryDays": 3,
  "isActive": true,
  "isFeatured": false,
  "tags": ["wireless", "audio", "headphones"],
  "sku": "WH-001",
  "weight": 250,
  "dimensions": {
    "length": 20,
    "width": 15,
    "height": 8
  },
  "color": "Black",
  "size": "One Size",
  "seller": "Tech Store"
}
```

**Required Fields:** `name`, `description`, `price`, `imageUrl`, `category`, `stock`

**Response (201):**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Wireless Headphones",
    ...
  }
}
```

**Error Responses:**

- `400` - Validation error / Duplicate field value

---

### 4. Update Product

Update an existing product.

**Endpoint:** `PUT /api/products/:id`

**Example:**

```
PUT /api/products/64f1a2b3c4d5e6f7g8h9i0j1
```

**Request Body:**

```json
{
  "price": 89.99,
  "stock": 75,
  "discountPrice": 69.99
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Wireless Headphones",
    "price": 89.99,
    "stock": 75,
    "discountPrice": 69.99,
    ...
  }
}
```

**Error Responses:**

- `400` - Validation error
- `404` - Product not found

---

### 5. Delete Product

Remove a product.

**Endpoint:** `DELETE /api/products/:id`

**Example:**

```
DELETE /api/products/64f1a2b3c4d5e6f7g8h9i0j1
```

**Response (200):**

```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {}
}
```

**Error Responses:**

- `404` - Product not found

---

## Cart APIs

All cart endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

---

### 1. Get Cart

Retrieve the current user's cart.

**Endpoint:** `GET /api/cart`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "product": {
          "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
          "name": "Wireless Headphones",
          "price": 99.99,
          "discountPrice": 79.99,
          "imageUrl": "https://example.com/image.jpg",
          "freeDelivery": false,
          "deliveryCharges": 5
        },
        "quantity": 2
      }
    ],
    "subtotal": 159.98,
    "deliveryCharges": 5,
    "total": 164.98,
    "itemCount": 2
  }
}
```

**Error Responses:**

- `401` - Not authorized, no token

---

### 2. Add to Cart

Add a product to cart.

**Endpoint:** `POST /api/cart`

**Request Body:**

```json
{
  "productId": "64f1a2b3c4d5e6f7g8h9i0j1",
  "quantity": 1
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "items": [
      {
        "product": "64f1a2b3c4d5e6f7g8h9i0j1",
        "quantity": 1
      }
    ]
  }
}
```

**Error Responses:**

- `401` - Not authorized, no token
- `404` - Product not found
- `400` - Insufficient stock

---

### 3. Update Cart Item

Update quantity of a cart item.

**Endpoint:** `PUT /api/cart/:productId`

**Example:**

```
PUT /api/cart/64f1a2b3c4d5e6f7g8h9i0j1
```

**Request Body:**

```json
{
  "quantity": 3
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Cart updated",
  "data": {
    "items": [...],
    ...
  }
}
```

**Error Responses:**

- `401` - Not authorized, no token
- `400` - Quantity must be at least 1
- `404` - Cart not found / Item not found in cart

---

### 4. Remove from Cart

Remove a specific item from cart.

**Endpoint:** `DELETE /api/cart/:productId`

**Example:**

```
DELETE /api/cart/64f1a2b3c4d5e6f7g8h9i0j1
```

**Response (200):**

```json
{
  "success": true,
  "message": "Item removed from cart",
  "data": {
    "items": [...],
    ...
  }
}
```

**Error Responses:**

- `401` - Not authorized, no token
- `404` - Cart not found

---

### 5. Clear Cart

Remove all items from cart.

**Endpoint:** `DELETE /api/cart`

**Response (200):**

```json
{
  "success": true,
  "message": "Cart cleared",
  "data": {
    "items": []
  }
}
```

**Error Responses:**

- `401` - Not authorized, no token

---

## Data Models

### User Schema

| Field    | Type   | Required | Description                    |
|----------|--------|----------|--------------------------------|
| name     | String | Yes      | User's full name               |
| email    | String | Yes      | Unique email address           |
| mobile   | String | Yes      | 10-digit mobile number         |
| password | String | Yes      | Min 6 characters (hashed)      |

### Product Schema

| Field           | Type     | Required | Default | Description                    |
|-----------------|----------|----------|---------|--------------------------------|
| name            | String   | Yes      | -       | Product name                   |
| description     | String   | Yes      | -       | Product description            |
| price           | Number   | Yes      | -       | Product price                  |
| discountPrice   | Number   | No       | null    | Discounted price               |
| imageUrl        | String   | Yes      | -       | Main product image URL         |
| images          | [String] | No       | []      | Additional image URLs          |
| category        | String   | Yes      | -       | Product category               |
| brand           | String   | No       | -       | Brand name                     |
| rating          | Number   | No       | 0       | Average rating (0-5)           |
| numReviews      | Number   | No       | 0       | Number of reviews              |
| stock           | Number   | Yes      | 0       | Available stock quantity       |
| deliveryCharges | Number   | No       | 0       | Delivery charges               |
| freeDelivery    | Boolean  | No       | false   | Free delivery flag             |
| deliveryDays    | Number   | No       | 5       | Estimated delivery days        |
| isActive        | Boolean  | No       | true    | Product active status          |
| isFeatured      | Boolean  | No       | false   | Featured product flag          |
| tags            | [String] | No       | []      | Product tags                   |
| sku             | String   | No       | -       | Stock keeping unit (unique)    |
| weight          | Number   | No       | -       | Product weight                 |
| dimensions      | Object   | No       | -       | length, width, height          |
| color           | String   | No       | -       | Product color                  |
| size            | String   | No       | -       | Product size                   |
| seller          | String   | No       | -       | Seller name                    |

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes

| Code | Description           |
|------|-----------------------|
| 200  | Success               |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

## Demo Credentials

### Admin User
- **Email:** admin@example.com
- **Password:** password123

### Regular User
- **Email:** user@example.com
- **Password:** password123

### Demo User
- **Email:** demo@gmail.com
- **Password:** demo@123

---

## Technologies Used

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Deployment:** Vercel

---

## License

ISC
