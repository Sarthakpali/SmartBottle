const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const {verifyToken} = require('../middleware/verifytoken')

router.post('/v1/login', authController.login);
router.post('/v1/testmw', verifyToken, authController.postTest)

module.exports = router;