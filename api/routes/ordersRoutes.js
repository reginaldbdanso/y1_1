const express = require('express');
const router = express.Router();
const {
    getUserOrders,
    getOrderById,
    cancelOrder,
    getAllOrders,
    updateOrderStatus,
} = require('../controllers/ordersController');
const { protect } = require('../middleware/auth');
// const admin = require('../middleware/admin');

// Get user orders
router.get('/', protect, getUserOrders); // Line 14

// Get order by ID
router.get('/:id', protect, getOrderById);

// Cancel order
router.put('/:id/cancel', protect, cancelOrder);

// Get all orders (admin only)
// router.get('/admin/all', [auth, admin], orderController.getAllOrders);

// // Update order status (admin only)
// router.put('/admin/:id/status', [auth, admin], orderController.updateOrderStatus);

module.exports = router;
