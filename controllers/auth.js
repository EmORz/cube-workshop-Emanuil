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
    req.isLoggedIn = true;
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
    title: "Register | Page",
    isLoggedIn: req.isLoggedIn,
  });
};

const loginUserGet = async (req, res) => {
  //const error = req.query.error?'Username or Password is not correct!': null;

  res.render("login", {
    title: "Login | Page Update",
    isLoggedIn: req.isLoggedIn,
    //error
  });
};

const loginUserPost = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.render("login", {
        title: "Login | Cube Workshop",
        isLoggedIn: req.isLoggedIn,
        error: "There is no such user!",
      });
    }

    const status = await bcrypt.compare(password, user.password);

    if (status) {
      const token = generateToken({
        userID: user._id,
        username: user.username,
      });
      res.cookie("aid", token);
    } else{
      return res.render("login", {
        title: "Login | Cube Workshop",
        isLoggedIn: req.isLoggedIn,
        error: "Wrong Username or Password!",
      });
    }
    return true
  } catch (err) {
    return res.render("login", {
      title: "Login | Cube Workshop",
      isLoggedIn: req.isLoggedIn,
      error: "Cube details are not valid!",
    });
  }
};

const regiterUserPost = async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPass = await bcrypt.hash(password, salt);

  try {
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

    return token;
  } catch (err) {
    return res.render("register", {
      title: "Register | Cube Workshop",
      isLoggedIn: req.isLoggedIn,
      error: "Username or password is not valid",
    });
  }
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
  getUserStatus,
};
