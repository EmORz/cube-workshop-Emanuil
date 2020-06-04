const { accessoryModel, cubeModel } = require("../models");

function createPost(req, res, next) {
  const { name = null, description = null, imageUrl = null } = req.body;

  accessoryModel
    .create({ name, description, imageUrl })
    .then((created) => {
      res.redirect("/");
    })
    .catch(next);
}

function createGet(req, res, nex) {
  res.render("createAccessory");
}
function attachPost(req, res, next) {
  const { accessory: accessoryId } = req.body;
  const { id } = req.params;

  Promise.all([
    cubeModel.update({ _id: id }, { $push: { accessories: accessory } }),
    accessoryModel.update(
      { _id: accessoryId },
      { $push: { cubes: { cubes: id } } }
    ),
  ]).then(()=> {

    res.redirect('/')
  }).catch(next);
}

function attachGet(req, res, next) {
  const { id: cubeId } = req.params;

  cubeModel
    .findById(cubeId)
    .then((cube) => {
      Promise.all(
        cube,
        accessoryModel.find({ cubes: { $nin: cube.accessories } })
      );
    })
    .then(([cube, filterAccessories]) => {
      res.render("attechAccessory", {
        cube,
        accessories: filterAccessories.length > 0 ? filterAccessories : null,
      });
    })
    .catch(next);
}

module.exports = {
  createPost,
  createGet,
  attachPost,
  attachGet,
};
