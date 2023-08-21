import React, {useContext, useEffect, useState} from 'react';
import classes from './Sidebar.module.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import {auth} from "../../firebase";
import { AuthContext } from '../../components/context/AuthContext';

const Sidebar = () => {
  const {currentUser} = useContext(AuthContext);
  const [admin,setAdmin] = useState("")
  const isAdmin = JSON.parse(localStorage.getItem("Admin"))

  const navigate = useNavigate();
  


  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful. 
        localStorage.setItem("user", JSON.stringify(""))
        navigate("/login");
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
}
  return (
    <div className={classes.sidebar}>
        <div className={classes.top}>
           <Link to="/" style={{textDecoration:"none"}}>
           <span className={classes.logo}>Rehamo</span>
           </Link>
        </div>
        <hr/>
        <div className={classes.center}>
            <ul>
                <p className={classes.title}>MAIN</p>
                <Link to="/" style={{textDecoration:"none"}}>
                <li>
                  <DashboardIcon className={classes.icon}/>
                  <span>Dashboard</span>
                </li>
                </Link>
                
                {isAdmin === false ? 
                <>
                <p className={classes.title}>LISTS</p>
                <Link to={`/enquiries/${currentUser.displayName}`} style={{textDecoration:"none"}}>
                <li>
                  <ListIcon className={classes.icon}/>
                  <span>Enquiries</span>
                </li> 
                  </Link> </>:<></>}
                  {isAdmin === true ? 
                  <>
                  <p className={classes.title}>ENQUIRIES</p>
                  <a  href="/enquiries/Vicky" style={{textDecoration:"none"}}>
                <li>
                  <ListIcon className={classes.icon}/>
                  <span>Vicky</span>
                </li> 
                  </a>
                  <a href="/enquiries/Ramya" style={{textDecoration:"none"}}>
                <li>
                  <ListIcon className={classes.icon}/>
                  <span>Ramya</span>
                </li> 
                  </a>
                  <p className={classes.title}>LISTS</p>
                  <Link to="/users" style={{textDecoration:"none"}}>
                <li>
                  <GroupIcon className={classes.icon}/>
                 <span>Users</span> 
                </li>   
                </Link></>:<></> }
                <p className={classes.title}>USER</p>
                <li>
                  <AccountCircleIcon className={classes.icon}/>
                  <span>{currentUser.displayName}</span>
                </li>   
                <li onClick={()=>handleLogout()}>
                  <LogoutIcon className={classes.icon}/>
                  <span>Logout</span>
                </li> 
            </ul>    
        </div>   
    </div>
  )
}

export default Sidebar