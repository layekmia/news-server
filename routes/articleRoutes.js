const express = require("express");
const {
  createArticle,
  getAllApprovedArticles,
  getArticleById,
  getPremiumArticles,
  getUserArticles,
  updateArticle,
  deleteArticle,
  getTopViewedArticles,
} = require("../controller/article.controller");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.post("/articles", createArticle);
router.get("/articles/approved", getAllApprovedArticles);
router.get("/user/premium/articles", getPremiumArticles);
router.get("/articles/:id", getArticleById);
router.get("/user/articles", getUserArticles);
router.put("/update/article/:id", updateArticle);
router.delete("/article/delete/:id", deleteArticle);
router.get("/top-articles", getTopViewedArticles);

module.exports = router;
