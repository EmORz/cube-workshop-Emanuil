const {
  getAllCubes,
  getCube,
  updateCube,
  getCubeWithAccessories,
  getAllCubesSearch
} = require("../controllers/cubes");
const { getAccessories } = require("../controllers/accessory");

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
      const accessories = await getAccessories();

      const cubeAccessories = cube.accessories.map((acc) =>
        acc._id.valueOf().toString()
      );
      const notAttachAccesories = accessories.filter((acc) => {
        const accessoriesString = acc._id.valueOf().toString();

        return !cubeAccessories.includes(accessoriesString);
      });

      res.render("attachAccessory", {
        title: "Attach Accessory",
        ...cube,
        accessories: notAttachAccesories,
        isFullAttached: cube.accessories.length === accessories.length,
      });
    }),
    app.post("/attach/accessory/:id", async (req, res) => {
      const { accessory } = req.body;

      await updateCube(req.params.id, accessory);

      res.redirect(`/details/${req.params.id}`);
    }),
    app.post("/create/accessory", async (req, res, next) => {
      const { name, description, imageUrl } = req.body;

      const accessory = new Accessory({
        name,
        description,
        imageUrl,
      });

      await accessory.save();

      res.redirect("/create/accessory");
    }),
    app.get("/", async (req, res) => {
      const { from, to, search } = req.query;
      //
      // let query = {};
      // if (search) {
      //   query = { ...query };
      // }
      // if (to) {
      //   query = { ...query, difficultyLevel: { $lte: +to } };
      // }
      // if (from) {
      //   query = {
      //     ...query,
      //     difficultyLevel: { ...query.difficultyLevel, $gte: +from }
      //   };

      //const searchCubes = await  getAllCubesSearch(search);
    
      const cubes = await getAllCubes();
      res.render("index", {
        title: "Cube Workshop",
        cubes
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
      cube.save((err) => {
        if (err) {
          console.error(err);
          res.redirect("/create");
        } else {
          res.redirect("/");
        }
      });
    });
  app.get("/details/:id", async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);
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
