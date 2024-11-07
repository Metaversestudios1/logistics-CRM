const express = require("express");
const router = express.Router();
const {
  createWarehouse,
  updateWarehouse,
  getWarehouse,
  getAllWarehouses,
  deleteWarehouse,
} = require("../Controllers/WarehouseController");

router.post("/createWarehouse", createWarehouse);
router.put("/updateWarehouse/:id", updateWarehouse);
router.get("/getWarehouse/:id", getWarehouse);
router.get("/getAllWarehouses", getAllWarehouses);
router.delete("/deleteWarehouse/:id", deleteWarehouse);

module.exports = router;
