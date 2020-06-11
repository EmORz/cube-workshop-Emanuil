const Cube = require("../models/cube");

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
  });
};

const createCubePost = async (req, res, next) => {
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
};

const detailsGet = async (req, res, next) => {
  const cube = await getCubeWithAccessories(req.params.id);
  res.render("details", {
    title: "Details | Cube Workshop",
    ...cube,
  });
};

const homeGet = async (req, res) => {
  const cubes = await getAllCubes();
  res.render("index", {
    title: "Cube Workshop",
    cubes,
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

module.exports = {
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
