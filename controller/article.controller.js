const Article = require("../model/articleSchema");

exports.createArticle = async (req, res) => {
  try {
    const articleData = req.body;
    const newArticle = new Article(articleData);

    await newArticle.save();
    res
      .status(201)
      .json({ message: "Article submitted successfully", article: newArticle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllApprovedArticles = async (req, res) => {
  try {
    const { search = "", publisher, tags } = req.query;

    let query = { status: "Approved" };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (publisher) {
      query.publisher = publisher;
    }
    if (tags) {
      const tagArray = tags.split(",");
      query.tags = { $in: tagArray };
    }

    const articles = await Article.find(query).sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    article.views = (article.views || 0) + 1;
    await article.save();

    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPremiumArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isPremium: true });
    console.log(articles)

    res.status(201).json(articles);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "internal server error" });
  }
};
