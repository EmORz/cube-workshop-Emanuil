const { Router } = require("express");
const { authAccess, getUserStatus } = require("../controllers/auth");
const {
  createCubeGet,
  createCubePost,
  detailsGet,
  editCubeGet,
  editCubePost,
  deleteCubeGet,
  deleteCubePost,
} = require("../controllers/cubes");

const router = Router();

router.get("/create", authAccess, createCubeGet);
router.post("/create", createCubePost);

router.get("/edit/:id", authAccess, editCubeGet);
router.post("/edit/:id", editCubePost);

router.get("/delete/:id", authAccess, deleteCubeGet);
router.post("/delete/:id", deleteCubePost);

router.get("/details/:id", detailsGet);

module.exports = router;
