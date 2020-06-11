const {
  createCubeGet,
  createCubePost,
  detailsGet,
  homeGet,
  homePost,
} = require("../controllers/cubes");
const {
  createAccessoryGet,
  createAccessoryPost,
  attachGet,
  attachPost,
} = require("../controllers/accessory");
const {
  registerUserGet,
  loginUserGet,
  loginUserPost,
  regiterUserPost,
} = require("../controllers/auth");

module.exports = (app) => {
  app.get("/", homeGet);
  app.post("/", homePost);

  app.get("/register", registerUserGet);
  app.get("/login", loginUserGet);
  app.post("/login", loginUserPost);

  app.post("/register", regiterUserPost);

  app.get("/create/accessory", createAccessoryGet);
  app.post("/create/accessory", createAccessoryPost);

  app.get("/attach/accessory/:id", attachGet);
  app.post("/attach/accessory/:id", attachPost);

  app.get("/create", createCubeGet);
  app.post("/create", createCubePost);

  app.get("/details/:id", detailsGet);

  app.get("/about", (req, res) => {
    res.render("about", {
      title: "About | Cube Workshop",
    });
  });

  app.get("*", (req, res) => {
    res.render("404", {
      title: "Error | Cube Workshop",
    });
  });
};
