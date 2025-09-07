const jwt = require("jsonwebtoken");
const generateToken = (user)=>{
    const payLoad={
        user:{
            id: user._id,

        },

    };
    const token= jwt.sign(payLoad,"process.env.JWT_KEY",{expiresIn: "1h"});
console.log("token", token);
    return token; 
    
};
module.exports=generateToken;
