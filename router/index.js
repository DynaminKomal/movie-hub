const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const movieRoute = require('./movieRoute');
const tvSeriesRoute = require('./tvSeriesRoute');  
const actorRoute = require('./actorRoute');  

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/movies', movieRoute)
router.use('/tv-series', tvSeriesRoute)
router.use('/actor', actorRoute)



module.exports = router;