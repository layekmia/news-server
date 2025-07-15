const jwt = require("jsonwebtoken");
const admin = require("../config/firebaseAdmin");

exports.getJwtToken = async (req, res) => {
  const { firebaseToken } = req.body;

  if(!firebaseToken) {
   return res.status(400).json({message: 'Firebase token is required'})
  }

  try {
    const decodedUser = await admin.auth().verifyIdToken(firebaseToken);
    
    const token = j
  } catch (error) {}
};
