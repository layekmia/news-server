const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    author: { name: String, email: String, image: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Publisher", publisherSchema);
