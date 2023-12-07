const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { blacklistModel } = require("../models/blacklist.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, password, avatar } = req.body;
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    res.status(200).send({ msg: "User already exists, please login" });
    return;
  }
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res
          .status(500)
          .send({ msg: "error while hashing password", error: err.message });
      } else {
        const user = new UserModel({ username, email, password: hash, avatar });
        const new_user = await user.save();
        res
          .status(200)
          .send({ msg: "user registered successfully", new_user: new_user });
      }
    });
  } catch (err) {
    res
      .status(500)
      .send({ msg: "error while hashing password", error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { username: user.username, userID: user._id },
            "raviteja",
            {
              expiresIn: "7d",
            }
          );
          res.status(200).send({ msg: "logged in successfully", token: token, user });
          return;
        }
        if (err) {
          res.status(500).send({
            msg: "error while comparing hashed password",
            error: err.message,
          });
        }
      });
    } else {
      res
        .status(200)
        .send({ msg: "this user doesn't exist please register first" });
    }
  } catch (err) {
    res.status(500).send({
      msg: "error while in login, logging route catch block",
      error: err.message,
    });
  }
});

userRouter.get("/logout", async (req, res) => {
  const tokenValue = req.headers.token?.split(" ")[1];
  try {
    const doc = new blacklistModel({ token: tokenValue });
    await doc.save();
    res.status(200).send({ msg: "logout successful" });
  } catch (err) {
    res.status(500).send({
      msg: "error while in logout, logout route catch block",
      error: err.message,
    });
  }
});

module.exports = { userRouter };
