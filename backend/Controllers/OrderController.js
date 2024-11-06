const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ success: true, message: "Order created", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating order", error });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.status(200).json({ success: true, message: "Order updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating order", error });
  }
};

// Get a single order
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('products'); // Assuming products is a reference
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching order", error });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('products'); // Assuming products is a reference
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching orders", error });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ success: false, message: "Order not found" });
    res.status(200).json({ success: true, message: "Order deleted", deletedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting order", error });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  getOrder,
  getAllOrders,
  deleteOrder,
};
