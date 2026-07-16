const mongoose = require("mongoose");

const DownloadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Download", DownloadSchema);
