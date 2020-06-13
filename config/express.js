const handlebars = require("express-handlebars");
const express = require("express");
const cookieParser = require('cookie-parser');
const secret = 'secret'



//const bodyParser = require("body-parser");

module.exports = (app) => {


  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded());

  app.engine(
    ".hbs",
    handlebars({
      extname: ".hbs",
    })
  );
  
  app.set("view engine", ".hbs");

  app.use("/static", express.static("static"));


};
