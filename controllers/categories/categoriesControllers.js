const Category= require("../../models/Categories/Categories");
const asyncHandler= require("express-async-handler");
//@ description create new category
//@route Post/api/v1/categories/
//@ access public



exports.createCategory=asyncHandler(async(req,resp, next)=>{
    const {name} = req.body;
    const isCategoryPresent= await Category.findOne({name});
    if(isCategoryPresent){
        throw new Error("Category already existing");
    }
const category=   await Category.create({name: name, author:req?.userAuth?._id});
   resp.json({
    status: "success",
    message :"Category created successfully",
    category,
   });
        
    });

//@ description get all category
//@route get/api/v1/categories/
//@ access public


exports.getAllCategories= asyncHandler (async(req,resp)=>{
    const allCategories =await Category.find({}).populate({
        path:"posts", 
        model:"Post",

    });
    resp.status(201).json({
        status: "success",
        message: "All categories successfully fetched",
        allCategories,
    });

});

//@ description delete single category
//@route delete /api/v1/categories/:id
//@ access private
exports.deleteCategory= asyncHandler (async(req,resp)=>{
    const catId= req.params.id;
    await Category.findByIdAndDelete(catId);
    resp.status(201).json({
        status: "success",
        message: " categories successfully deleted",
        
    });

   
    });

    //@ description update single category
//@route PUT /api/v1/categories/:id
//@ access private
exports.updateCategory= asyncHandler (async(req,resp)=>{
    const catId= req.params.id;
    const name=req.body.name;
  const updatedCategory=  await Category.findByIdAndUpdate(catId,{name:name},{new:true, runValidators: true});
    resp.status(201).json({
        status: "success",
        message: " categories successfully updated",
        updatedCategory,
        
    });

   
    });


