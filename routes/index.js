const { getAllCubes } = require("../controllers/cubes");
const accessoriesController = require("../controllers/accessory");

const { getCube } = require("../controllers/cubes");
const Cube = require("../models/cube");

module.exports = (app) => {
  app.get("/create/accessory", accessoriesController.createGet),
    app.post("/create/accessory", accessoriesController.createPost),
    app.get("/attach/accessory/:id", accessoriesController.attachGet),
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

      const cube = new Cube({name, description, imageURL: imageUrl,  difficulty: difficultyLevel});
      console.log(cube)
      cube.save((err) => {
        if (err) {
          console.error(err)
        }
        res.redirect("/");
      });
    });
  app.get("/details/:id", async (req, res) => {
    const cube = await getCube(req.params.id)
 
      res.render("details", {
        title: "Details | Cube Workshop",
        ...cube
        
 
    });
  }),
    app.get("*", (req, res) => {
      res.render("404", {
        title: "Error | Cube Workshop",
      });
    });
};
