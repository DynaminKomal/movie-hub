const express = require('express');
const { createMovie, getAllMovies , getBannerMovies} = require('../controllers/movieController');
const router = express.Router();

router.post('/create', createMovie)
router.get('/', getAllMovies)
router.get('/movieBanner', getBannerMovies)



module.exports = router;
