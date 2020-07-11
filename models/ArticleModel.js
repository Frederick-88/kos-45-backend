const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleModel = new Schema({
  image: {
    type: String,
    default: "public/articleImages/default-product-image.jpg",
  },
  title: {
    type: String,
    required: true,
  },
  paragraph1: {
    type: String,
    required: true,
  },
  paragraph2: {
    type: String,
    required: true,
  },
  paragraph3: {
    type: String,
    required: true,
  },
  paragraph4: {
    type: String,
    required: true,
  },
  paragraph5: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("article", ArticleModel);
