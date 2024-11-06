const express = require('express');
const router = express.Router();
const {
    createProduct,
    updateProduct,
    getProduct,
    getAllProducts,
    deleteProduct,
} = require('../Controllers/ProductController');

// Create a new product
router.post('/insertProduct', createProduct);

// Update a product
router.put('/updateProduct/:id', updateProduct);

// Get a single product
router.get('/getProduct/:id', getProduct);

// Get all products
router.get('/getAllProducts', getAllProducts);

// Delete a product
router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;
