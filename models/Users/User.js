const mongoose= require("mongoose");
const UserSchema =new mongoose.Schema({
    username:{
        type: String,
        required : true,
    },
    email: {
        type: String,
        required:true,  //! it sis necessary to enter email
        },

        role:{
            type: String,
            required : true,
            enum :["user", "admin"], //!only two option to registration
            default: "user",
        },
        password:{
            type: String,
            required: true,
       },
       lastlogin:{
        type :Date,
        default :Date.now(),
       },
       isVerified:{
        type: Boolean,
        default :false,
       },
       accountLevel:{
        type: String,
        enum :["bronze", "silver" ,"gold"],
        default: "bronze"
       },
       profilePicture:{
        type: String,
        default: ""
       },
        coverImage:{
        type: String,
        default: ""
       },
       bio:{
        type:String
       },
       location:{
        type:String,
       },
       notificationType:{
        email: {type: String},
        //! in future we can also improve email via otp ,sms ,call
       },
        gender:{
            type:String,
            enum:["male","female", "prefer not to say","non-binary"]
        },


        //other properties will deal with relationship

        profileViewers:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
        followers:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
        following:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
        blockedUsers:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
        posts:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}],
       likedPosts:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}],
       passwordResetToken:{
        type: String,

       },
       passwordResetExpires:{
        type:Date,
       },


},
{
    timestamps:true  //! isse add krne se  hmre column me do property khud se add ho jaigi create app and upadate app
}

);

// ! convert schema to model 

const User = mongoose.model("User", UserSchema);
module.exports= User;