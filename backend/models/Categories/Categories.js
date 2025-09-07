const mongoose= require("mongoose");
const categorySchema =new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },

    author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
        shares:{
            type:Number,
            default:0,

        },
        posts :[{
             type: mongoose.Schema.Types.ObjectId,
            ref: "Post",


        }],


   

        
},
{
    timestamps:true , //! isse add krne se  hmre column me do property khud se add ho jaigi create app and upadate app
     toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true,
    },
}

);

// ! convert schema to model 

const Category = mongoose.model("Category", categorySchema);
module.exports= Category ;