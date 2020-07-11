var express = require("express");
var router = express.Router();
const articleController = require("../controller/ArticleController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public/articleImages/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

// upload.single("image") means only upload 1 (image). you can check more options on the multer docs or go to the chat backend.
router.post(
  "/addarticle",
  upload.single("image"),
  articleController.createArticle
);
router.put(
  "/editarticle/:articleId",
  upload.single("image"),
  articleController.editArticleById
);
router.get("/getarticle", articleController.getAllArticles);
router.get("/getarticle/:articleId", articleController.getArticleId);
router.delete("/deletearticle/:articleId", articleController.deleteById);

module.exports = router;
