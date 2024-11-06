const express = require('express');
const router = express.Router();
const {
  createWarehouse,
  updateWarehouse,
  getWarehouse,
  getAllWarehouses,
  deleteWarehouse,
} = require('../Controllers/WarehouseController');

// Create a new warehouse
router.post('/', createWarehouse);

// Update a warehouse
router.put('/:id', updateWarehouse);

// Get a single warehouse
router.get('/:id', getWarehouse);

// Get all warehouses
router.get('/', getAllWarehouses);

// Delete a warehouse
router.delete('/:id', deleteWarehouse);

module.exports = router;
