# ShopEase - Student Implementation Guide

A mini e-commerce project for learning full-stack development with Node.js, Express, and MongoDB.

**Live Demo:** https://shop-ease-mit.vercel.app/

---

## Features to Implement

### Authentication Features

- [ ] User registration with name, email, mobile, and password
- [ ] Login with email or mobile number
- [ ] Password hashing using bcryptjs
- [ ] JWT token-based authentication
- [ ] Forgot password / Reset password functionality
- [ ] Protected routes using auth middleware

### Product Features

- [ ] Create new products with details (name, description, price, images, etc.)
- [ ] Get all products with pagination
- [ ] Get single product by ID
- [ ] Update product details
- [ ] Delete products
- [ ] Search/filter products by name, description, category, brand, tags
- [ ] Sort products by price, rating, date
- [ ] Product categories and brands
- [ ] Discount pricing support
- [ ] Product stock management
- [ ] Featured products flag
- [ ] Product ratings and reviews count

### Cart Features

- [ ] Add products to cart
- [ ] View cart with all items
- [ ] Update item quantity in cart
- [ ] Remove specific item from cart
- [ ] Clear entire cart
- [ ] Calculate subtotal, delivery charges, and total
- [ ] Cart persists per user (stored in database)

### Frontend Features

- [ ] Home page with product listing
- [ ] Product detail page
- [ ] Login page
- [ ] Signup page
- [ ] Forgot password page
- [ ] Shopping cart page
- [ ] Admin panel for product management
- [ ] Responsive design

---

## Tasks for Students

### Phase 1: Project Setup

1. Initialize Node.js project with `npm init`
2. Install dependencies: express, mongoose, cors, dotenv, bcryptjs, jsonwebtoken
3. Create folder structure:
   ```
   /src
     /config
     /controllers
     /middleware
     /models
     /routes
   /public
     /css
     /js
   ```
4. Set up Express server in `src/app.js`
5. Create MongoDB connection in `src/config/db.js`
6. Create `.env` file for environment variables

### Phase 2: User Authentication

1. Create User model with schema validation
2. Implement password hashing pre-save hook
3. Create auth controller with:
   - Signup function
   - Login function
   - Forgot password function
4. Create auth routes
5. Create JWT token generation
6. Create auth middleware for protected routes

### Phase 3: Product Management

1. Create Product model with all fields
2. Create product controller with:
   - Get all products (with filtering, sorting, pagination)
   - Get single product
   - Create product
   - Update product
   - Delete product
3. Create product routes
4. Add text search indexes for filtering

### Phase 4: Shopping Cart

1. Create Cart model
2. Create cart controller with:
   - Get cart
   - Add to cart
   - Update cart item
   - Remove from cart
   - Clear cart
3. Create cart routes (all protected)
4. Implement cart calculations (subtotal, delivery, total)

### Phase 5: Frontend Development

1. Create HTML pages:
   - index.html (home/products)
   - login.html
   - signup.html
   - forgot-password.html
   - cart.html
   - product.html (detail page)
   - admin.html
2. Style with CSS
3. Create API service in JavaScript
4. Implement localStorage for token storage
5. Handle authentication state

### Phase 6: Deployment

1. Create Vercel account
2. Add `vercel.json` configuration
3. Push code to GitHub
4. Deploy to Vercel
5. Add environment variables in Vercel dashboard

---

## API Endpoints to Build

### Authentication (3 endpoints)

| Method | Endpoint                  | Description          | Auth |
|--------|---------------------------|----------------------|------|
| POST   | /api/auth/signup          | Register new user    | No   |
| POST   | /api/auth/login           | Login user           | No   |
| POST   | /api/auth/forgot-password | Reset password       | No   |

### Products (5 endpoints)

| Method | Endpoint          | Description              | Auth |
|--------|-------------------|--------------------------|------|
| GET    | /api/products     | Get all products         | No   |
| GET    | /api/products/:id | Get single product       | No   |
| POST   | /api/products     | Create product           | No   |
| PUT    | /api/products/:id | Update product           | No   |
| DELETE | /api/products/:id | Delete product           | No   |

### Cart (5 endpoints)

| Method | Endpoint              | Description           | Auth |
|--------|-----------------------|-----------------------|------|
| GET    | /api/cart             | Get user's cart       | Yes  |
| POST   | /api/cart             | Add item to cart      | Yes  |
| PUT    | /api/cart/:productId  | Update item quantity  | Yes  |
| DELETE | /api/cart/:productId  | Remove item from cart | Yes  |
| DELETE | /api/cart             | Clear cart            | Yes  |

---

## Data Models to Create

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  mobile: String (required, unique, 10 digits),
  password: String (required, min 6 chars)
}
```

### Product Model

```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  discountPrice: Number,
  imageUrl: String (required),
  images: [String],
  category: String (required),
  brand: String,
  rating: Number (0-5),
  numReviews: Number,
  stock: Number (required),
  deliveryCharges: Number,
  freeDelivery: Boolean,
  deliveryDays: Number,
  isActive: Boolean,
  isFeatured: Boolean,
  tags: [String],
  sku: String (unique),
  color: String,
  size: String,
  seller: String
}
```

### Cart Model

```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number
  }]
}
```

---