const express = require('express');
const { tokenVerify } = require('../utility/token-verify');
const tvSeriesController = require('../controllers/tvSeriesController');
const router = express.Router();

router.use(tokenVerify)

router.post('/create', tvSeriesController.createTvSeries)


module.exports = router