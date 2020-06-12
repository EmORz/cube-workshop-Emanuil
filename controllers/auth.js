const User = require("../models/user");
const tokenBlacklist = require('../models/token-blacklist')
const utils = require('../utils');
const appConfig = require('../app-config');
const jwt = require("../utils/jwt");

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

 await User
    .findOne({ username })
    .then((user) => Promise.all([user, user? user.matchPassword(password): false]))
    .then(([user, match])=>{
      if(!match){
        res.render('login.hbs', { massage: 'Wrong password or username!' });
        return;
      }

      const token = utils.jwt.createToken({id: user._id})
      res.cookie(appConfig.authCookieName, token).redirect('/')

    });
};

const regiterUserPost = async (req, res, next) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  await user.save();

  res.redirect("login");
};

const logout = async (req, res) => {
  const token = req.cookies[appConfig.authCookieName]
  tokenBlacklist.create({token}).then(()=> {
    res.clearCookie(appConfig.authCookieName).redirect('/')
  })
}

module.exports = {
  registerUserGet,
  regiterUserPost,
  loginUserGet,
  loginUserPost,
  logout
};
