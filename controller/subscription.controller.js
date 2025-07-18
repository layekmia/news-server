const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require('../model/userSchema')

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  const amountInCents = amount * 100;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment failed" });
  }
};


exports.makeUserPremium = async (req, res) => {
  try {
    const { uid } = req.user;
    
    const { duration, unit } = req.body;

    if (!duration || !unit) {
      return res
        .status(400)
        .json({ message: "Duration and unit are required" });
    }

    let durationMs;
    switch (unit) {
      case "minute":
        durationMs = duration * 60 * 1000;
        break;
      case "day":
        durationMs = duration * 24 * 60 * 60 * 1000;
        break;
      default:
        return res.status(400).json({ message: "Invalid unit" });
    }

    const planEndDate = new Date(Date.now() + durationMs);

    const result = await User.updateOne(
      { uid },
      {
        $set: {
          role: "premium",
          premiumTaken: new Date(), 
          planEndDate,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found or not updated" });
    }

    res.status(200).json({ message: "User upgraded to premium", planEndDate });
  } catch (error) {
    console.error("Error upgrading user to premium:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
