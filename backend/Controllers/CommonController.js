const Category = require("../Models/Category");
const Employee = require("../Models/Employee");
const Product = require("../Models/Product");

const getAllCategoryWithoutPagination = async (req, res) => {
  const result = await Category.find({ deletedAt: null });
  res.status(200).json({ success: true, result });
};
const getAllEmployeesWithoutPagination = async (req, res) => {
  const result = await Employee.find({ deletedAt: null });
  res.status(200).json({ success: true, result });
};
const getAllProductsWithoutPagination = async (req, res) => {
  const result = await Product.find({ deletedAt: null });
  res.status(200).json({ success: true, result });
};
module.exports = {
  getAllCategoryWithoutPagination,
  getAllEmployeesWithoutPagination,
  getAllProductsWithoutPagination
};
