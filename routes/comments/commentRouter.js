const express = require("express");
const {createComment, deleteComment,updateComment} =require("../../controllers/comments/commentsControllers");
const isLoggedIn= require("../../middlewares/isLoggedIn");

const commentRouter= express.Router();

// create comment route
commentRouter.post("/:postId", isLoggedIn,createComment);

// create delete route
commentRouter.delete("/:commentId", isLoggedIn,deleteComment);

// create update route
commentRouter.put("/:commentId", isLoggedIn,updateComment);
module.exports= commentRouter;
