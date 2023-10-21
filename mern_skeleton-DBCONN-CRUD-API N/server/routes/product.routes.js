// const express = require('express');
// const productController = require('../controllers/productController');

// const router = express.Router();

// router.post('/products', productController.createProduct);
// router.get('/products', productController.getProducts);


// module.exports = router;
import express from 'express';
import productCtrl from '../controllers/product.controller.js';

const router = express.Router();


router.route('/api/products')
    .get(productCtrl.list) 
    .post(productCtrl.create)
    .delete(productCtrl.removeAll);


router.route('/api/products/:id')
    .get(productCtrl.read)
    .put(productCtrl.update)
    .delete(productCtrl.remove);


router.param('id', productCtrl.productByID);

export default router;
