const express = require("express");
const router  = express.Router();
const User    = require("../models/User");

// GET /users — returns all students
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

module.exports = router;
