const express = require('express');
const router = express.Router();
const {
  createDealer,
  updateDealer,
  getDealer,
  getAllDealers,
  deleteDealer,
} = require('../Controllers/DealerController');

// Create a new dealer
router.post('/', createDealer);

// Update a dealer
router.put('/:id', updateDealer);

// Get a single dealer
router.get('/:id', getDealer);

// Get all dealers
router.get('/', getAllDealers);

// Delete a dealer
router.delete('/:id', deleteDealer);

module.exports = router;
