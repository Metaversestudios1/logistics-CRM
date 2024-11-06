const Category = require("../Models/Category");
require("dotenv").config();

const insertCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();

    res
      .status(201)
      .json({ success: true, message: "Category inserted successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error in inserting Category",
      error: err.message,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCategory)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, message: "Category updated" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating Category", error });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Category.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "error fetching Category" });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const search = req.query.search;

    const query = {
      deletedAt: null,
    };
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const result = await Category.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    const count = await Category.find(query).countDocuments();
    res.status(200).json({ success: true, result, count });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.findById(id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, result });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching Category", error });
  }
};

module.exports = {
  insertCategory,
  getSingleCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
