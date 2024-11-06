const express = require("express");
const {
  insertCategory,
  getSingleCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/CategoryController");
const router = express.Router();

router.post("/insertCategory", insertCategory);
router.put("/updateCategory/:id", updateCategory);
router.get("/getAllCategory", getAllCategory);
router.get("/getSingleCategory/:id", getSingleCategory);
router.delete("/deleteCategory/:id", deleteCategory);

module.exports = router;
