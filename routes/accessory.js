const { Router } = require("express");
const {authAccess,getUserStatus} = require('../controllers/auth')

const {
  createAccessoryGet,
  createAccessoryPost,
  attachGet,
  attachPost,
} = require("../controllers/accessory");

const router = Router();

router.get("/create/accessory",authAccess, getUserStatus, createAccessoryGet);
router.post("/create/accessory", createAccessoryPost);

router.get("/attach/accessory/:id", authAccess,getUserStatus, attachGet);
router.post("/attach/accessory/:id", attachPost);

module.exports = router;
