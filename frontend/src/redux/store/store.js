import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userslices";

//!Store
const store = configureStore({
    reducer:{
        users: usersReducer,
    },
    // devTools:true
});
export default store;