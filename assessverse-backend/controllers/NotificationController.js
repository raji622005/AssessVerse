const Notification = require("../models/Notification");
const Assessment = require("../models/Assessment"); // Assuming you have this
const Notificationi = require("../models/Notificationi");
// 1. Get notifications for the logged-in Instructor
// Get all notifications
exports.getInstructorNotifications = async (req, res) => {
  try {
    // Check if req.user exists (provided by protect middleware)
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const notifications = await Notificationi.find({ 
      recipient: req.user._id, 
      isRead: false 
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    // This will print the actual error to your terminal so you can see why it's 500
    console.error("DETAILED ERROR:", error.message); 
    res.status(500).json({ message: "Server Error", details: error.message });
  }
};


// 2. Mark a notification as read (UPDATED for Instructor)
exports.markAsRead = async (req, res) => {
  try {
    // Changed to use InstructorNotification model
    const notification = await Notificationi.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error: error.message });
  }
};

// --- LEAVING THESE AS THEY WERE FOR ADMIN ---

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete notification (Mark as Read)
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Notification cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Assessment AND Notification
exports.deleteAssessmentAndNotify = async (req, res) => {
  try {
    const notify = await Notification.findById(req.params.id);
    if (notify.assessmentId) {
      await Assessment.findByIdAndDelete(notify.assessmentId);
    }
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Assessment and Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete notification (Mark as Read)
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Notification cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Assessment AND Notification
exports.deleteAssessmentAndNotify = async (req, res) => {
  try {
    const notify = await Notification.findById(req.params.id);
    if (notify.assessmentId) {
      await Assessment.findByIdAndDelete(notify.assessmentId);
    }
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Assessment and Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};