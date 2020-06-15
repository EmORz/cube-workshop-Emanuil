const { Router } = require("express");
const {getUserStatus} = require('../controllers/auth')
const {homeGet, homePost} = require('../controllers/cubes')





const router = Router();


router.get("/",getUserStatus,  homeGet)
router.post("/", getUserStatus, homePost);


router.get("/about",getUserStatus, (req, res) => {
  res.render("about", {
    title: "About | Cube Workshop",
    isLoggedIn: req.isLoggedIn
  });
});

module.exports = router;
