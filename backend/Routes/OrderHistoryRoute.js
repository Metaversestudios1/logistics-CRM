const express = require('express');
const router = express.Router();
const {
  createOrderHistory,
  updateOrderHistory,
  getOrderHistory,
  getAllOrderHistories,
  deleteOrderHistory,
} = require('../Controllers/OrderHistoryController');

// Create a new order history entry
router.post('/', createOrderHistory);

// Update an order history entry
router.put('/:id', updateOrderHistory);

// Get a single order history entry
router.get('/:id', getOrderHistory);

// Get all order history entries
router.get('/', getAllOrderHistories);

// Delete an order history entry
router.delete('/:id', deleteOrderHistory);

module.exports = router;
