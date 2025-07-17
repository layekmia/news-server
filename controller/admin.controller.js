const Article = require("../model/articleSchema");
const User = require("../model/userSchema");

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};

exports.approveArticle = async (req, res) => {
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
