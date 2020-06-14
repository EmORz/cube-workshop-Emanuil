const {Router} = require('express')
const {authAccess, guessAccess, getUserStatus} = require('../controllers/auth')

const {
    registerUserGet,
    loginUserGet,
    loginUserPost,
    regiterUserPost,
    logout
  } = require("../controllers/auth");
const router = Router()

router.get("/register", guessAccess, registerUserGet);
router.post("/register", regiterUserPost);
router.get("/login", guessAccess, loginUserGet);
router.post("/login", loginUserPost);
router.get('/logout', authAccess, logout )

module.exports = router