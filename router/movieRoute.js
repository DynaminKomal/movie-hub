const express = require('express');
const { createMovie, getAllMovies , getBannerMovies, getTrendingMovie} = require('../controllers/movieController');
const { tokenVerify } = require('../utility/token-verify');
const router = express.Router();

router.use(tokenVerify)

router.post('/create', createMovie)
router.get('/', getAllMovies)
router.get('/movieBanner', getBannerMovies)
router.get('/trending', getTrendingMovie)



module.exports = router;
