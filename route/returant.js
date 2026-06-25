const express = require('express')
const router = express.Router()
const {getAllResturants,getRestaurant} = require('../controller/resturantcontroller')

router.route("/").get(getAllResturants)
router.route("/:storeId").get(getRestaurant)

module.exports = router