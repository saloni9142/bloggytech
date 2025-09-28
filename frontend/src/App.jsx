import { BrowserRouter,Routes,Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";

import PublicNavbar from "./components/NavBar/PublicNavbar";
import PrivateNavbar from "./components/NavBar/PrivateNavbar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/Alert/AuthRoute/ProtectedRoute";
import PublicPosts from "./components/Posts/PublicPosts";
import AddPost from "./components/AddPost";
import PostDetails from "./components/Posts/PostDetails";
import PostList from "./components/Posts/PostList";
import UpdatePost from "./components/Posts/UpdatePost";
import PublicUserProfile from "./components/Users/PublicUserProfile";
export default function App(){
  const{userAuth} = useSelector((state)=>state.users);
  const isLoggedIn = userAuth?.userInfo?.token;  
  
  return(
    <BrowserRouter>
    {isLoggedIn ? <PrivateNavbar/> :<PublicNavbar/>};
    
    
    <Routes>
      <Route path ="/" element ={<Homepage/>}/>
      <Route path ="/login" element ={<Login/>}/>
      {/* <Route path ="/public-posts" element ={<PublicPosts/>}/> */}
       <Route path ="/user-public-profile/:userId" element ={
        <ProtectedRoute>
          <PublicUserProfile/>
        </ProtectedRoute>
       }
       />
        <Route path ="/add-post" element ={
        <ProtectedRoute>
          <AddPost/>
        </ProtectedRoute>
       }
       />

        <Route path ="/posts/:postId" element ={
        <ProtectedRoute>
          <PostDetails/>
        </ProtectedRoute>
       }
       />
        <Route path ="/posts" element ={
        <ProtectedRoute>
          <PostList/>
        </ProtectedRoute>
       }
       />
       <Route path ="/posts/:postId/update" element ={
        <ProtectedRoute>
          <UpdatePost/>
        </ProtectedRoute>
       }
       />
      

    </Routes>

    
    </BrowserRouter>
  );
 
}