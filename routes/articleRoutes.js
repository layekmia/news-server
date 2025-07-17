const express = require("express");
const {
  createArticle,
  getAllApprovedArticles,
  getArticleById,
  getPremiumArticles,
} = require("../controller/article.controller");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.post("/articles", createArticle);
router.get("/articles/approved", getAllApprovedArticles);
router.get("/user/premium/articles", getPremiumArticles);
router.get("/articles/:id", getArticleById);

module.exports = router;
