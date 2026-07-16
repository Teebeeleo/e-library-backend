const express  = require("express");
const router   = express.Router();
const Download = require("../models/Download");

// POST /downloads
router.post("/", async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const download = await Download.create({ userId, bookId });
    res.json(download);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
