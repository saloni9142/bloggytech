const express = require("express");
const {register}=require("../../controllers/users/usersControllers"); //curly braces islye ki object ke andr ka function le rhe h ise destructin bolte h
//    ../ se user se bahr nikl gye fr ../ se routes se bhr nikl gye 
const usersRouter= express.Router();
usersRouter.post("/api/v1/users/register", register);

module.exports = usersRouter;
