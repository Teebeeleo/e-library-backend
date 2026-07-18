const express = require("express");
const router  = require("express").Router();
const Book    = require("../models/Book");

// GET /books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// POST /books
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
