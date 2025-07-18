const Article = require("../model/articleSchema");
const User = require("../model/userSchema");
const Publisher = require("../model/publisherSchema");

exports.getAllArticles = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(404).json({ message: "Forbidden: Access denied" });
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Article.countDocuments();

    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      articles,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};

exports.approveArticle = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(404).json({ message: "Forbidden: Access denied" });
  }
  const id = req.params.id;
  try {
    const article = await Article.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true }
    );

    if (!article) return res.status(404).json({ message: "Article not found" });

    res.json({ message: "Article approved successfully", article });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.declineArticle = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(404).json({ message: "Forbidden: Access denied" });
  }

  try {
    const { reason } = req.body;

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { status: "Declined", declineReason: reason },
      { new: true }
    );

    if (!article) return res.status(404).json({ message: "Article not found" });

    res.json({ message: "Article declined successfully", article });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteArticle = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(404).json({ message: "Forbidden: Access denied" });
  }

  const id = req.params.id;
  try {
    const article = await Article.findByIdAndDelete(id);

    if (!article) return res.status(404).json({ message: "Article not found" });

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.makeArticlePremium = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(404).json({ message: "Forbidden: Access denied" });
  }

  const id = req.params.id;
  try {
    const article = await Article.findByIdAndUpdate(
      id,
      { isPremium: true },
      { new: true }
    );

    if (!article) return res.status(404).json({ message: "Article not found" });

    res.json({ message: "Article marked as premium", article });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllUsers = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(404).json({ message: "Forbidden: Access denied" });
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();

    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

exports.promoteToAdmin = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(404).json({ message: "Forbidden: Access denied" });
  }

  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated to admin", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error making admin", error });
  }
};

exports.addPublisher = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(404).json({ message: "Forbidden: Access denied" });
  }

  const { name, logo, author } = req.body;
  try {
    const newPublisher = new Publisher({ name, logo, author });

    await newPublisher.save();
    res.status(201).json({ success: true, publisher: newPublisher });
  } catch (error) {
    res.status(404).json({ message: "Internal server error" });
  }
};

exports.calculateArticleDistribution = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(404).json({ message: "Forbidden: Access denied" });
  }

  try {
    const result = await Article.aggregate([
      {
        $group: {
          _id: "$publisher",
          count: { $sum: 1 },
        },
      },
    ]);

    const chartData = [["Publisher", "Number of Articles"]];

    result.forEach((item) => {
      chartData.push([item._id, item.count]);
    });

    res.status(201).json(chartData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
