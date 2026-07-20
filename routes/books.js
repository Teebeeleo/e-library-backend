const express      = require("express");
const router       = express.Router();
const Book         = require("../models/Book");
const User         = require("../models/User");
const Notification = require("../models/Notification");

// GET /books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// POST /books — add book and notify all users
router.post("/", async (req, res) => {
  const { userId, title, author, category, pdf_url, cover_url, available } = req.body;
  try {
    const book = await Book.create({
      title,
      author,
      category,
      pdf_url,
      cover_url,
      available,
      addedBy: userId,
    });

    // Send notification to all registered students
    const users = await User.find({ role: "user" }).select("_id");
    if (users.length > 0) {
      const notifications = users.map((u) => ({
        userId:  u._id,
        type:    "new_book",
        message: `New book added: "${title}" by ${author} — available in ${category}.`,
        is_read: false,
      }));
      await Notification.insertMany(notifications);
    }

    res.json(book);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// PUT /books/:id
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// DELETE /books/:id
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
