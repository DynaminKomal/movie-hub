const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const authValidator = require('../validator/auth-validator')

router.post('/signup', authValidator.signup, authController.signup)
router.post('/login', authValidator.login, authController.login)
router.post('/forget-password', authValidator.forgetPassword, authController.forgetPassword);
router.patch('/reset-password/:token', authValidator.resetPassword, authController.resetPassword);

module.exports = router;
