const express = require('express')
const { tokenVerify } = require('../utility/token-verify');
const actorController = require('../controllers/actorController')

const router = express.Router()

router.use(tokenVerify)

router.post('/create', actorController.createActor)
router.patch('/:id/update', actorController.updateActor)


module.exports = router