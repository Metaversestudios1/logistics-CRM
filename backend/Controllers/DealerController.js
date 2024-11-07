const Dealer = require('../Models/Dealer');

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
    console.log(id)
    const result = await Dealer.findById(id);
    console.log(result)
    if (!result) return res.status(404).json({ success: false, message: "Dealer not found" });
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching dealer", error });
  }
};

// Get all dealers
const getAllDealers = async (req, res) => {
  const pageSize = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const search = req.query.search;

  const query = {
    deletedAt: null,
  };
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const result = await Dealer.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  const count = await Dealer.find(query).countDocuments();
  res.status(200).json({ success: true, result, count });
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
