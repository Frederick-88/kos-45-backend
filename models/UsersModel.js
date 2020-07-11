const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 8;

const UsersModel = new Schema({
  username: {
    type: String,
    required: true,
    // unique function = true. But the error return hard to processed by frontend
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  //   required: true,
  // },
});
UsersModel.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
module.exports = mongoose.model("UsersModel", UsersModel);
