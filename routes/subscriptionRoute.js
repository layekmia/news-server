const express = require("express");
const {
  createPaymentIntent,
  makeUserPremium,
} = require("../controller/subscription.controller");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.post("/users/subscription", createPaymentIntent);
router.patch("/users/premium/", verifyJWT, makeUserPremium);

module.exports = router;
