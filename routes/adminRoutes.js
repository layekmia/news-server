const express = require("express");
const {
  getAllArticles,
  approveArticle,
  declineArticle,
  makeArticlePremium,
  getAllUsers,
  promoteToAdmin,
  addPublisher,
  calculateArticleDistribution,
} = require("../controller/admin.controller");
const { deleteArticle } = require("../controller/article.controller");

const router = express.Router();

router.get("/articles", getAllArticles);
router.patch("/articles/approve/:id", approveArticle);
router.patch("/articles/decline/:id", declineArticle);
router.delete("/articles/delete/:id", deleteArticle);
router.patch("/articles/premium/:id", makeArticlePremium);
router.get("/all-users", getAllUsers);
router.patch("/users/admin/:id", promoteToAdmin);
router.post("/admin/add-publisher", addPublisher);
router.get('/calculate/article/distribution', calculateArticleDistribution)

module.exports = router;
