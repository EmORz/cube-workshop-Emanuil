const { Router } = require("express");
const {getUserStatus} = require('../controllers/auth')
const {homeGet, homePost} = require('../controllers/cubes')





const router = Router();


router.get("/",  homeGet)
router.post("/", homePost);


router.get("/about", (req, res) => {
  res.render("about", {
    title: "About | Cube Workshop",
  });
});

module.exports = router;
