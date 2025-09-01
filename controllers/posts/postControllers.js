const asyncHandler= require("express-async-handler");
const Post = require("../../models/Posts/Post");
const User = require("../../models/Users/User");
const Category = require("../../models/Categories/Categories");



  //@desc create a new post
  //@route POST /api/v1/posts
  //@access private


  exports.createPost = asyncHandler(async(req, resp, next)=>{
//get the payload
const {title,content,categoryId} = req.body;


 //check if the post is present
 const postFound= await Post.findOne({title});
 if(postFound){
    let error=  new Error("Post already existing");
    next(error);
    return;
 }

//  create post object
  const post= await Post.create({
    title, content, category:categoryId,author: req?.userAuth?._id, 
    image:req.file.path,

  });

  // update category by adding post in it
  const catg=await Category.findByIdAndUpdate(
    categoryId,
    {$push: {posts: post._id}},
    {new :true}

  );
  // send the response
  resp.json({
    sttaus:"success",
    message: "Post successfully created",
    post,
    User,
    catg,
  });
console.log("file uploaded:",req.file);
resp.send("done");

  

  });

  //@desc get all posts
  //@route GET /api/v1/posts
  //@access private

  exports.getAllPosts = asyncHandler(async(req, resp)=>{
    // get the current user
    const currentUserId = req.userAuth._id;

    // get the current time
    const currentDateTime= new Date();

    // get all those suers who have blocked the current user
    const userBlockingCurrentUser= await User.find({
      blockedUsers: currentUserId,
 });

//  extract the id of the users who blocked the current user
 const blockingUsersIds= userBlockingCurrentUser.map((userObj)=>userObj._id);

 const query ={
  author: {$nin: blockingUsersIds},
  $or:[
    {
      scheduledPublished: {$lte: currentDateTime},
      scheduledPublished: null,
    },
  ],
 };

  //  fetch those posts whose  author is not blockingUsersIds
  const allPosts= await Post.find(query).populate({
   path: "author",
   model:"User",
   select:"email username role",
  });
    
    // send the response
    resp.json({
      status: "success",
      message :"All posts successfully fetched",
      allPosts,

    });
  });


  //@desc get single posts
  //@route GET /api/v1/posts
  //@access public

  exports.getPost = asyncHandler(async(req, resp)=>{
    // get the id

    const postId= req.params.id
    // fetch the post corresponding to this id

    const post = await Post.findById(postId);
    if(post){
    resp.json({
      status: "success",
      message :" Posts successfully fetched",
      post,

    });
    }else{
      resp.json({
      status: "success",
      message: " No Post avaiable for given id",
      post,
      });
    }
  });

  //@desc delete posts
  //@route Delete /api/v1/posts
  //@access private

  exports.deletePost = asyncHandler(async(req, resp)=>{
    // get the id
    const postId=req.params.id;

    // delete the posts from the db
const deletePost= await Post.findByIdAndDelete(postId)

  //  send the response
    resp.json({
      status: "success",
      message :" posts successfully deleted",
     

    });
  });

    //@desc delete posts
  //@route Delete /api/v1/posts/:id
  //@access private

  exports.deletePost = asyncHandler(async(req, resp)=>{
    // get the id
    const postId=req.params.id;

    // delete the posts from the db
 await Post.findByIdAndDelete(postId)

  //  send the response
    resp.json({
      status: "success",
      message :" posts successfully deleted",
     

    });
  });

  //@desc update posts
  //@route PUT /api/v1/posts/:id
  //@access private

  exports.updatePost = asyncHandler(async(req, resp)=>{
    // get the id
    const postId=req.params.id;

    // get the post object from req
    const post= req.body;

    // update this posts in the db

const updatedPost= await Post.findByIdAndUpdate(postId, post, {new:true, runValidators:true});

  //  send the response
    resp.json({
      status: "success",
      message :" post successfully updated",
      updatedPost,

    });
  });

  //@desc like a posts
  //@route PUT /api/v1/posts/like/:postId
  //@access private
  exports.likePost= asyncHandler(async(req,resp,next)=>{
    // get the id of the post
    const {postId} = req.params;
    // get the current user
    const currentUserId= req.userAuth._id;
    // search the post
    const post= await Post.findById(postId);
    if(!post){
      let error = new Error("Post not found");
      next(error);
      return;
    }
    // add the currentUserId to likes array
    await Post.findByIdAndUpdate(postId,{$addToSet:{likes:currentUserId}},{new:true});
    
    // remove the currentUserId to dislikes array
    post.dislikes= post.dislikes.filter(
      (userId)=> userId.toString() !== currentUserId.toString()

    );
    // resvae the post
    await post.save();

     //  send the response
    resp.json({
      status: "success",
      message :" posts liked successfully",
      
     

    });
  });

  //@desc dislike a posts
  //@route PUT /api/v1/posts/dislike/:postId
  //@access private
  exports.dislikesPost= asyncHandler(async(req,resp,next)=>{
    // get the id of the post
    const {postId} = req.params;
    // get the current user
    const currentUserId= req.userAuth._id;
    // search the post
    const post= await Post.findById(postId);
    if(!post){
      let error = new Error("Post not found");
      next(error);
      return;
    }
    // add the currentUserId to likes array
    await Post.findByIdAndUpdate(postId,{$addToSet:{dislikes:currentUserId}},{new:true});
    
    // remove the currentUserId to likes array
    post.likes= post.likes.filter(
      (userId)=> userId.toString() !== currentUserId.toString()

    );
    // resave the post
    await post.save();

     //  send the response
    resp.json({
      status: "success",
      message :" posts disliked successfully",
      
     

    });
  });

  //@descClap  a posts
  //@route PUT /api/v1/posts/claps/:postId
  //@access private

  exports.clapPost= asyncHandler(async(req,resp,next)=>{

    // get the id of the post
    const {postId} = req.params;
    // search the post
    const post= await Post.findById(postId);
    if(!post){
      let error = new Error("Post not found");
      next(error);
      return;
    }
    // implement claps
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $inc: {claps:1},
      },
      {new :true}

    );
     //  send the response
    resp.json({
      status: "success",
      message :" posts claped successfully",
      updatedPost,
       });
  });

  //@desc Schedule a posts
  //@route PUT /api/v1/posts/schedule/:postId
  //@access private

  exports.schedulePost= asyncHandler(async(req,resp,next)=>{
    // get the data
    const {postId} = req.params;
    const {scheduledPublish} = req.body;
    // check if postId and scheduledPublish are present
    if(!postId || !scheduledPublish){
      let error = new Error ("PostId and Scheduled Date are required");
      next(error);
      return;
    }
    // find the post form db
    const post= await Post.findById(postId);
    if(!post){
      let error = new Error("Post not found");
      next(error);
      return;
    }
    // /check if the currentuser is the author
    if(post.author.toString()!== req.userAuth._id.toString()){
      let error = new Error("you can scheduled only your post");
      next(error);
      return;
    }
    const scheduleDate = new Date(scheduledPublish);
    const currentDate = new Date();
    if(scheduleDate< currentDate){
      let error= new Error("Scheduled date cannot be previous date");
      next(error);
      return;
    }
    post.scheduledPublished = scheduleDate;
    await post.save();
     //  send the response
    resp.json({
      status: "success",
      message :" posts scheduled successfully",
      post,
       });



  });

