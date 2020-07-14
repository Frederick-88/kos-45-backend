const articleModel = require("../models/ArticleModel");
require("dotenv").config();

module.exports = {
  createArticle: (req, res, next) => {
    console.log(req.body.image);
    //   to cover when image field isn't filled, so default can come in (if not it will be replaced with "")
    let objWithoutImage = {
      title: req.body.title,
      paragraph1: req.body.paragraph1,
      paragraph2: req.body.paragraph2,
      paragraph3: req.body.paragraph3,
      paragraph4: req.body.paragraph4,
      paragraph5: req.body.paragraph5,
    };
    // to cover when there are inputs in the image field
    let obj = {
      image: req.file && req.file.path,
      title: req.body.title,
      paragraph1: req.body.paragraph1,
      paragraph2: req.body.paragraph2,
      paragraph3: req.body.paragraph3,
      paragraph4: req.body.paragraph4,
      paragraph5: req.body.paragraph5,
    };
    console.log(req.body.title);

    // see obj & objWithoutImage
    if (obj.image == null) {
      articleModel
        .create(objWithoutImage)
        .then((result) => {
          res.json({
            status: "success",
            message: "Successfully create article!",
            data: result,
          });
        })
        .catch((error) => res.status(400).json(error));
    } else {
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
    }
  },

  editArticleById: (req, res, next) => {
    articleId = req.params.articleId;
    //  find by id dulu supaya dapat data id tersebut. Karena untuk keperluan klau req body kosong, bakal tetap ada isi.
    articleModel.findById(articleId).then((dataArticleId) => {
      articleModel
        .findByIdAndUpdate(
          articleId,
          // req.file && req.file.path karena kita plih file menggunakan "CHOOSE FILE"
          // dibikin bentuk || untuk mengcover apabila tidak ada yang diedit pada field tersebut maka datanya akan tetap seperti sebelumnya.
          {
            image: (req.file && req.file.path) || dataArticleId.image,
            title: req.body.title || dataArticleId.title,
            paragraph1: req.body.paragraph1 || dataArticleId.paragraph1,
            paragraph2: req.body.paragraph2 || dataArticleId.paragraph2,
            paragraph3: req.body.paragraph3 || dataArticleId.paragraph3,
            paragraph4: req.body.paragraph4 || dataArticleId.paragraph4,
            paragraph5: req.body.paragraph5 || dataArticleId.paragraph5,
          },
          // langsung update, ngga perlu refresh
          { new: true }
        )
        .then((result) => {
          res.json({
            message: `The data of ${articleId} successfully edited.`,
            data: result,
          });
        })
        .catch((error) => res.status(400).json(error));
    });
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
          message: `Successfully delete id of ${req.params.articleId} !`,
        });
      })
      .catch((error) => res.status(400).json(error));
  },
};
