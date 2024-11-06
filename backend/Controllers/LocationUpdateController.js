const LocationUpdate = require('../models/LocationUpdate');

// Create a new location update
const createLocationUpdate = async (req, res) => {
  try {
    const locationUpdate = new LocationUpdate(req.body);
    await locationUpdate.save();
    res.status(201).json({ success: true, message: "Location update created", locationUpdate });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating location update", error });
  }
};

// Update a location update
const updateLocationUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const locationUpdate = await LocationUpdate.findByIdAndUpdate(id, req.body, { new: true });
    if (!locationUpdate) return res.status(404).json({ success: false, message: "Location update not found" });
    res.status(200).json({ success: true, message: "Location update updated", locationUpdate });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating location update", error });
  }
};

// Get a single location update
const getLocationUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const locationUpdate = await LocationUpdate.findById(id);
    if (!locationUpdate) return res.status(404).json({ success: false, message: "Location update not found" });
    res.status(200).json({ success: true, locationUpdate });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching location update", error });
  }
};

// Get all location updates
const getAllLocationUpdates = async (req, res) => {
  try {
    const locationUpdates = await LocationUpdate.find({});
    res.status(200).json({ success: true, locationUpdates });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching location updates", error });
  }
};

// Delete a location update
const deleteLocationUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLocationUpdate = await LocationUpdate.findByIdAndDelete(id);
    if (!deletedLocationUpdate) return res.status(404).json({ success: false, message: "Location update not found" });
    res.status(200).json({ success: true, message: "Location update deleted", deletedLocationUpdate });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting location update", error });
  }
};

module.exports = {
  createLocationUpdate,
  updateLocationUpdate,
  getLocationUpdate,
  getAllLocationUpdates,
  deleteLocationUpdate,
};
