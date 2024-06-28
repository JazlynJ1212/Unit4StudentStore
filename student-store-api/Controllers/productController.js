const productModel = require('../models/productModel');

// Get all products
const getAllProducts = async (req, res) => {
    const {category, sort}= req.query;
    let filter = {}; //filter products 
    let orderBy = {}; //order products 

    if (category) {
        filter.category = category;
    }

    if (sort) {
        //sort by price
        if (sort === "price") {
            orderBy = { price: sort === "desc" ? "desc" : "asc" };
        //sort by name 
        } else {
            orderBy = { name: sort === "desc" ? "desc" : "asc" };
        }
    }



  try {
    const products = await productModel.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Whoops! Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const product = await productModel.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productModel.deleteProduct(req.params.id);
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productModel.updateProduct(req.params.id, req.body);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct
};
