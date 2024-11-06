const Dealer = require('../models/Dealer');

// Create a new dealer
const createDealer = async (req, res) => {
  try {
    const dealer = new Dealer(req.body);
    await dealer.save();
    res.status(201).json({ success: true, message: "Dealer created", dealer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating dealer", error });
  }
};

// Update a dealer
const updateDealer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDealer = await Dealer.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDealer) return res.status(404).json({ success: false, message: "Dealer not found" });
    res.status(200).json({ success: true, message: "Dealer updated", updatedDealer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating dealer", error });
  }
};

// Get a single dealer
const getDealer = async (req, res) => {
  try {
    const { id } = req.params;
    const dealer = await Dealer.findById(id);
    if (!dealer) return res.status(404).json({ success: false, message: "Dealer not found" });
    res.status(200).json({ success: true, dealer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching dealer", error });
  }
};

// Get all dealers
const getAllDealers = async (req, res) => {
  try {
    const dealers = await Dealer.find({});
    res.status(200).json({ success: true, dealers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching dealers", error });
  }
};

// Delete a dealer
const deleteDealer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDealer = await Dealer.findByIdAndDelete(id);
    if (!deletedDealer) return res.status(404).json({ success: false, message: "Dealer not found" });
    res.status(200).json({ success: true, message: "Dealer deleted", deletedDealer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting dealer", error });
  }
};

module.exports = {
  createDealer,
  updateDealer,
  getDealer,
  getAllDealers,
  deleteDealer,
};
