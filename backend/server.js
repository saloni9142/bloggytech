const express= require("express");
const cors=require("cors");
const dotenv= require("dotenv");
const usersRouter = require("./routes/users/usersRouter");
const connectDB = require("./config/database");
const { notFound, globalErrorHandler } = require("./middlewares/globalErrorHandler");
const categoriesRouter = require("./routes/category/categoryRouter");
const postsRouter= require("./routes/posts/postsRouter");
const commentRouter= require("./routes/comments/commentRouter");
const sendEmail = require("./utils/sendEmail");


// create an express app
// sendEmail("kumarisaloni762@gmail.com", "HelloWelcome123");
const app = express();


//! load the environment variable
dotenv.config();
// ! establish connecction to mongodb
connectDB();

// ! set up the midleware

app.use(express.json());

// cors middleware
app.use(cors());
 

//! setup the user router
app.use("/api/v1/users", usersRouter); // as a middleware

//! setup the category router
app.use("/api/v1/categories", categoriesRouter);

//! setup the category router
app.use("/api/v1/posts", postsRouter);

//! setup the comment router
app.use("/api/v1/comments", commentRouter);


//  not found error handler
app.use(notFound);

//  set up the global error handler
app.use(globalErrorHandler);




//! const PORT = 3000;  //this is not correct way that we use  for senstitive data in env file
const PORT = process.env.PORT || 9080;

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);

}) ;