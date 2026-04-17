const NotificationStudent = require("../models/NotificationStudent");

// @desc    Get all notifications for the logged-in student
// @route   GET /api/notifications/student
exports.getStudentNotifications = async (req, res) => {
  try {
    const notifications = await NotificationStudent.find({ 
      recipient: req.user._id,
      isRead: false 
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
};

// @desc    Mark a specific notification as read (Dismiss)
// @route   PUT /api/notifications/student/:id/read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await NotificationStudent.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.status(200).json({ message: "Notification dismissed" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification" });
  }
};