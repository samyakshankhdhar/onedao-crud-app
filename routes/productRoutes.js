const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.post('/create-product', productController.createProduct);
router.get('/get-product', productController.getAllProducts);
router.post('/update-product/:id', productController.updateProduct);
router.delete('/delete-product/:id', productController.deleteProduct);

module.exports = router;
