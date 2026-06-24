const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')

// define the routes for authentication
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/', authController.getAllUsers)
module.exports = router