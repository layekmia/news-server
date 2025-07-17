const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "premium", "admin"],
      default: "user",
    },

    uid: {
      type: String,
      required: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    premiumTaken: {
      type: Date,
      default: null,
    },

    planEndDate: {
      type: Date,
      default: null,
    },

    premiumExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
