import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Enquiries from "./pages/Enquiries/Enquiries";
import Users from "./pages/Users/Users";
import Enquiry from "./pages/Enquiry/Enquiry";
import NewUser from "./pages/NewUser/NewUser";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import New from "./pages/new/New";
import Edit from "./pages/Edit/Edit";
import { AuthContext } from "./components/context/AuthContext";
import { useContext } from "react";
import EditUser from "./pages/EditUser/EditUser";

function App() {

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login"/>;
  }


  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<RequireAuth><Home/></RequireAuth>}/> 
        <Route exact path="/login" element={<Login/>}/> 
        <Route exact path="/signup" element={<Signup/>}/> 
        <Route exact path="/enquiries" element={<RequireAuth><Enquiries/></RequireAuth>}/> 
        <Route exact path="/enquiry" element={<RequireAuth><Enquiry/></RequireAuth>}/> 
        <Route exact path="/enquiries/new" element={<RequireAuth><New/></RequireAuth>}/> 
        <Route exact path="enquiry/edit" element={<RequireAuth><Edit/></RequireAuth>}/> 
        <Route exact path="/users" element={<RequireAuth><Users/></RequireAuth>}/> 
        <Route exact path="/users/new" element={<RequireAuth><NewUser/></RequireAuth>}/> 
        <Route exact path="users/edit" element={<RequireAuth><EditUser/></RequireAuth>}/> 

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
