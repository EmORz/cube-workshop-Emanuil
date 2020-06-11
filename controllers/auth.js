const User = require("../models/user");
const user = require("../models/user");
// const utils = require('../utils');
// const appConfig = require('../app-config');

const registerUserGet = async (req, res) => {
  res.render("register.hbs", {
    title: "Register | Page",
  });
};

const loginUserGet = async (req, res, next) => {
  res.render("login", {
    title: "Login | Page Update",
  });
};

const loginUserPost = async (req, res) => {
  const { username, password } = req.body;

  const loginUser = await user
    .findOne({ username })
    .then((us) => us.matchPassword(password));

    

  if (!loginUser) {
    res.render("login", { message: "Wrong Pass" });
    return;
  } else {
      console.log("You are in system!")
  }
};

const regiterUserPost = async (req, res, next) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  await user.save();

  res.redirect("login");
};
module.exports = {
  registerUserGet,
  regiterUserPost,
  loginUserGet,
  loginUserPost
};
