import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userslices";
import postsReducer  from "../slices/posts/postSlice";
import categoriesReducer from "../slices/Categories/categoriesSlices";

//!Store
const store = configureStore({
    reducer:{
        users: usersReducer,
        categories: categoriesReducer,
        posts: postsReducer,
    },
    // devTools:true
});
export default store;