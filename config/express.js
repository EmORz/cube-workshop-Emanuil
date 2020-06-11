const handlebars = require("express-handlebars");
const express = require("express");
const cookieParser = require('cookie-parser');
const secret = 'secret'


//const bodyParser = require("body-parser");

module.exports = (app) => {
  app.engine(
    ".hbs",
    handlebars({
      extname: ".hbs",
    })
  );
  app.set("view engine", ".hbs");

  app.use(cookieParser(secret));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use("/static", express.static("static"));
};
