// for configuring the express and middlewares
// import packages
// create an express app
//configure middlewre
//export the app 
//middlewares are functions that run between the request and response 

const express = require('express')
const app = express()
const cors = require('cors') // imported the middleware package
app.use(cors()) // use the middleware in the app
app.use(express.json()) //to convert the json dta to javascripyt

const auth = require('./route/auth') // import the auth route
const resturant = require('./route/returant') // import the restaurant route
app.use('/api/v1/users',auth) // use the auth route for the /api/v1/auth endpoint
app.use('/api/v1/eats/stores',resturant) // use the restaurant route for the /api/v1/eats/stores endpoint

module.exports=app // as this suggest that tha app.js file/module can be used in the other file also eg cqan be used in server.js file 