const User = require("../models/user");

var jwt = require("jsonwebtoken");
const secret = "shhhhh";

const bcrypt = require("bcrypt");
const saltRounds = 10;

const generateToken = (data) => {
  const token = jwt.sign(data, secret);

  return token;
};

const getUserStatus = (req, res, next) => {
  const token = req.cookies["aid"];
  if (!token) {
    req.isLoggedIn = false;
  }
  try {
    jwt.verify(token, secret);
    req.isLoggedIn = true
  } catch (e) {
    req.isLoggedIn = false;   
  }
  next();
};

const guessAccess = (req, res, next) => {
  const token = req.cookies["aid"];
  if (token) {
    
    return res.redirect("/");
  }

  next();
};

const authAccess = (req, res, next) => {
  const token = req.cookies["aid"];

  if (!token) {
    return res.redirect("/login");
  }

  try {
   jwt.verify(token, secret);
    next();
  } catch (e) {
    res.redirect("/login");
  }
};
const registerUserGet = async (req, res) => {
  res.render("register.hbs", {
    title: "Register | Page"
    ,
    isLoggedIn: req.isLoggedIn
  });
};

const loginUserGet = async (req, res, next) => {
  res.render("login", {
    title: "Login | Page Update",
    isLoggedIn: req.isLoggedIn
  });
};

const loginUserPost = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const userPass = user.password ? user.password : "polop";

  console.log(userPass);
  const status = await bcrypt.compare(password, userPass);

  if (status) {
    const token = generateToken({
      userID: user._id,
      username: user.username,
    });
    res.cookie("aid", token);
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
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

  const token = generateToken({
    userID: userObj._id,
    username: userObj.username,
  });

  res.cookie("aid", token);

  res.redirect("/");
};

const logout = (req, res) => {
  res.clearCookie("aid");

  res.redirect("/");
};

module.exports = {
  registerUserGet,
  regiterUserPost,
  loginUserGet,
  loginUserPost,
  logout,
  authAccess,
  guessAccess,
  getUserStatus
};
