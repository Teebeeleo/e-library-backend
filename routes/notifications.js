const express      = require("express");
const router       = express.Router();
const Notification = require("../models/Notification");

// GET /notifications/:userId — get all notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const notifs = await Notification.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifs);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// PUT /notifications/:id/read — mark one as read
router.put("/:id/read", async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { is_read: true });
    res.json({ success: true });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
