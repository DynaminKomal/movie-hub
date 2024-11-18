const express = require('express');
const { createMovie, getAllMovies } = require('../controllers/movieController');
const router = express.Router();

router.post('/create', createMovie)
router.get('/', getAllMovies)


module.exports = router;
