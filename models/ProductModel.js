const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductModel = new Schema({
  image: {
    type: String,
    default: "public/productImages/default-product-image.jpg",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productGender: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("product", ProductModel);
