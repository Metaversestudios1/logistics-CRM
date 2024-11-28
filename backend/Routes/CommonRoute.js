const express = require("express");

const {
  getAllCategoryWithoutPagination,
  getAllEmployeesWithoutPagination,
  getAllProductsWithoutPagination,
  getAllWarehouseWithoutPagination,
  getAllDealersWithoutPagination,
} = require("../Controllers/CommonController");
const router = express.Router();

router.get("/getAllCategoryWithoutPagination", getAllCategoryWithoutPagination);
router.get("/getAllEmployeesWithoutPagination",getAllEmployeesWithoutPagination);
router.get("/getAllProductsWithoutPagination", getAllProductsWithoutPagination);
router.get("/getAllWarehouseWithoutPagination",getAllWarehouseWithoutPagination);
router.get("/getAllDealersWithoutPagination", getAllDealersWithoutPagination);
module.exports = router;
