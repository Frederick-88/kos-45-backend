const articleModel = require("../models/ArticleModel");
require("dotenv").config();

module.exports = {
  createArticle: (req, res, next) => {
    console.log(req.body.image);
    let obj = {
      image: req.body.image,
      title: req.body.title,
      paragraph1: req.body.paragraph1,
      paragraph2: req.body.paragraph2,
      paragraph3: req.body.paragraph3,
      paragraph4: req.body.paragraph4,
      paragraph5: req.body.paragraph5,
    };
    articleModel
      .create(obj)
      .then((result) => {
        res.json({
          status: "success",
          message: "Successfully create article!",
          data: result,
        });
      })
      .catch((error) => res.status(400).json(error));
  },

  getAllArticles: (req, res, next) => {
    articleModel
      .find({})
      .then((result) => {
        res.json({
          status: "success",
          message: "Successfully get all articles!",
          data: result,
        });
      })
      .catch((error) => res.status(400).json(error));
  },

  getArticleId: (req, res, next) => {
    articleModel
      .findById(req.params.articleId)
      .then((result) => {
        res.json({
          status: "success",
          message: `Successfully get data id of ${req.params.articleId} !`,
          data: result,
        });
      })
      .catch((error) => res.status(400).json(error));
  },

  deleteById: (req, res, next) => {
    articleModel
      .findByIdAndRemove(req.params.articleId)
      .then(() => {
        res.json({
          status: "success",
          message: `Successfully delete id of ${req.params.articleId}.`,
        });
      })
      .catch((error) => res.status(400).json(error));
  },
};
