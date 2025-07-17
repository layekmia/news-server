const express = require("express");
const {
  getAllArticles,
  approveArticle,
  declineArticle,
  makeArticlePremium,
} = require("../controller/admin.controller");
const { deleteArticle } = require("../controller/article.controller");

const router = express.Router();

router.get("/articles", getAllArticles);
router.patch("/articles/approve/:id", approveArticle);
router.patch("/articles/decline/:id", declineArticle);
router.delete("/articles/delete/:id", deleteArticle);
router.patch("/articles/premium/:id", makeArticlePremium);

module.exports = router;
