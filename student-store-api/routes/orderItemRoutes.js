const express = require('express');
const router = express.Router();
const orderItemsController = require('../controllers/orderItemController');

// Route to get all order items
router.get('/', orderItemsController.getAllOrderItems);

// Route to get order item by ID
router.get('/:id', orderItemsController.getOrderItemById);

// Route to create an order item
router.post('/', orderItemsController.createOrderItem);

// Route to update an order item
router.put('/:id', orderItemsController.updateOrderItem);

// Route to delete an order item
router.delete('/:id', orderItemsController.deleteOrderItem);

// Route to add items to an existing order
router.post('/:order_id/items', orderItemsController.addItemsToOrder);

module.exports = router;
