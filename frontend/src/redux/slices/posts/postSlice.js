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

     // fetch single Post action 
export const getPostAction = createAsyncThunk("posts/get-post", 
    async(postId,{rejectWithValue,getState,dispatch}) =>{
        // make request
        try{
            console.log("started comm");
            const {data}= await axios.get(
                `http://localhost:3000/api/v1/posts/${postId}`
               
            );
           
            return data;
        }catch (error){
            return rejectWithValue(error?.response?.data);

        }
    });

    
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

    
    // fetch Private Post action 
export const fetchPrivatePostAction = createAsyncThunk("posts/fetch-private-post", 
    async(payload,{rejectWithValue,getState,dispatch}) =>{
        // make request
        try{
            console.log("started");
             const token = getState()?.users?.userAuth?.userInfo?.token;
            const config ={
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
            const {data}= await axios.get(
                "http://localhost:3000/api/v1/posts",
                config
               
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

     // delete post action
export const deletePostAction = createAsyncThunk("posts/delete-post", 
    async(postId,{rejectWithValue,getState,dispatch}) =>{
        // make request
        try{

           
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config ={
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
            const {data}= await axios.delete(
                `http://localhost:3000/api/v1/posts/${postId}`,
              
              config
            );
            
            return data;
        }catch (error){
            return rejectWithValue(error?.response?.data);

        }
    });

     // update post action
export const updatePostAction = createAsyncThunk("posts/update", 
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
            const {data}= await axios.put(
                `http://localhost:3000/api/v1/posts/${payload?.postId}`,
              formData,
              config
            );
            
            return data;
        }catch (error){
            return rejectWithValue(error?.response?.data);

        }
    });

     // Like Post  
export const likePostAction = createAsyncThunk("posts/like", 
    async(postId,{rejectWithValue,getState,dispatch}) =>{
        // make request
        try{
            console.log("started comm");
             const token = getState()?.users?.userAuth?.userInfo?.token;
            const config ={
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data}= await axios.put(
                `http://localhost:3000/api/v1/posts/like/${postId}`,
                {},
                config
               
            );
           
            return data;
        }catch (error){
            return rejectWithValue(error?.response?.data);

        }
    });

     // disLike Post  
export const dislikePostAction = createAsyncThunk("posts/dislike", 
    async(postId,{rejectWithValue,getState,dispatch}) =>{
        // make request
        try{
            console.log("started comm");
             const token = getState()?.users?.userAuth?.userInfo?.token;
            const config ={
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data}= await axios.put(
                `http://localhost:3000/api/v1/posts/dislike/${postId}`,
                {},
                config
               
            );
           
            return data;
        }catch (error){
            return rejectWithValue(error?.response?.data);

        }
    });

        //clap Post  
export const clapPostAction = createAsyncThunk("posts/clap", 
    async(postId,{rejectWithValue,getState,dispatch}) =>{
        // make request
        try{
            console.log("started comm");
             const token = getState()?.users?.userAuth?.userInfo?.token;
            const config ={
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data}= await axios.put(
                `http://localhost:3000/api/v1/posts/claps/${postId}`,
                {},
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
    // state.success = true,
    state.error=null;
    state.posts= action.payload;
});
builder.addCase(fetchPublicPostAction.rejected, (state,action)=>{
    console.log("rejected");
    state.loading = false;
    state.success = false;
    state.error=action.payload;
   
});
 // fetch private post
            builder.addCase(fetchPrivatePostAction.pending, (state,action)=>{
                console.log("pending run");
                state.loading =true;
});
builder.addCase(fetchPrivatePostAction.fulfilled, (state,action)=>{
    console.log("fulfilled run")
    state.loading = false;
    // state.success = true,
    state.error=null;
    state.posts= action.payload;
});
builder.addCase(fetchPrivatePostAction.rejected, (state,action)=>{
    console.log("rejected");
    state.loading = false;
    state.success = false;
    state.error=action.payload;
   
});

 // get single  post
            builder.addCase(getPostAction.pending, (state,action)=>{
                console.log(" get postpending run");
                state.loading =true;
});
builder.addCase(getPostAction.fulfilled, (state,action)=>{
    console.log("fulfilled run")
    state.loading = false;
    state.success = true,
    state.error=null;
    state.post= action.payload;
});
builder.addCase(getPostAction.rejected, (state,action)=>{
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
// delete post
            builder.addCase(deletePostAction.pending, (state,action)=>{
                console.log(" delete post pending");
                state.loading =true;
});
builder.addCase(deletePostAction.fulfilled, (state,action)=>{
    console.log("delete post fulfilled run")
    state.loading = false;
    state.success = true,
    state.error=null;
   
});
builder.addCase(deletePostAction.rejected, (state,action)=>{
    console.log(" delete post rejected run");
    state.loading = false;
    state.success = false;
    state.error=action.payload;
   
});

//  update post
            builder.addCase(updatePostAction.pending, (state,action)=>{
                console.log(" update post pending");
                state.loading =true;
});
builder.addCase(updatePostAction.fulfilled, (state,action)=>{
    console.log("update post fulfilled run")
    state.loading = false;
    state.success = true,
    state.error=null;
    state.post= action.payload;
});
builder.addCase(updatePostAction.rejected, (state,action)=>{
    console.log(" update post rejected run");
    state.loading = false;
    state.error=action.payload;
   
});

 //like post
            builder.addCase(likePostAction.pending, (state,action)=>{
                console.log("  like pending run");
                state.loading =true;
});
builder.addCase(likePostAction.fulfilled, (state,action)=>{
    console.log("fulfilled run")
    state.loading = false;
    // state.success = true,
    state.error=null;
    state.posts= action.payload;
});
builder.addCase(likePostAction.rejected, (state,action)=>{
    console.log("rejected");
    state.loading = false;
    state.success = false;
    state.error=action.payload;
   
});

//dislike post
            builder.addCase(dislikePostAction.pending, (state,action)=>{
                console.log("  dislike pending run");
                state.loading =true;
});
builder.addCase(dislikePostAction.fulfilled, (state,action)=>{
    console.log("fulfilled run")
    state.loading = false;
    state.error=null;
    state.posts= action.payload;
});
builder.addCase(dislikePostAction.rejected, (state,action)=>{
    console.log("rejected");
    state.loading = false;
   
    state.error=action.payload;
   
});

//clap post
            builder.addCase(clapPostAction.pending, (state,action)=>{
                console.log("  clap pending run");
                state.loading =true;
});
builder.addCase(clapPostAction.fulfilled, (state,action)=>{
    console.log("fulfilled run")
    state.loading = false;
    state.error=null;
    state.posts= action.payload;
});
builder.addCase(clapPostAction.rejected, (state,action)=>{
    console.log("rejected");
    state.loading = false;
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

