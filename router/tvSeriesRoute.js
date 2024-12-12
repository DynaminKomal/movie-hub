const express = require('express');
const { tokenVerify } = require('../utility/token-verify');
const tvSeriesController = require('../controllers/tvSeriesController');
const router = express.Router();

router.use(tokenVerify)

// create a new tv series
router.post('/create', tvSeriesController.createTvSeries);
// update exist series seasons
router.patch('/:id/seasons', tvSeriesController.updateTvSeriesSeaons);
// update exist series
router.patch('/:id/update', tvSeriesController.updateTvSeries);
// delete series
router.delete('/:id', tvSeriesController.deleteTvSeries);
// get all series
router.get('/', tvSeriesController.getAllTvSeries);


module.exports = router

