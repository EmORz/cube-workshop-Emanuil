const {Router} = require('express')
const {checkAuthentcation} = require('../controllers/auth')
const {
    createCubeGet,
    createCubePost,
    detailsGet,
    editCubeGet,
    editCubePost,
    deleteCubeGet,
    deleteCubePost,
     homeGet,
      homePost
  } = require("../controllers/cubes");

const router = Router()

router.get("/", homeGet);
router.post("/", homePost);

router.get("/create", checkAuthentcation, createCubeGet);
router.post("/create",  createCubePost);

router.get('/edit/:id', editCubeGet)
router.post('/edit/:id', editCubePost)

router.get('/delete/:id', deleteCubeGet)
router.post('/delete/:id', deleteCubePost)

router.get("/details/:id" ,detailsGet);

module.exports = router