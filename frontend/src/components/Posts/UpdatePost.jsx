import React, { useState } from "react";
import  Select from "react-select" ;
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/Categories/categoriesSlices";
import { useEffect } from "react";
import {  updatePostAction } from "../../redux/slices/posts/postSlice";
import LoadingComponents  from  "../Alert/LoadingComponents"
import SuccessMsg from "../Alert/SuccessMsg";
import ErrorMsg from "../Alert/ErrorMsg";
import { useParams } from "react-router-dom";


const UpdatePost = () => {
 const {postId}=useParams();
const dispatch = useDispatch();
// ! Error State
const [errors, setErrors] = useState({});
const {post, error, loading,success} = useSelector((state) => state?.posts);
const {categories} = useSelector((state) => state.categories);
// console.log("categories", categories);
const options = categories?.allCategories?.map((category)=>{
  return {value: category?.id, label: category?.name};

});
  useEffect(()=>{
    dispatch(fetchCategoriesAction());
  },[dispatch]);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });

const handleSelectChange = (selectedOption) => {
  setFormData({ ...formData, category: selectedOption.value });
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange=(e)=>{
    console.log("file", e.target.files[0]);
     setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  }

const handleSubmit = (e) => {
    console.log(formData);
     e.preventDefault();
     dispatch(updatePostAction({...formData,postId}));
   
   
    };
    return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
          Update Post
          </h2>
          {error && <ErrorMsg message={error?.message}/>}
          {success && <SuccessMsg message="Post updated Successfully"/>}
          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
            Share your thoughts and ideas with the community
          </h3>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Title</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="text"
              placeholder="Enter the post title"
              name="title"
              value={formData.title}
              onChange={handleChange}
           /> </label>
          
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
             className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="image"
              onChange={handleFileChange}
            /> </label>

          {/* category here */}
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Category</span>
            <Select 
            options={options} 
            name="category" 
            onChange={handleSelectChange} 
          />  </label>
           
          {/* content here */}
             <label className="mb-4 flex flex-col w-full">
          <span className="mb-1 text-coolGray-800 font-medium">Content</span>
          <textarea
            className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
            placeholder="Write your post content"
            name="content"
              value={formData.content}
              onChange={handleChange}
             />
           </label>
          
          {/* button */}
          {loading ? (<LoadingComponents/>):
          (<button
            className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
            type="submit"
          >
           Update Post
          </button>
        )}
   

        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
