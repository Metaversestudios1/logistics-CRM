const express = require("express");
const {
  insertEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getSingleEmployee,
  employeeLogin,
  employeeLogout,
} = require("../Controllers/EmployeeController");
const router = express.Router();

router.post("/insertEmployee", insertEmployee);
router.post("/getSingleEmployee", getSingleEmployee);
router.get("/getAllEmployees", getAllEmployees);
router.put("/updateEmployee", updateEmployee);
router.delete("/deleteEmployee", deleteEmployee);
router.post("/employeeLogout", employeeLogout);
router.post("/employeeLogin", employeeLogin);
module.exports = router;
