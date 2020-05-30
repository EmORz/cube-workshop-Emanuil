const fs = require("fs");
const { getCubes } = require("../controllers/database");

const getAllCubes = (callback) => {
  getCubes((cubes) => {
    callback(cubes);
  });
};


module.exports = {
  getAllCubes,
};
