const express = require("express");
const router = express.Router();
const {
  createDealer,
  updateDealer,
  getDealer,
  getAllDealers,
  deleteDealer,
} = require("../Controllers/DealerController");
router.post("/createDealer", createDealer);
router.put("/updateDealer/:id", updateDealer);
router.get("/getDealer/:id", getDealer);
router.get("/getAllDealers", getAllDealers);
router.delete("/deleteDealer/:id", deleteDealer);

module.exports = router;
