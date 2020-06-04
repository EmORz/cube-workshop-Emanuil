const { getAllCubes } = require("../controllers/cubes");
const accessoriesController = require("../controllers/accessory");

const { getCube } = require("../controllers/database");
const Cube = require("../models/cube");

module.exports = (app) => {

  app.get('/create/accessory', accessoriesController.createGet ),
  app.post('/create/accessory', accessoriesController.createPost ),
  app.get('/attach/accessory/:id', accessoriesController.attachGet ),
  app.post('/attach/accessory/:id', accessoriesController.attachPost ),
  app.get("/", (req, res) => {
    getAllCubes((cubes) => {
      res.render("index", {
        title: "Cube Workshop",
        cubes,
      });
    });
  }),
    app.get("/about", (req, res) => {
      res.render("about", {
        title: "About | Cube Workshop",
      });
    }),
    app.get("/create", (req, res) => {
      res.render("create", {
        title: "Create | Cube Workshop",
      });
    }),
    app.post("/create", (req, res) => {
      const { name, description, imageUrl, difficultyLevel } = req.body;

      const cube = new Cube(name, description, imageUrl, difficultyLevel);
      cube.save(() => {
        res.redirect("/");
      });
    });
  app.get("/details/:id", (req, res) => {
    getCube(req.params.id, (cube) => {
      res.render("details", {
        title: "Details | Cube Workshop",
        ...cube,
      });
    });
  }),
    app.get("*", (req, res) => {
      res.render("404", {
        title: "Error | Cube Workshop"
      });
    });
};
