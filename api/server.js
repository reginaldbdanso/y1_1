const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { seedAll } = require('./utils/populateProducts');
// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
// const addressRoutes = require('./routes/addressRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');


// Load environment variables
require('dotenv').config();

// Initialize Express app
const app = express();


// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/profile', userProfileRoutes);
app.use('/api/shipping', shippingRoutes);

app.use('/', (req, res) => {
  res.json({ message: "You have reached the Yannstechhub API" });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});



const PORT = process.env.PORT || 4000;

// Connect to MongoDB Atlas and start server
const startServer = async () => {
  try {
    await connectDB();
    
    // Seed data in development environment
    if (process.env.NODE_ENV === 'development') {
      try {
        await seedAll();
        console.log('Data seeding completed');
      } catch (seedError) {
        console.error('Data seeding failed:', seedError);
        // Continue server startup even if seeding fails
      }
    }

    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Register the shipping routes
app.use('/api/shipping', shippingRoutes);
