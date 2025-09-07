const mongoose= require("mongoose");
const postSchema =new mongoose.Schema({
    title:{
        type: String,
        required : true,
    },
    image: {
        type: String,
      required:true, 
        },

        claps:{
            type: Number,
            default:0,
        },
        content:{
            type: String,
            required: true,
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            reuired:true,
        },
        shares:{
            type: Number,
            default: 0,
        },
        postViews:{
            type: Number,
            default: 0,
        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Category",
            required: true,
        },
        scheduledPublished:{
            type: Date,
            default: null,
        },
        likes:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
             
        },
    ],
    dislikes:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
             
        },
    ],

    comments:[{
        type: mongoose.Schema.Types.ObjectId,
            ref:"Comment",

    },
],


        
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

const Post = mongoose.model("Post", postSchema);
module.exports= Post;