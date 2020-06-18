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

router.get("/create", getUserStatus, authAccess, createCubeGet);
router.post("/create", createCubePost);

router.get("/edit/:id", authAccess, getUserStatus, editCubeGet);
router.post("/edit/:id", editCubePost);

router.get("/delete/:id", authAccess, getUserStatus, deleteCubeGet);
router.post("/delete/:id", authAccess, getUserStatus,deleteCubePost);

router.get("/details/:id",getUserStatus, detailsGet);

module.exports = router;
