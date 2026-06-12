const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// define the routes for authentication
router.post('/signup', authController.signup)
