const jwt= require("jsonwebtoken");
const User = require("../models/Users/User");
const isLoggedIn= (req, res, next)=>{
    console.log("isLoggedIn executed!");
    // fetch token from request
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token", token);
    // verify token
    jwt.verify(token, "process.env.JWT_KEY", async (err,decoded) =>{
        console.log("verify", err, decoded);
         // if unsuccessful then send the error message
        if(err){
           
                const error= new Error(err?.message);
                next(err);

            
        }else{
              // if successful, then pass the user object to next path
              const userId =decoded?.user?.id;
              const user= await User.findById(userId).select ("username email role_id") ;
              req.userAuth=user;
              next();


        }
    });

   
    
  
    

};
module.exports=isLoggedIn;