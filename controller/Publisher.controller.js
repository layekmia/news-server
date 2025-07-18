const Publisher = require("../model/publisherSchema");

exports.getAllPublisher = async (req, res) => {
  try {
    const publishers = await Publisher.find();

    res.status(200).json(publishers);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


