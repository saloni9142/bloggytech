import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userslices";
import postsReducer  from "../slices/posts/postSlice";
import categoriesReducer from "../slices/Categories/categoriesSlices";
import commentReducer from "../slices/comments/commentSlice";

//!Store
const store = configureStore({
    reducer:{
        users: usersReducer,
        categories: categoriesReducer,
        posts: postsReducer,
        comments:commentReducer,
    },
    // devTools:true
});
export default store;