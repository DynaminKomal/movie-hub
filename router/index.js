const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const movieRoute = require('./movieRoute');
const tvSeriesRoute = require('./tvSeriesRoute');

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/movies', movieRoute)
router.use('/tv-series', tvSeriesRoute)



module.exports = router;