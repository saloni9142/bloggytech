//@ description register new user
//@route Post/api/v1/users/register
//@ access public

const User=require("../../models/Users/User");
const bcrypt= require("bcryptjs");

exports.register=async(req,resp)=>{
    
    try{
        const {username,password,email}=req.body;
        const user = await User.findOne({username});
        if(user){
            throw new Error("User already exsisting");

        }
        const newUser= new User({username, email, password});
        const salt= await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password,salt)
        await newUser.save();
        resp.json({
            status: "success",
            message:"User registered successfully",
            _id: newUser?.role,

        });




    }catch(error){
        resp.json({status: "failed", message:error?.message});
         
    }

};

//@desc login new user
//@route post /api/v1/users/login
//@ aceess public

exports.login= async(req, resp)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            throw new Error("invalid credentials");
            
        }

    }catch(error){

    }
};