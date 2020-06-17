const { Router } = require("express");
const {
  authAccess,
  guessAccess,
  getUserStatus,
} = require("../controllers/auth");

const {
  registerUserGet,
  loginUserGet,
  loginUserPost,
  regiterUserPost,
  logout,
} = require("../controllers/auth");
const router = Router();

router.get("/register",getUserStatus, registerUserGet);
router.post("/register", async (req, res) => {

  const {password } = req.body;

  if(!password ||password.length<3){
    return res.redirect('/register?error=true')
  }
  const register = await regiterUserPost(req, res);

  if (register) {
    res.redirect("/register?error=true");
  }

});
router.get("/login", getUserStatus, loginUserGet);
router.post("/login", async (req, res) =>{
  const {error} = await loginUserPost(req, res)

  
  if(error){
    return res.redirect('/login?error=true')
  }

  res.redirect('/')
});
router.get("/logout", authAccess, logout);

module.exports = router;
