const express = require('express');
const movieController = require('../controllers/movieController');
const { tokenVerify } = require('../utility/token-verify');
const router = express.Router();

router.use(tokenVerify)

router.post('/create', movieController.createMovie)
router.post('/upcoming-movies/create', movieController.createMovie)
router.get('/', movieController.getAllMovies)
router.get('/movieBanner', movieController.getBannerMovies)
router.get('/trending', movieController.getTrendingMovie)
router.get('/upcoming-movies', movieController.getUpcomingMovie)



module.exports = router;
