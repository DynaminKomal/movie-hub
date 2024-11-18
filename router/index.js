const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const movieRoute = require('./movieRoute');

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/movies', movieRoute)



module.exports = router;