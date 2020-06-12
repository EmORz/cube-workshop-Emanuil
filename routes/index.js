const {
  createCubeGet,
  createCubePost,
  detailsGet,
  homeGet,
  homePost,
  editCubeGet,
  editCubePost,
  deleteCubeGet,
  deleteCubePost
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
  logout
} = require("../controllers/auth");

const { auth } = require('../utils');

module.exports = (app) => {
  app.get("/", homeGet);
  app.post("/", homePost);

  app.get("/register", registerUserGet);
  app.post("/register", regiterUserPost);
  app.get("/login", loginUserGet);
  app.post("/login", loginUserPost);
  app.get('/logout', logout )


  app.get("/create/accessory", createAccessoryGet);
  app.post("/create/accessory", createAccessoryPost);

  app.get("/attach/accessory/:id", attachGet);
  app.post("/attach/accessory/:id", attachPost);

  app.get("/create",  createCubeGet);
  app.post("/create",  createCubePost);

  app.get('/edit/:id', editCubeGet)
  app.post('/edit/:id', editCubePost)

  app.get('/delete/:id', deleteCubeGet)
  app.post('/delete/:id', deleteCubePost)

  app.get("/details/:id" ,detailsGet);

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
