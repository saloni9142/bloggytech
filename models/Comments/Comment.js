const mongoose= require("mongoose");
const commentSchema =new mongoose.Schema({
    message:{
        type: String,
        required : true,
    },

    author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
        

        
        postId :{
             type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required:true,


        },


   

        
},
{
    timestamps:true  //! isse add krne se  hmre column me do property khud se add ho jaigi create app and upadate app
}

);

// ! convert schema to model 

const Comment = mongoose.model("Comment", commentSchema);
module.exports= Comment ;