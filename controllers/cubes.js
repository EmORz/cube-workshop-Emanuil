const Cube = require("../models/cube");
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
    name: name.trim(),
    description: description.trim(),
    imageURL: imageUrl,
    difficulty: difficultyLevel,
    creatorId: decodedObj.userID,
  });

  try {
    await cube.save();
    res.redirect("/");
  } catch (error) {
    return res.render("create", {
      title: "Create | Cube Workshop",
      isLoggedIn: req.isLoggedIn,
      error: "Cube details are not valid!"
    });
  }
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

const deleteCubePost = async (req, res, next) => {
  const id = req.params.id;

  try {
    const cube = await Cube.findByIdAndDelete({ _id: id })
      .populate("accessories")
      .lean();
    console.log("This is Deleted!Eyap ;)", cube);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const deleteCubeGet = async (req, res, next) => {
  const id = req.params.id;
  const token = req.cookies["aid"];
  const user = jwt.verify(token, secret);

  await Cube.findOne({ _id: id, creatorId: user.userID })
    .then((cube) => {
      const options = [
        { title: "1 - Very Easy", selected: 1 === cube.difficultyLevel },
        { title: "2 - Easy", selected: 2 === cube.difficultyLevel },
        {
          title: "3 - Medium (Standard 3x3)",
          selected: 3 === cube.difficultyLevel,
        },
        { title: "4 - Intermediate", selected: 4 === cube.difficultyLevel },
        { title: "5 - Expert", selected: 5 === cube.difficultyLevel },
        { title: "6 - Hardcore", selected: 6 === cube.difficultyLevel },
      ];
      res.render("deleteCube", {
        cube,
        options,
        user,
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch(next);
};

const editCubeGet = async (req, res, next) => {
  const cubeId = req.params.id;

  const token = req.cookies["aid"];
  const user = jwt.verify(token, secret);

  await Cube.findOne({ _id: cubeId, creatorId: user.userID })
    .then((cube) => {
      console.log(cube);
      const options = [
        { title: "1 - Very Easy", selected: 1 === cube.difficultyLevel },
        { title: "2 - Easy", selected: 2 === cube.difficultyLevel },
        {
          title: "3 - Medium (Standard 3x3)",
          selected: 3 === cube.difficultyLevel,
        },
        { title: "4 - Intermediate", selected: 4 === cube.difficultyLevel },
        { title: "5 - Expert", selected: 5 === cube.difficultyLevel },
        { title: "6 - Hardcore", selected: 6 === cube.difficultyLevel },
      ];
      res.render("editCube", {
        cube,
        options,
        user,
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch(next);
};

const editCubePost = async (req, res, next) => {
  const id = req.params.id;

  const {
    name = null,
    description = null,
    imageUrl = null,
    difficultyLevel = null,
  } = req.body;
  const token = req.cookies["aid"];
  const user = jwt.verify(token, secret);

  try {
    await Cube.updateOne(
      { _id: id, creatorId: user.userID },
      { name, description, imageURL: imageUrl, difficulty: difficultyLevel }
    );
    res.redirect("/");
    next();
  } catch (error) {
    console.log(error);
  }
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
