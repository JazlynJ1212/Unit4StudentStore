const orderItemsModel = require('../models/orderItemModel');

// Get all order items
const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await orderItemsModel.getAllOrderItems();
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get order item by ID
const getOrderItemById = async (req, res) => {
  try {
    const orderItem = await orderItemsModel.getOrderItemById(req.params.id);
    if (orderItem) {
      res.status(200).json(orderItem);
    } else {
      res.status(404).json({ error: "Order Item not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create order item
const createOrderItem = async (req, res) => {
  try {
    const orderItem = await orderItemsModel.createOrderItem(req.body);
    res.status(201).json(orderItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete order item
const deleteOrderItem = async (req, res) => {
  try {
    const deletedOrderItem = await orderItemsModel.deleteOrderItem(req.params.id);
    if (deletedOrderItem) {
      res.status(200).json(deletedOrderItem);
    } else {
      res.status(404).json({ error: "Order Item not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update order item
const updateOrderItem = async (req, res) => {
  try {
    const updatedOrderItem = await orderItemsModel.updateOrderItem(req.params.id, req.body);
    if (updatedOrderItem) {
      res.status(200).json(updatedOrderItem);
    } else {
      res.status(404).json({ error: "Order Item not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add items to an existing order
const addItemsToOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const items = req.body.items; // expecting an array of items
    const addedItems = await orderItemsModel.addItemsToOrder(req.params.order_id, req.body);//was items
    res.status(201).json(addedItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  deleteOrderItem,
  updateOrderItem,
  addItemsToOrder,
};
