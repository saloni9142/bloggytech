const express= require("express");
const dotenv= require("dotenv");
const usersRouter = require("./routes/users/usersRouter");


// create an express app
const app = express();


//! load the environment variable
dotenv.config();

//? setup the router
app.use("/", usersRouter); // as a middleware

//! const PORT = 3000;  //this is not correct way that we use  for senstitive data in env file
const PORT = process.env.PORT || 9080;

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);

}) ;