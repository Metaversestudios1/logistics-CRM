const OrderHistory = require('../models/OrderHistory');

// Create a new order history entry
const createOrderHistory = async (req, res) => {
  try {
    const orderHistory = new OrderHistory(req.body);
    await orderHistory.save();
    res.status(201).json({ success: true, message: "Order history created", orderHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating order history", error });
  }
};

// Update an order history entry
const updateOrderHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const orderHistory = await OrderHistory.findByIdAndUpdate(id, req.body, { new: true });
    if (!orderHistory) return res.status(404).json({ success: false, message: "Order history not found" });
    res.status(200).json({ success: true, message: "Order history updated", orderHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating order history", error });
  }
};

// Get a single order history entry
const getOrderHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const orderHistory = await OrderHistory.findById(id).populate('locationUpdates').populate('activityLogs').populate('employee', 'name role');
    if (!orderHistory) return res.status(404).json({ success: false, message: "Order history not found" });
    res.status(200).json({ success: true, orderHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching order history", error });
  }
};

// Get all order history entries
const getAllOrderHistories = async (req, res) => {
  try {
    const orderHistories = await OrderHistory.find({}).populate('locationUpdates').populate('activityLogs').populate('employee', 'name role');
    res.status(200).json({ success: true, orderHistories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching order histories", error });
  }
};

// Delete an order history entry
const deleteOrderHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrderHistory = await OrderHistory.findByIdAndDelete(id);
    if (!deletedOrderHistory) return res.status(404).json({ success: false, message: "Order history not found" });
    res.status(200).json({ success: true, message: "Order history deleted", deletedOrderHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting order history", error });
  }
};

module.exports = {
  createOrderHistory,
  updateOrderHistory,
  getOrderHistory,
  getAllOrderHistories,
  deleteOrderHistory,
};
