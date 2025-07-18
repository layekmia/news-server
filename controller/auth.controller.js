const admin = require("../config/firebaseAdmin");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

exports.verifyFirebaseToken = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Firebase token missing or invalid Unauthorized" });
  }

  const firebaseToken = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(firebaseToken);


    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(401).json({ message: "user not found" });

    
    const payload = {
      uid: decoded.uid,
      email: decoded.email,
      role: user.role,
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({ token: jwtToken });
  } catch (error) {
    console.error("JWT Error:", error);
    res.status(401).json({ error: "Invalid Firebase token" });
  }
};
