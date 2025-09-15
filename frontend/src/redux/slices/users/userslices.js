import {createAsyncThunk, createSlice}  from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../globalSlice/globalSlice";
const INITIAL_STATE ={
    loading: false,
    error : null,
    success: false,
    users: [],
    user: null,
    isUpdated: false,
    isDeleted :false,
    isEmailSent: false,
    isPasswordReset: false,
    profile:{},
    userAuth: {
        error: null,
        userInfo: localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")):null,
    },
};

// login action 
export const loginAction = createAsyncThunk("users/login", 
    async(payload,{rejectWithValue,getState,dispatch}) =>{
        // make request
        try{
            console.log("started");
            const {data}= await axios.post(
                "http://localhost:3000/api/v1/users/login",
                payload
            );
            localStorage.setItem("userinfo",JSON.stringify(data));
            return data;
        }catch (error){
            return rejectWithValue(error?.response?.data);

        }
    });

    // Register action 
export const registerAction = createAsyncThunk("users/register", 
    async(payload,{rejectWithValue,getState,dispatch}) =>{
        // make request
        try{
            console.log("started");
            const {data}= await axios.post(
                "http://localhost:3000/api/v1/users/register",
                payload
            );
            
            return data;
        }catch (error){
            return rejectWithValue(error?.response?.data);

        }
    });
    // !logout action
    export const logoutAction = createAsyncThunk("users/logout",async()=>{
localStorage.removeItem("userinfo");
return true;
    });

    const userSlice = createSlice({
        name: "users",
        initialState:INITIAL_STATE,
        extraReducers:(builder)=>{
            // login
            builder.addCase(loginAction.pending, (state,action)=>{
                console.log("pending");
                state.loading =true;
});
builder.addCase(loginAction.fulfilled, (state,action)=>{
    console.log("fulfilled run")
    state.loading = false;
    state.success = true,
    state.error=null;
    state.userAuth.userInfo= action.payload;
});
builder.addCase(loginAction. rejected, (state,action)=>{
    console.log("rejected");
    state.loading = false;
    state.success = false;
    state.error=action.payload;
   
});

// register
            builder.addCase(registerAction.pending, (state,action)=>{
                console.log("pending");
                state.loading =true;
});
builder.addCase(registerAction.fulfilled, (state,action)=>{
    console.log("fulfilled run")
    state.loading = false;
    state.success = true,
    state.error=null;
    state.user= action.payload;
});
builder.addCase(registerAction.rejected, (state,action)=>{
    console.log("rejected run");
    state.loading = false;
    state.success = false;
    state.error=action.payload;
   
});
// ! reset error action
builder.addCase(resetErrorAction,(state)=>{
    state.error =null;
 });

 //! // ! reset success action
builder.addCase(resetSuccessAction,(state)=>{
    state.success =null;
 });
},
    });
 const usersReducer= userSlice.reducer;
 export default usersReducer;
