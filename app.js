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
module.exports=app // as this suggest that tha app.js file/module can be used in the other file also eg cqan be used in server.js file 