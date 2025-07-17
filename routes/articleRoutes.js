const express = require("express");
const {
  createArticle,
  getAllApprovedArticles,
  getArticleById,
  getPremiumArticles,
  getUserArticles,
  updateArticle,
  deleteArticle,
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

module.exports = router;
