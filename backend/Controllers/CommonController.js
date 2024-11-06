const Category = require("../Models/Category");

const getAllCategoryWithoutPagination = async (req, res) => {
  const result = await Category.find({ deletedAt: null });
  res.status(200).json({ success: true, result });
};
module.exports = {
  getAllCategoryWithoutPagination,
};
