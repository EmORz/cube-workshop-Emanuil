const handlebars = require("express-handlebars");
const express = require("express");

//const bodyParser = require("body-parser");

module.exports = (app) => {
  app.engine(
    ".hbs",
    handlebars({
      extname: ".hbs",
    })
  );
  app.set("view engine", ".hbs");

  app.use(express.json());
  app.use(express.urlencoded());
  app.use("/static", express.static("static"));
};
