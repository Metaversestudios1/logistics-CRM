const express = require('express');
const router = express.Router();
const {
    assignProductsToEmployee,
} = require('../Controllers/OrderController');

// Create a new order history entry
router.post('/assignProductToEmployee', assignProductsToEmployee);


module.exports = router;
