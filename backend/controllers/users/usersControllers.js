const User=require("../../models/Users/User");
const bcrypt= require("bcryptjs");
const generateToken= require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const crypto= require("crypto");
const sendEmail= require("../../utils/sendEmail");
const sendAccountVerificationEmail=require("../../utils/sendAccountVerificationEmail")
//@ description register new user
//@route Post/api/v1/users/register
//@ access public



exports.register=asyncHandler(async(req,resp, next)=>{
    
   
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
            _id: newUser?.id,
            username: newUser?.username,
            email: newUser?.email,
            role: newUser?.role,

        });
    });




    // }catch(error){
    //    next(error);// go to global handler
         
    // }

//@desc login new user
//@route post /api/v1/users/login
//@ aceess public

exports.login= asyncHandler(async(req, resp,next)=>{
   
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            throw new Error("invalid credentials");
            
        }
        let isMatched = await bcrypt.compare(password, user?.password);
        if(!isMatched){

      
        throw new Error("invalid credentials");
          }
          user.lastlogin= new Date();
          await user.save();
        //   save update karta ha create v
        resp.json({status: "success", email:user?.email,_id:user?._id,username:user?.username,role:user?.role,token:generateToken(user),

        });



// go to global handler


        //  resp.json({status: "failed", message:error?.message});
        //  optional chaining


    
});

//@desc profile view
//@route Get/api/v1/users/login
//@ aceess private
exports.getProfile=asyncHandler(async(req,resp,next)=>{
    console.log("Rec:", req.userAuth);
    
        const user= await User.findById(req.userAuth.id).populate({
            path:"posts",
            model:"Post"
        })
        .populate({path:"following",model:"User"})
        .populate({path: "followers",model:"User"})
        .populate({path:"blockedUsers", model:"User"})
        .populate({path:"profileviewrs",model:"User"});
        resp.json({status:"success", message:"Profile fetched",user,

        });
});

// @desc block user
// @route PUT /api/v1/users/block/userIdToBlock
// @access private

exports.blockUser= asyncHandler(async (req, resp,next) =>{

    // ! find the user id to be blocked
     const userIdToBlock = req.params.userIdToBlock;
    //   ! check whether the user is present in db or not
    const userToBlock= await User.findById(userIdToBlock);
    if(!userToBlock){
        let error= new Error("user to block not found");
        next(error);
        return;
    }
    // get the current user id
    const userBlocking= req?.userAuth?._id;

    // ! check if it is self blocking
    if(userIdToBlock.toString()=== userBlocking.toString()){
        let error= new Error("cannoy block yourself");
        next(error);
        return;
    }

    // get the current user object from db

    const currentUser= await User.findById(userBlocking);

    // !check whter the userIdToBlock is already blocked

    if(currentUser.blockedUsers.includes(userIdToBlock)){
         let error= new Error("this user has already been blocked");
        next(error);
        return;
    }

    // push the user to be blocked in the blockedusers array

    currentUser.blockedUsers.push(userIdToBlock);
    await currentUser.save();
    resp.json({
        status: "success",
        message: "user blocked successfully",
    });
});

// @desc unblock user
// @route PUT /api/v1/users/unblock/userIdToUnBlock
// @access private

exports.unblockUser = asyncHandler(async(req,resp,next)=>{
    // find the user to eb blocked
    const userIdToUnBlock =req.params.userIdToUnBlock;
    const userToUnBlock =await User.findById(userIdToUnBlock);
    if(!userToUnBlock){
        let error= new Error("user to unblock not found");
        next(error);
        return;
    }
// find the current user
const userUnBlocking = req?.userAuth?._id;
 const currentUser =await User.findById(userUnBlocking);

//  check if the user to unblock is already blocked
 if(!currentUser.blockedUsers.includes(userIdToUnBlock)){
         let error= new Error("user not blocked");
        next(error);
        return;
    }

// remove the user from the current user blockedUser array
currentUser.blockedUsers= currentUser.blockedUsers.filter((id)=>{
    return id.toString() !== userIdToUnBlock;
});
await currentUser.save();
resp.json({
        status: "success",
        message: "user unblocked successfully",
    });
});

// @desc view another user profile
// @route GET /api/v1/users/view-another-profile/:userProfiled
// @access private

exports.viewOtherProfile= asyncHandler(async(req,resp,next)=>{
    // get the userId whose profile is to be viewed
      const userProfileId =req.params.userProfileId;
    const userProfile =await User.findById(userProfileId);
    if(!userProfile){
        let error= new Error("user whose profile is to be viewed not present!");
        next(error);
        return;
    }
    const currentUserId = req?.userAuth?._id;
    // check if we have already viewed the profile of userProfile
 if(userProfile.profileViewers.includes(currentUserId)){
         let error= new Error("you have alraedy viewed the profile");
        next(error);
        return;
    }

    // push the currentUserId into array of userProfile
    userProfile.profileViewers.push(currentUserId);

    // update the db
    await userProfile.save();
    // return the resp
    resp.json({
        sttaus:"success",
        message:"profile sucessfully viewed",
    });
});

// @desc folow user
// @route PUT /api/v1/users/view-another-profile/:userProfiled
// @access private

exports.followingUser= asyncHandler(async(req, resp, next)=>{
    // find the current user id
    const currentUserId= req?.userAuth?.id;

    // find the user to be followed
    const userIdToFollow =req.params.userIdToFollow;
    const userProfile =await User.findById(userIdToFollow);
    if(!userProfile){
        let error= new Error("user to be followed  not present!");
        next(error);
        return;
    }

    // avoid current user following himself
    if(currentUserId.toString()===userIdToFollow.toString()){
        let error= new Error("you cannot follow yourself");
        next(error);
        return;
    }

    // push the id to userTofollow inside following array of current user
    await User.findByIdAndUpdate(
        currentUserId,{
        $addToSet:{following: userIdToFollow},

    },
    {new:true}
);

    // push the current user id into the//followers array of current userTofollow
     await User.findByIdAndUpdate(
       userIdToFollow,
       {
        $addToSet:{followers:currentUserId},

    },
    {new:true}
);
    // send the response
     resp.json({
        sttaus:"success",
        message:"you have followed the user sucessfully",
    });

});

// @desc unfollow user
// @route PUT /api/v1/users/unfollowing/:userIdToUnfollow
// @access private
exports.unfollowingUser= asyncHandler(async(req, resp, next)=>{
    // find the current user id
    const currentUserId= req?.userAuth?.id;

    // find the user to be followed
    const userIdToUnFollow =req.params.userIdToUnFollow;

    // avoid current user following himself
 if(currentUserId.toString()===userIdToUnFollow.toString()){
        let error= new Error("you cannot unfollow yourself");
        next(error);
        return;
    }
// check whter the user exits
    const userProfile =await User.findById(userIdToUnFollow);
    if(!userProfile){
        let error= new Error("user to be unfollowed  not present!");
        next(error);
        return;
    }

//    get the current user object
const currentUser= await User.findById(currentUserId);

// check whether the current user has followed userIdToUnfollow or not
if(!currentUser.following.includes(userIdToUnFollow)){
    let error= new Error("you cannot unfollow the user you did not follow");
    next(error);
    return;
}
// remove the userIdToUnfollow from the following array
await User.findByIdAndUpdate(
    currentUserId,
    {$pull: {following: userIdToUnFollow}},
    {new:true}

);

// remove the currentUserId from the followers array of userToUnFolllow
await User.findByIdAndUpdate(
    userIdToUnFollow,
    {$pull: {followers: currentUserId}},
    {new:true}

);
 // send the response
     resp.json({
        sttaus:"success",
        message:"you have unfollowed the user sucessfully",
    });
});

// @desc Forgot Password
// @route POST/api/v1/users/forgot-password
// @access public
exports.forgotPassword= asyncHandler(async(req, resp, next)=>{
    // ! fetch the email
    const {email} = req.body;
    //  ! find email in the db
    const userFound = await User.findOne({email});
    if(!userFound){
         let error= new Error("this email id is not registered with us")

    return;

    }
    // ! get the reset token
    const resetToken= await userFound.generatePasswordResetToken();
    // ! save the changes(resetToken and expiryTime) to the db
    await userFound.save();
    //send the response
     resp.json({
        sttaus:"success",
        message:"password reset token sent to your email sucessfully",
    });

});
// @desc reset Password
// @route POST/api/v1/users/reset-password/:resetToken
// @access public
exports.resetPassword= asyncHandler(async(req,resp,next)=>{
    // get the token from params
    const {resetToken} =req.params;
    // get teh password
    const {password}= req.body;

    // convert resettoken into hashed token
    const hashedToken=crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

        // verify teh token with db
    const userFound =  await User.findOne({
            passwordResetToken:hashedToken,
            passwordResetExpires:{$gt: Date.now()},
});
// if user is not found
if(!userFound){
    let error=  new Error("password reset token is inavlid or expired")
    next(error);
    return;

}
// update the new password
const salt = await bcrypt.genSalt(10);
userFound.password= await bcrypt.hash(password, salt);
userFound.passwordResetToken= undefined;
userFound.passwordResetExpires =undefined;
// resave the user
await userFound.save();
//send the response
     resp.json({
        sttaus:"success",
        message:"password changed successsfully ",
    });

});

// @desc send Account verifiaction Mail
// @route PUT/api/v1/users/account-verification-email
// @access private
exports.accountVerificationEmail= asyncHandler(async(req,resp,next)=>{
    // find the current user's email
    const currentUser= await User.findById(req?.userAuth?._id);
    if(!currentUser){
        let error= new Error("user not found!");
        next(error);
        return;
    }
    // get the token from current user object
    const verifyToken= await currentUser.generateAccountVerificationToken();

    // resave the user
    await currentUser.save();
    
    // send the verification email
  await  sendAccountVerificationEmail(currentUser.email, verifyToken);
    //send the response
     resp.json({
        sttaus:"success",
        message:`account verification email has been sent to your registered email id ${currentUser.email}`,
    });


});
// @desc send Account token verifiaction 
// @route PUT/api/v1/users/verify-account/:verifyToken
// @access private
exports.verifyAccount= asyncHandler(async(req,resp,next)=>{
    // get the token from param
    const {verifyToken} = req.params;

    // convert the token into hashed from
    let cryptoToken= crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");
    const userFound= await User.findOne({
        accountVerificationToken: cryptoToken,
        accountVerificationExpires :{$gt:Date.now()},
});
if(!userFound) {
        let error= new Error("Account token inavlid or expired");
        next(error);
        return;
    }
    // update the user
    userFound.isVerified = true;
    userFound.accountVerificationToken= undefined;
    userFound.accountVerificationExpires=undefined;

     // resave the user
    await currentUser.save();
    //send the response
     resp.json({
        sttaus:"success",
        message: "account successfully verified",
    });
   
});
