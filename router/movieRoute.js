const express = require('express');
const { createMovie, getAllMovies , getBannerMovies} = require('../controllers/movieController');
const { tokenVerify } = require('../utility/token-verify');
const router = express.Router();

router.use(tokenVerify)

router.post('/create', createMovie)
router.get('/', getAllMovies)
router.get('/movieBanner', getBannerMovies)



module.exports = router;
