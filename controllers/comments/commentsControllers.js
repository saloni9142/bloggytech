const asyncHandler= require("express-async-handler");
const Post = require("../../models/Posts/Post");
const Comment = require("../../models/Comments/Comment");


//@desc create new comments
  //@route POST /api/v1/comments/:postid
  //@access private
exports.createComment = asyncHandler(async (req, resp)=>{
    // get the payload

    const {message}= req.body;

    // get the post id
    const postId = req.params.postId;

    // create the comment
    const comment =await Comment.create({
        message,
        author: req?.userAuth?.id,
        postId,
    });
   
    //  associate comment with post
    const post = await Post.findByIdAndUpdate(
        postId,
        {
            $push: {comments: comment._id},
        },
        {new :true}
    );
    resp
    .status(201)
    .json({
        status: "success",
        message : "Comment succcessfully created!",
        comment,
    })

      });

      //@desc delete  comments
  //@route DELETE /api/v1/comments/:commentid
  //@access private
exports.deleteComment = asyncHandler(async (req, resp)=>{

    // !get the comment id to be deleted
    const commentid = req.params.commentid;
    await Comment.findByIdAndDelete(commentid);
    resp
    .status(201)
    .json({
        status: "success",
        message : "Comment succcessfully deleted!",
       
    })
});
 //@desc update   comments
  //@route PUT /api/v1/comments/:commentid
  //@access private
exports.updateComment = asyncHandler(async (req, resp)=>{

    // !get the comment id to be updated
    const commentid = req.params.commentid;

    // get the message

    const message= req.body.message;

   const updateComment= await Comment.findByIdAndUpdate(commentid,{message},{new:true,runValidators:true});
    resp
    .status(201)
    .json({
        status: "success",
        message : "Comment succcessfully updated!",
        updateComment,
        
       
    })
});

