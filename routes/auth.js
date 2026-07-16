const express = require("express");
const router  = express.Router();
const bcrypt  = require("bcrypt");
const User    = require("../models/User");

// POST /auth/register
router.post("/register", async (req, res) => {
  const { name, email, password, level } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.json({ error: "Email already registered." });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, level, role: "user" });

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

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ error: "No account found with this email." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: "Incorrect password." });

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

// POST /auth/reset-password
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ error: "No account found with this email." });

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: hashed });

    res.json({ success: true, message: "Password updated successfully." });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
