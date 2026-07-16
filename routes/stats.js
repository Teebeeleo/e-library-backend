const express  = require("express");
const router   = express.Router();
const User     = require("../models/User");
const Book     = require("../models/Book");
const Download = require("../models/Download");

// GET /stats
router.get("/", async (req, res) => {
  try {
    const [users, books, downloads] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Book.countDocuments(),
      Download.countDocuments(),
    ]);
    res.json({ users, books, downloads });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
