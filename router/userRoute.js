const express = require('express');
const { tokenVerify } = require('../utility/token-verify');
const userController = require('../controllers/userController')

const router = express.Router();

router.use(tokenVerify)
router.patch('/update-profile', userController.updateUserProfile)



module.exports = router;
