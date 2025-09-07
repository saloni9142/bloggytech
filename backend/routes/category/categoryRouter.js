const express = require("express");
const {createCategory,getAllCategories, deleteCategory, updateCategory}= require("../../controllers/categories/categoriesControllers");
const categoriesRouter= express.Router()
const isLoggedIn = require("../../middlewares/isLoggedIn");
//!create category Route

categoriesRouter.post("/", isLoggedIn, createCategory);

//!fetch all category Route
categoriesRouter.get("/", getAllCategories);

//!delete a category Route
categoriesRouter.delete("/:id", isLoggedIn, deleteCategory);

//!update a category Route
categoriesRouter.put("/:id", isLoggedIn,  updateCategory);


module.exports= categoriesRouter;
