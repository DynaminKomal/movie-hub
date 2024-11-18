const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const { tokenVerify } = require("../utility/token-verify")

router.post('/signup', authController.signup)
router.use(tokenVerify)
router.post('/login', authController.login)

module.exports = router;
