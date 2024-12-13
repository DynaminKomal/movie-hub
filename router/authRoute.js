const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const authValidator = require('../validator/auth-validator')

router.post('/signup', authController.signup)
router.post('/login', authValidator.login, authController.login)
router.post('/forget-password', authController.checkExits, authController.forgetPassWord);
router.patch('/reset-password/:token', authController.resetPassword);

module.exports = router;
