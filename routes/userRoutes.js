const express = require("express");

const {
  register,
  checkUserExists,
  getUserByUID,
  updateLastLogin,
} = require("../controller/user.controller");

const verifyJWT = require("../middleware/verifyJWT");
const checkSubscriptionExpire = require("../middleware/checkSubscription");

const router = express.Router();

router.post("/users/register", register);
router.get("/users/:uid/check-exist", checkUserExists);
router.get(
  "/users/user-data",
  verifyJWT,
  checkSubscriptionExpire,
  getUserByUID
);
router.patch("/users/:uid/last-login", updateLastLogin);

module.exports = router;
