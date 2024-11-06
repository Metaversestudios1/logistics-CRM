const EmployeeActivityLog = require('../models/EmployeeActivityLog');

// Create a new employee activity log
const createActivityLog = async (req, res) => {
  try {
    const activityLog = new EmployeeActivityLog(req.body);
    await activityLog.save();
    res.status(201).json({ success: true, message: "Activity log created", activityLog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating activity log", error });
  }
};

// Update an employee activity log
const updateActivityLog = async (req, res) => {
  try {
    const { id } = req.params;
    const activityLog = await EmployeeActivityLog.findByIdAndUpdate(id, req.body, { new: true });
    if (!activityLog) return res.status(404).json({ success: false, message: "Activity log not found" });
    res.status(200).json({ success: true, message: "Activity log updated", activityLog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating activity log", error });
  }
};

// Get a single employee activity log
const getActivityLog = async (req, res) => {
  try {
    const { id } = req.params;
    const activityLog = await EmployeeActivityLog.findById(id);
    if (!activityLog) return res.status(404).json({ success: false, message: "Activity log not found" });
    res.status(200).json({ success: true, activityLog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching activity log", error });
  }
};

// Get all employee activity logs
const getAllActivityLogs = async (req, res) => {
  try {
    const activityLogs = await EmployeeActivityLog.find({});
    res.status(200).json({ success: true, activityLogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching activity logs", error });
  }
};

// Delete an employee activity log
const deleteActivityLog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedActivityLog = await EmployeeActivityLog.findByIdAndDelete(id);
    if (!deletedActivityLog) return res.status(404).json({ success: false, message: "Activity log not found" });
    res.status(200).json({ success: true, message: "Activity log deleted", deletedActivityLog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting activity log", error });
  }
};

module.exports = {
  createActivityLog,
  updateActivityLog,
  getActivityLog,
  getAllActivityLogs,
  deleteActivityLog,
};
