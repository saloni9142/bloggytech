import {createAsyncThunk, createSlice}  from "@reduxjs/toolkit";
import axios from "axios";
import {resetErrorAction, resetSuccessAction} from "../globalSlice/globalSlice"
const INITIAL_STATE ={
    loading: false,
    error : null,
    success: false,
    comments: [],
    comment: null,
    };

    
    // create Comment action
export const createCommentAction = createAsyncThunk("comments/create", 
    async(payload,{rejectWithValue,getState,dispatch}) =>{
        // make request
        try{

            
            const token = getState()?.users?.userAuth?.userInfo?.token;
            console.log("comment", payload);
            console.log("token", token);
            
            const config ={
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
            const {data}= await axios.post(
                `http://localhost:3000/api/v1/comments/${payload?.postId}`,
              {
                message: payload?.message,
              },
              config
            );
            
            return data;
        }catch (error){
            console.log("response", error?.response?.data);
            return rejectWithValue(error?.response?.data);

        }
    });

    // !comment Slices

    const commentSlice = createSlice({
            name: "comments",
            initialState:INITIAL_STATE,
            extraReducers:(builder)=>{
                // create comment
                builder.addCase(createCommentAction.pending, (state,action)=>{
                    console.log(" create commentpending run");
                    state.loading =true;
    });
    builder.addCase(createCommentAction.fulfilled, (state,action)=>{
        console.log("create comment fulfilled run")
        state.loading = false;
        // state.success = true,
        state.error=null;
        state.posts= action.payload;
    });
    builder.addCase(createCommentAction.rejected, (state,action)=>{
        console.log(" create comment rejected");
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
}
    });

     // genearte reducer
 const commentReducer= commentSlice.reducer;
 export default commentReducer;

