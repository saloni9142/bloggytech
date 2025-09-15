import {createAsyncThunk, createSlice}  from "@reduxjs/toolkit";
import axios from "axios";
import {resetErrorAction, resetSuccessAction} from "../globalSlice/globalSlice"
const INITIAL_STATE ={
    loading: false,
    error : null,
    success: false,
    posts: [],
    post: null,
    };
    // fetch Public Post action 
export const fetchPublicPostAction = createAsyncThunk("posts/fetch-public-post", 
    async(payload,{rejectWithValue,getState,dispatch}) =>{
        // make request
        try{
            console.log("started");
            const {data}= await axios.get(
                "http://localhost:3000/api/v1/posts/public"
               
            );
           
            return data;
        }catch (error){
            return rejectWithValue(error?.response?.data);

        }
    });

    // create post action
export const addPostAction = createAsyncThunk("posts/create", 
    async(payload,{rejectWithValue,getState,dispatch}) =>{
        // make request
        try{

            // convert payload to form data
            const formData = new FormData();
            formData.append("title", payload?.title);
            formData.append("file", payload?.image);
            formData.append("categoryId", payload?.category);
            formData.append("content", payload?.content);
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config ={
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
            const {data}= await axios.post(
                "http://localhost:3000/api/v1/posts",
              formData,
              config
            );
            
            return data;
        }catch (error){
            return rejectWithValue(error?.response?.data);

        }
    });
    // !Posts Slice

     const postSlice = createSlice({
        name: "posts",
        initialState:INITIAL_STATE,
        extraReducers:(builder)=>{
            // fetch public post
            builder.addCase(fetchPublicPostAction.pending, (state,action)=>{
                console.log("pending run");
                state.loading =true;
});
builder.addCase(fetchPublicPostAction.fulfilled, (state,action)=>{
    console.log("fulfilled run")
    state.loading = false;
    state.success = true,
    state.error=null;
    state.posts= action.payload;
});
builder.addCase(fetchPublicPostAction.rejected, (state,action)=>{
    console.log("rejected");
    state.loading = false;
    state.success = false;
    state.error=action.payload;
   
});

// create post
            builder.addCase(addPostAction.pending, (state,action)=>{
                console.log(" add post pending");
                state.loading =true;
});
builder.addCase(addPostAction.fulfilled, (state,action)=>{
    console.log("add post fulfilled run")
    state.loading = false;
    state.success = true,
    state.error=null;
    state.post= action.payload;
});
builder.addCase(addPostAction.rejected, (state,action)=>{
    console.log(" add post rejected run");
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
    state.success =false;
 });
},
    });
    // genearte reducer
 const postsReducer= postSlice.reducer;
 export default postsReducer;

