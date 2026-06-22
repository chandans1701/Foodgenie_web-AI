const express = require('express')
const router = express.Router()
const {getAllResturants} = require('../controller/resturantcontroller')

router.route("/").get(getAllResturants)

module.exports = router