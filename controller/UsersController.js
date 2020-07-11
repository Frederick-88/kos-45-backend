const UsersModel = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validator/RegisterValidator");
require("dotenv").config();

module.exports = {
  // register user
  register: (req, res, next) => {
    let obj = {
      username: req.body.username,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    };
    // Validation Register
    const errors = validateRegisterInput(obj).errors;
    const isValid = validateRegisterInput(obj).isValid;
    // if invalid / doesn't pass validation
    if (!isValid) {
      return res.status(errors.status).json(errors);
    }

    UsersModel.find().then((user) => {
      // Username duplicate validator
      if (user.find((element) => element.username === obj.username)) {
        return res.status(401).json({
          status: "error",
          error: `Username "${req.body.username}" already exist!`,
        });
        // Email duplicate validator
      } else if (user.find((element) => element.email === obj.email)) {
        return res.status(401).json({
          status: "error",
          error: `Email "${req.body.email}" already exist!`,
        });
        // PhoneNumber duplicate validator
      } else
        UsersModel.create(obj)
          .then((result) => {
            res.json({
              status: "success",
              message: "Successfully create account!",
              data: result,
            });
          })
          .catch((error) => res.status(400).json(error));
    });
  },

  // ###################################################
  // Register's Expected error output :
  // {
  //   "status": 401,
  //   "message": {
  //     "username": "Username is required.",
  //     "email": "Email is required.",
  //     "phoneNumber": "PhoneNumber is required.",
  //     "password": "Password is required."
  //   }
  // }
  // ###################################################

  //   login user (sign in) authentication
  login: (req, res, next) => {
    const email = req.body.email;
    UsersModel.findOne({ email }).then((user) => {
      // check if user exists
      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", error: "Email not found" });
      } else {
        // validation password
        if (bcrypt.compareSync(req.body.password, user.password)) {
          //  make payload so that when token is decoded in frontend this is the data that it will get
          const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
          };
          //  Sign token
          jwt.sign(
            payload,
            process.env.PRIVATE_KEY,
            { expiresIn: 31556926 }, // 1 year of expiration
            (err, token) => {
              res.json({
                status: "success",
                token: token,
              });
            }
          );
        } else {
          return res.status(404).json({
            status: "failed",
            error: "Password incorrect",
          });
        }
      }
    });
  },

  // login as admin authentication.
  loginAdmin: (req, res, next) => {
    const email = req.body.email;
    UsersModel.findOne({ email })
      .then((user) => {
        // check if "user" is null = means not registered.
        // check if user's email is the same as admin's email.
        if (!user || user.email !== "admin@gmail.com") {
          return res
            .status(404)
            .json({ status: "failed", error: "Admin's email not found" });
        } else {
          // validation password
          if (bcrypt.compareSync(req.body.password, user.password)) {
            //  make payload so that when token is decoded in frontend this is the data that it will get
            const payload = {
              id: user.id,
              email: user.email,
              username: user.username,
            };
            //  Sign token
            jwt.sign(
              payload,
              process.env.PRIVATE_KEY,
              { expiresIn: 31556926 }, // 1 year of expiration
              (err, token) => {
                res.json({
                  status: "success",
                  message: "You're an admin!",
                  token: token,
                });
              }
            );
          } else {
            return res.status(404).json({
              status: "failed",
              error: "Password incorrect",
            });
          }
        }
      })
      .catch((error) => console.log(error));
  },

  getAllUsers: (req, res, next) => {
    UsersModel.find({})
      .then((result) => {
        res.status(200).json({
          status: "success",
          message: "Successfully get all users!",
          data: result,
        });
      })
      .catch((error) => res.status(400).json(error));
  },

  getUserId: (req, res, next) => {
    UsersModel.findById(req.params.userId)
      .then((result) => {
        res.json({
          status: "success",
          message: `Successfully get data id of ${req.params.userId} !`,
          data: result,
        });
      })
      .catch((error) => res.status(400).json(error));
  },

  deleteById: (req, res, next) => {
    UsersModel.findByIdAndRemove(req.params.userId)
      .then(() => {
        res.json({
          status: "success",
          message: `Successfully delete id of ${req.params.userId} !`,
        });
      })
      .catch((error) => res.status(400).json(error));
  },
};
