// st the server 
const app = require('./app');// import the app from app.js file
const connectdatabase = require('./config/database'); // import the database connection function from database.js file
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'}) // loaded the environment variables 
// connect to the database
connectdatabase();
//start the server 
PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log(`server started on PORT: ${PORT}`)
});