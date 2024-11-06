const Product = require("../Models/Product");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res
      .status(201)
      .json({ success: true, message: "Product created", product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating product", error });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  console.log(req.params,req.body)
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res
      .status(200)
      .json({ success: true, message: "Product updated", updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating product", error });
  }
};

// Get a single product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching product", error });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  const pageSize = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const search = req.query.search;

  const query = {
    deletedAt: null,
  };
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const result = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const count = await Product.find(query).countDocuments();
  res.status(200).json({ success: true, result, count });
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res
      .status(200)
      .json({ success: true, message: "Product deleted", deletedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting product", error });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
};
