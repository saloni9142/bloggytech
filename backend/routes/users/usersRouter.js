const express = require("express");
const {register, login,getProfile, blockUser, 
     unblockUser, viewOtherProfile, followingUser,
     unfollowingUser, forgotPassword, resetPassword, 
     accountVerificationEmail, verifyAccount, getPublicProfile}=
require("../../controllers/users/usersControllers"); //curly braces islye ki object ke andr ka function le rhe h ise destructin bolte h
//    ../ se user se bahr nikl gye fr ../ se routes se bhr nikl gye 
const isLoggedIn=require("../../middlewares/isLoggedIn");
const usersRouter= express.Router();
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/profile",isLoggedIn, getProfile);
usersRouter.get("/public-profile/:userId", getPublicProfile);
usersRouter.put("/block/:userIdToBlock", isLoggedIn, blockUser);
usersRouter.put("/unblock/:userIdToUnBlock", isLoggedIn, unblockUser);
usersRouter.get("/view-other-profile/:userProfileId", isLoggedIn, viewOtherProfile);
usersRouter.put("/following/:userIdToFollow", isLoggedIn, followingUser);
usersRouter.put("/unfollowing/:userIdToUnFollow", isLoggedIn, unfollowingUser);
usersRouter.post("/forgot-password", forgotPassword);
usersRouter.put("/reset-password/:resetToken", resetPassword);
usersRouter.put("/account-verification-email", isLoggedIn,accountVerificationEmail);
usersRouter.put("/verify-account/:verifyToken", isLoggedIn, verifyAccount);


module.exports = usersRouter;
