const express  = require("express");
const router   = express.Router();
const Favorite = require("../models/Favorite");

// POST /favorites
router.post("/", async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const exists = await Favorite.findOne({ userId, bookId });
    if (exists) return res.json({ message: "Already in favorites" });

    const fav = await Favorite.create({ userId, bookId });
    res.json(fav);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// GET /favorites/:userId
router.get("/:userId", async (req, res) => {
  try {
    const favs = await Favorite.find({ userId: req.params.userId }).populate("bookId");
    const books = favs.map((f) => f.bookId);
    res.json(books);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
