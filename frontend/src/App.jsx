import { BrowserRouter,Routes,Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import UserProfile from "./components/Users/Userprofile";
import PublicNavbar from "./components/NavBar/PublicNavbar";
import PrivateNavbar from "./components/NavBar/PrivateNavbar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/Alert/AuthRoute/ProtectedRoute";
export default function App(){
  const{userAuth} = useSelector((state)=>state.users);
  const isLoggedIn = userAuth?.userInfo?.token;  
  
  return(
    <BrowserRouter>
    {isLoggedIn ? <PrivateNavbar/> :<PublicNavbar/>};
    
    
    <Routes>
      <Route path ="/" element ={<Homepage/>}/>
      <Route path ="/login" element ={<Login/>}/>
       <Route path ="/user-profile" element ={
        <ProtectedRoute>
          <UserProfile/>
        </ProtectedRoute>
       }
       />
      

    </Routes>
    </BrowserRouter>
  );
 
}