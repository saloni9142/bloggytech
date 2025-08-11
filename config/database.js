const mongoose=require("mongoose");
const connectDB=  async()=>{
    try{
      await  mongoose.connect("mongodb://localhost:27017/bloggytech"); 
    console.log("connection to mongodb successful");
    }catch(error){
        console.log("connection to mongoDB failed:", error.message)

    }
};
module.exports=connectDB;