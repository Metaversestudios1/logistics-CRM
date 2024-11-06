const express = require("express");

const { getAllCategoryWithoutPagination } = require("../Controllers/CommonController");
const router = express.Router();

router.get("/getAllCategoryWithoutPagination", getAllCategoryWithoutPagination);
module.exports = router;
