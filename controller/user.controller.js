const User = require("../model/userSchema");

exports.register = async (req, res) => {
  const { name, image, uid, email } = req.body;

  try {
    // Check if user already exists by email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
        user: existingUser,
      });
    }

    // Create a new user and set initial lastLogin to now
    const newUser = new User({
      name,
      image,
      uid,
      email,
      lastLogin: new Date(), // ✅ set last login on signup
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("User registration failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// check existence during social login
exports.checkUserExists = async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({
      success: false,
      message: "UID is required",
    });
  }

  try {
    const user = await User.findOne({ uid });
    if (user) {
      return res.json({ exists: true });
    }
    return res.json({ exists: false });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// get single user data
exports.getUserByUID = async (req, res) => {
  const { uid } = req.user;
  try {
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user by UID error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// controllers/userController.js

exports.updateLastLogin = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { uid },
      { lastLogin: new Date() },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  
    res.json({ success: true, message: "Last login updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
