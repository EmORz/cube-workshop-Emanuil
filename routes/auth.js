const {Router} = require('express')
const {
    registerUserGet,
    loginUserGet,
    loginUserPost,
    regiterUserPost,
    logout
  } = require("../controllers/auth");
const router = Router()

router.get("/register", registerUserGet);
router.post("/register", regiterUserPost);
router.get("/login", loginUserGet);
router.post("/login", loginUserPost);
router.get('/logout', logout )

module.exports = router