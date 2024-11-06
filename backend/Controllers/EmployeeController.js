const Employee = require("../Models/Employee");
const bcrypt = require("bcryptjs");
require("dotenv").config();


const insertEmployee = async (req, res) => {
  const { password, ...data } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const newEmployee = new Employee({ ...data, password: hashedpassword });
    await newEmployee.save();

    res
      .status(201)
      .json({ success: true, message: "Employee inserted successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error in inserting employee",
      error: err.message,
    });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { id, data } = req.body;
    console.log(id, data);
    const result = await Employee.updateOne({ _id: id }, { $set: data });
    if (!result) {
      return res
        .status(401)
        .json({ success: false, message: "Employee not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Employee updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Employee.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "error fetching employee" });
  }
};
const getAllEmployees = async (req, res) => {
  const pageSize = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const search = req.query.search;

  const query = {
    deletedAt: null,
  };
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const result = await Employee.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const count = await Employee.find(query).countDocuments();
  res.status(200).json({ success: true, result, count });
};
const getSingleEmployee = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const result = await Employee.findOne({ _id: id });

    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "Employee not found" });
    }

    return res.status(201).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const employeeLogin = async()=>{
  
}
const employeeLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Successfully logged out" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server error: " + err.message });
  }
};

module.exports = {
  insertEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  employeeLogin,
  employeeLogout,
  getSingleEmployee,
};
