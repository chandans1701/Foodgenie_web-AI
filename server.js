// st the server 
const app = require('./app');// import the app from app.js file
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'}) // loaded the environment variables 

//start the server 
PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log(`server started on PORT: ${PORT}`)
});