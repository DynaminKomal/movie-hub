const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const authValidator = require('../validator/auth-validator')

router.post('/signup', authValidator.signup, authController.signup)
router.post('/login', authValidator.login, authController.login)
router.post('/forget-password', authValidator.forgetPassword, authController.forgetPassword);
router.patch('/reset-password/', authValidator.resetPassword, authController.resetPassword);
router.post('/verify-token', authValidator.verifyResetToken, authController.verifyResetToken);

module.exports = router;
