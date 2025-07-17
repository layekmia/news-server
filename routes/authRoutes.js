const express = require("express");
const { verifyFirebaseToken } = require("../controller/auth.controller");
const router = express.Router();

router.post("/auth", verifyFirebaseToken);

module.exports = router;
