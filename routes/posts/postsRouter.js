const express = require("express");
const multer = require("multer");
const storage=require("../../utils/fileUpload");
const {createPost,getAllPosts,getPost, updatePost,  deletePost, likePost, dislikesPost, clapPost, schedulePost} =require("../../controllers/posts/postControllers");
const isLoggedIn= require("../../middlewares/isLoggedIn");
const isAccountVerified = require("../../middlewares/isAccountVerified");
const postsRouter= express.Router();
const upload= multer({storage});

// ? create POST route
postsRouter.post("/", isLoggedIn,upload.single("file"), createPost);

// ? get all POSTs route
postsRouter.get("/", isLoggedIn, getAllPosts);

// ? get a single POST route
postsRouter.get("/:id",  getPost);

// ?delete POST route
postsRouter.delete("/:id", isLoggedIn,  deletePost);

// ? update POST route
postsRouter.put("/:id", isLoggedIn,  updatePost);

// like a post
postsRouter.put("/like/:postId", isLoggedIn,  likePost);
// dislike a post
postsRouter.put("/dislike/:postId", isLoggedIn,  dislikesPost);
// clap a post
postsRouter.put("/claps/:postId", isLoggedIn,  clapPost);

// Scheduled a post
postsRouter.put("/schedule/:postId", isLoggedIn,  schedulePost);


module.exports = postsRouter;