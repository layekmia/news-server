const User = require("../model/userSchema");

const checkSubscriptionExpire = async (req, res, next) => {
  try {
    const uid = req.user.uid;

    if (!uid) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ uid });

    if (
      user.role === "premium" &&
      user.planEndDate &&
      new Date(user.planEndDate) < new Date()
    ) {
      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            role: "user",
            premiumTaken: null,
            planEndDate: null,
          },
        }
      );

      return res.status(403).json({
        message: "Your subscription has expired. You have been downgraded.",
      });
    }

    next();
  } catch (error) {
    console.error("Subscription expiration check error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = checkSubscriptionExpire;
