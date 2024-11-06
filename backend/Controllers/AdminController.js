const bcrypt = require("bcryptjs");
const Admin = require("../Models/Admin");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const insertadmin = async (req, res) => {
  const { password, ...data } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newadmin = new Admin({
      ...data,
      password: hashedpassword,
    });

    await newadmin.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "error in inserting admin",
      error: err.message,
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body; // Include role in the destructuring
  try {
    // Check if all fields are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    // Find the admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Password does not match" });
    }
    // Generate a JWT token
    const token = jwt.sign(
      { id: admin._id }, // Include role in the token payload if needed
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 2592000000), // 30 days
      httpOnly: true,
      sameSite: "None",
    };

    // Send response with token and admin details
    res.cookie("token", token, options).json({
      success: true,
      token,
      admin,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error: " + err.message });
  }
};

const logout = async (req, res) => {
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
  insertadmin,
  login,
  logout,
};
