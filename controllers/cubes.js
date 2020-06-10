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
module.exports = {
  getAllCubes,
  getCube,
  updateCube,
  getCubeWithAccessories,
  searchCubes
};
