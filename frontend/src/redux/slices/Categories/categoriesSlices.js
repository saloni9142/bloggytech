import {createAsyncThunk, createSlice}  from "@reduxjs/toolkit";
import axios from "axios";
import {resetErrorAction, resetSuccessAction} from "../globalSlice/globalSlice"
const INITIAL_STATE ={
    loading: false,
    error : null,
    success: false,
    categories: [],
    category: null,
    };
    // fetch categories action 
export const fetchCategoriesAction = createAsyncThunk("categories/lists", 
    async(payload,{rejectWithValue,getState,dispatch}) =>{
        // make request
        try{
          
            const {data}= await axios.get(
                "http://localhost:3000/api/v1/categories"
               
            );
           
            return data;
        }catch (error){
            return rejectWithValue(error?.response?.data);

        }
    });
    // !categories Slice

     const categoriesSlice = createSlice({
        name: "categories",
        initialState: INITIAL_STATE,
        extraReducers:(builder)=>{
            // fetch categories
            builder.addCase(fetchCategoriesAction.pending, (state,action)=>{
                console.log("pending run");
                state.loading =true;
});
builder.addCase(fetchCategoriesAction.fulfilled, (state,action)=>{
    console.log("fulfilled run")
    state.loading = false;
    state.success = true,
    state.error=null;
    state.categories= action.payload;
});
// rejected state
builder.addCase(fetchCategoriesAction.rejected, (state,action)=>{
    console.log("rejected");
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
 const categoriesReducer= categoriesSlice.reducer;
 export default categoriesReducer;

