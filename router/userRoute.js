const express = require('express');
const { tokenVerify } = require('../utility/token-verify');
const userController = require('../controllers/userController')
const userValidator = require('../validator/user-validator')

const router = express.Router();

router.use(tokenVerify)
router.patch('/update-profile', userValidator.updateProfile, userController.updateUserProfile)
router.get('/search-query', userValidator.serachQuery, userController.serachQuery)



module.exports = router;
