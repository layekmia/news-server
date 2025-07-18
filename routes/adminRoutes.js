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
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.get("/articles", verifyJWT, getAllArticles);
router.patch("/articles/approve/:id", verifyJWT, approveArticle);
router.patch("/articles/decline/:id", verifyJWT, declineArticle);
router.delete("/articles/delete/:id", verifyJWT, deleteArticle);
router.patch("/articles/premium/:id", verifyJWT, makeArticlePremium);
router.get("/all-users", verifyJWT, getAllUsers);
router.patch("/users/admin/:id", verifyJWT, promoteToAdmin);
router.post("/admin/add-publisher", verifyJWT, addPublisher);
router.get(
  "/calculate/article/distribution",
  verifyJWT,
  calculateArticleDistribution
);

module.exports = router;
