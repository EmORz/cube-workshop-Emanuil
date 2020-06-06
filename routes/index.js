const { getAllCubes } = require("../controllers/cubes");
const accessoriesController = require("../controllers/accessory");

const { getCube } = require("../controllers/cubes");
const Cube = require("../models/cube");
const Accessory = require("../models/accessory");

module.exports = (app) => {
  app.get("/create/accessory", (req, res) => {
    res.render("createAccessory", {
      title: "Create Accessory",
    });
  }),
    app.get("/attach/accessory/:id", async (req, res) => {
      const cube = await getCube(req.params.id);
      res.render("attachAccessory", {
        title: "Attach Accessory",
        ...cube,
      });
    }),
    app.post("/create/accessory", async (req, res, next) => {
      const { name, description, imageUrl } = req.body;

      const accessory = new Accessory({
        name, description, imageUrl
      })

     await accessory.save()

     res.redirect('/create/accessory')


    }),
    app.post("/attach/accessory/:id", accessoriesController.attachPost),
    app.get("/", async (req, res) => {
      const cubes = await getAllCubes();

      res.render("index", {
        title: "Cube Workshop",
        cubes,
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

      const cube = new Cube({
        name,
        description,
        imageURL: imageUrl,
        difficulty: difficultyLevel,
      });
      console.log(cube);
      cube.save((err) => {
        if (err) {
          console.error(err);
        }
        res.redirect("/");
      });
    });
  app.get("/details/:id", async (req, res) => {
    const cube = await getCube(req.params.id);

    res.render("details", {
      title: "Details | Cube Workshop",
      ...cube,
    });
  }),
    app.get("*", (req, res) => {
      res.render("404", {
        title: "Error | Cube Workshop",
      });
    });
};
