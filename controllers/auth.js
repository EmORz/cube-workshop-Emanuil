const User = require("../models/user");
const tokenBlacklist = require("../models/token-blacklist");
const utils = require("../utils");
const appConfig = require("../app-config");
//const jwt = require("../utils/jwt");
var jwt = require("jsonwebtoken");
const secret = "shhhhh";

const bcrypt = require("bcrypt");
const saltRounds = 10;

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

  await User.findOne({ username })
    .then((user) =>
      Promise.all([user, user ? user.matchPassword(password) : false])
    )
    .then(([user, match]) => {
      if (!match) {
        res.render("login.hbs", { massage: "Wrong password or username!" });
        return;
      }

      const token = utils.jwt.createToken({ id: user._id });
      res.cookie(appConfig.authCookieName, token).redirect("/");
    });
};

const regiterUserPost = async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPass = await bcrypt.hash(password, salt);
  const user = new User({
    username,
    password: hashedPass,
  });

  const userObj = await user.save();

  const token =  jwt.sign({userID: userObj._id, username: userObj.username}, secret);
  res.cookie('aid', token)

  res.redirect('/')

};

const logout = async (req, res) => {
  const token = req.cookies[appConfig.authCookieName];
  tokenBlacklist.create({ token }).then(() => {
    res.clearCookie(appConfig.authCookieName).redirect("/");
  });
};

module.exports = {
  registerUserGet,
  regiterUserPost,
  loginUserGet,
  loginUserPost,
  logout,
};
