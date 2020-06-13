const { Router } = require("express");

const {
  createAccessoryGet,
  createAccessoryPost,
  attachGet,
  attachPost,
} = require("../controllers/accessory");

const router = Router();

router.get("/create/accessory", createAccessoryGet);
router.post("/create/accessory", createAccessoryPost);

router.get("/attach/accessory/:id", attachGet);
router.post("/attach/accessory/:id", attachPost);

module.exports = router;
