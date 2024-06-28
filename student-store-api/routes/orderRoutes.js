const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');
const orderItemController = require('../controllers/orderItemController');

// Route to get all orders
router.get('/', orderController.getAllOrders);

// Route to get order by ID
router.get('/:id', orderController.getOrderById);

// Route to create an order
router.post('/', orderController.createOrder);

// Route to update an order
router.put('/:id', orderController.updateOrder);

// Route to delete an order
router.delete('/:id', orderController.deleteOrder);

// Route to calculate order total
router.get('/:id/total', orderController.calculateTotalPrice);

// Route to add items to an existing order
//router.post('/:id/items', orderItemController.addItemsToOrder);

module.exports = router;
