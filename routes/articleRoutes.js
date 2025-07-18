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

router.post("/articles", verifyJWT, createArticle);
router.get("/articles/approved", getAllApprovedArticles);
router.get("/user/premium/articles", verifyJWT, getPremiumArticles);
router.get("/articles/:id", verifyJWT, getArticleById);
router.get("/user/articles", verifyJWT, getUserArticles);
router.put("/update/article/:id", verifyJWT, updateArticle);
router.delete("/article/delete/:id", verifyJWT, deleteArticle);
router.get("/top-articles", getTopViewedArticles);

module.exports = router;
