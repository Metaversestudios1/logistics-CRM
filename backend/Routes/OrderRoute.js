const express = require('express');
const router = express.Router();
const {
    assignOrderToEmployee,
} = require('../Controllers/OrderController');

// Create a new order history entry
router.post('/assignOrderToEmployee', assignOrderToEmployee);

 
module.exports = router;
