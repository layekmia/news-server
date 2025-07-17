const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "unauthorized access: token missing" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Invalid token",
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;