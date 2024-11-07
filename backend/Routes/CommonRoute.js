const express = require("express");

const { getAllCategoryWithoutPagination, getAllEmployeesWithoutPagination, getAllProductsWithoutPagination } = require("../Controllers/CommonController");
const router = express.Router();

router.get("/getAllCategoryWithoutPagination", getAllCategoryWithoutPagination);
router.get("/getAllEmployeesWithoutPagination", getAllEmployeesWithoutPagination);
router.get("/getAllProductsWithoutPagination", getAllProductsWithoutPagination);
module.exports = router;
