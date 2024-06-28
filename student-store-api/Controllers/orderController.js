
//Define methods for creating, fetching, updating, and deleting orders.
const orderModel = require('../models/orderModel');

// Get all products
const getAllOrders = async (req, res) => {
   
  try {
    const orders = await orderModel.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const product = await orderModel.getOrderById(req.params.id);
    if (order) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Whoops! Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create order
const createOrder = async (req, res) => {

  try {
    console.log(req.body);
    const order = await orderModel.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await orderModel.deleteOrder(req.params.id);
    if (deletedOrder) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await orderModel.updateProduct(req.params.id, req.body);
    if (updateProduct) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Calculate total price
const calculateTotalPrice = async (req, res) => {
  try {
    const totalPrice = await orderModel.calculateTotalPrice(req.params.order_id);
    res.status(200).json({ totalPrice });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  updateOrder,
  calculateTotalPrice,
};

