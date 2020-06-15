const Cube = require("../models/cube");
const { getUserStatus } = require("../controllers/auth");
const jwt = require("jsonwebtoken");
const secret = "shhhhh";

const getAllCubes = async () => {
  const cubes = await Cube.find().lean();
  return cubes;
};

const getCube = async (id) => {
  const cube = await Cube.findById(id).lean();
  return cube;
};

const getCubeWithAccessories = async (id) => {
  const cube = await Cube.findById(id).populate("accessories").lean();
  return cube;
};

const updateCube = async (cubeId, accessoryId) => {
  await Cube.findByIdAndUpdate(cubeId, {
    $addToSet: {
      accessories: [accessoryId],
    },
  });
};

const searchCubes = async (search, from, to) => {
  const onlyStringMatches = await Cube.find({
    $or: [
      {
        name: { $regex: search, $options: "i" },
      },
      {
        description: { $regex: search, $options: "i" },
      },
    ],
  }).lean();

  const fullMatches = await Cube.find({
    $or: [
      {
        name: { $regex: search, $options: "i" },
      },
      {
        description: { $regex: search, $options: "i" },
      },
    ],
    difficulty: { $gte: +from, $lte: +to },
  }).lean();

  if (search && to && from) {
    return fullMatches;
  } else {
    return onlyStringMatches;
  }
};

const createCubeGet = async (req, res, next) => {
  res.render("create", {
    title: "Create | Cube Workshop",
    isLoggedIn: req.isLoggedIn,
  });
};

const createCubePost = async (req, res, next) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  const token = req.cookies["aid"];

  const decodedObj = jwt.verify(token, secret);
  const cube = new Cube({
    name,
    description,
    imageURL: imageUrl,
    difficulty: difficultyLevel,
    creatorId: decodedObj.userID,
  });

  await cube.save((err) => {
    if (err) {
      console.error(err);
      res.redirect("/create");
    } else {
      res.redirect("/");
    }
  });
};

const detailsGet = async (req, res, next) => {
  const cube = await getCubeWithAccessories(req.params.id);

  res.render("details", {
    title: "Details | Cube Workshop",
    ...cube,
    isLoggedIn: req.isLoggedIn,
  });
};

const homeGet = async (req, res) => {
  const cubes = await getAllCubes();
  res.render("index", {
    title: "Cube Workshop",
    cubes,
    isLoggedIn: req.isLoggedIn,
  });
};

const homePost = async (req, res) => {
  const { from, to, search } = req.body;

  const cubes = await searchCubes(search, from, to);

  res.render("index", {
    title: "Cube Workshop | Search Result",
    cubes,
  });
};

const deleteCubePost = (req, res, next) => {
  const id = req.params.id;
  console.log("Ehoooooo :)");

  Cube.deleteOne({ _id: id })
    .then(() => {
      console.log("Ehoooooo :)");
      res.redirect("/");
    })
    .catch(next);
};

const deleteCubeGet = (req, res, next) => {
  const id = req.params.id;
  const token = req.cookies["aid"];
  const user = jwt.verify(token, secret);

  console.log(user);

  const userId = user.userID;

  Cube.findOne({ _id: id, creatorId: userId }).then((cube) => {
    res.render("deleteCube", {
      title: "Delete Cube",
      cube,
      user,
      isLoggedIn: req.isLoggedIn,
    });
  });
};

const editCubeGet = async (req, res, next) => {
  const cubeId = req.params.id;

  const token = req.cookies["aid"];
  const user = jwt.verify(token, secret);

  const userId = user.userID;

  await Cube.findById({ _id: cubeId, creatorId: userId })
    .then((cube) => {
     
      res.render("editCube", {
        title: "Edit Cube",
        cube,
        user,
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch(next);
};

const editCubePost = async (req, res, next) => {
  const id = req.params.id;
  const token = req.cookies["aid"];
  const user = jwt.verify(token, secret);

  const userId = user.userID;
  const creatorId = userId;
  const cube = { ...req.body, id, creatorId };
 

  console.log(creatorId);
  // const token = req.cookies["aid"];
  //const userId = jwt.verify(token, secret).userID;

  // const testUpdate = await Cube.updateOne(
  //   { _id: id, creatorId: userId },
  //   { name, description, imageURL, difficulty, decodedObj }
  // );
  //console.log(testUpdate);

  res.redirect("/");
};

module.exports = {
  deleteCubeGet,
  deleteCubePost,
  editCubeGet,
  editCubePost,
  createCubeGet,
  createCubePost,
  getAllCubes,
  getCube,
  updateCube,
  getCubeWithAccessories,
  searchCubes,
  detailsGet,
  homeGet,
  homePost,
};
