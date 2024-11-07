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
      .json({ success: true});
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
    const result = await Product.findById(id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, result });
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
    
    const result = await Product.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "error fetching product" });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
};
