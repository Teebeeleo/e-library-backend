const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcrypt");
const User    = require("../models/User");

// GET /users — all students (admin only)
router.get("/", async (req, res) => {
  try {
    const students = await User.find({ role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// PUT /users/:id — update profile (name, email, level)
router.put("/:id", async (req, res) => {
  const { name, email, level } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, level },
      { new: true }
    ).select("-password");
    if (!user) return res.json({ error: "User not found." });
    res.json({
      id:    user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
      level: user.level,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// POST /users/:id/change-password
router.post("/:id/change-password", async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.json({ error: "User not found." });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.json({ error: "Current password is incorrect." });

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.params.id, { password: hashed });
    res.json({ success: true });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
