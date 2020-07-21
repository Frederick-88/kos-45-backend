var express = require("express");
var router = express.Router();
const articleController = require("../controller/ArticleController");

router.post("/addarticle", articleController.createArticle);
router.get("/getarticle", articleController.getAllArticles);
router.get("/getarticle/:articleId", articleController.getArticleId);
router.delete("/deletearticle/:articleId", articleController.deleteById);

module.exports = router;
