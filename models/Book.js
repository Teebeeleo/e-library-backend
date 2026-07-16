const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  author:    { type: String, required: true },
  category:  { type: String, enum: ["100L", "200L", "300L", "400L", "500L"], required: true },
  pdf_url:   { type: String, default: "" },
  available: { type: Number, default: 1 },
  addedBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);
