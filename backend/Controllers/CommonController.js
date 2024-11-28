const Category = require("../Models/Category");
const Employee = require("../Models/Employee");
const Product = require("../Models/Product");
const Warehouse = require("../Models/Warehouse");
const Dealer = require("../Models/Dealer");

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
const getAllWarehouseWithoutPagination = async (req, res) => {
  const result = await Warehouse.find({ deletedAt: null });
  res.status(200).json({ success: true, result });
};
const getAllDealersWithoutPagination = async (req, res) => {
  const result = await Dealer.find({ deletedAt: null });
  res.status(200).json({ success: true, result });
};
module.exports = {
  getAllCategoryWithoutPagination,
  getAllEmployeesWithoutPagination,
  getAllProductsWithoutPagination,
  getAllWarehouseWithoutPagination,
  getAllDealersWithoutPagination
};
