const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    publisher: { type: String, required: true },
    tags: [{ type: String, required: true }],
    description: { type: String, required: true },
    authorEmail: { type: String, required: true },
    authorName: { type: String, required: true },
    authorImage: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Declined"],
      default: "Pending",
    },
    declineReason: { type: String, default: "" },
    isPremium: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
