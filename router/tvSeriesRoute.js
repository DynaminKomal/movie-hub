const express = require('express');
const { tokenVerify } = require('../utility/token-verify');
const tvSeriesController = require('../controllers/tvSeriesController');
const router = express.Router();

router.use(tokenVerify)

router.post('/create', tvSeriesController.createTvSeries); // create a new tv series
router.patch('/:id/seasons', tvSeriesController.updateTvSeries); // update exist series
router.get('/', tvSeriesController.getAllTvSeries);


module.exports = router