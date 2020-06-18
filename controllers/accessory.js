const Accessory = require("../models/accessory");
const { getCube, updateCube } = require("../controllers/cubes");

const getAccessories = async () => {
  const accessories = await Accessory.find().lean();
  return accessories;
};

const createAccessoryGet = async (req, res, next) => {
  res.render("createAccessory", {
    title: "Create Accessory",
    isLoggedIn: req.isLoggedIn,
  });
};

const createAccessoryPost = async (req, res, next) => {
  const { name, description, imageUrl } = req.body;
  const accessory = new Accessory({
    name,
    description,
    imageUrl,
  });

  try {
    await accessory.save();
    res.redirect("/");
  } catch (error) {
    res.render("createAccessory", {
      title: "Create Accessory",
      isLoggedIn: req.isLoggedIn,
      error: "Accessory details are not valid!"
    });
  }
};

const attachGet = async (req, res) => {
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
    isLoggedIn: req.isLoggedIn,
  });
};

const attachPost = async (req, res, next) => {
  const { accessory } = req.body;
  await updateCube(req.params.id, accessory);

  res.redirect(`/details/${req.params.id}`);
};

module.exports = {
  getAccessories,
  createAccessoryGet,
  createAccessoryPost,
  attachGet,
  attachPost,
};
