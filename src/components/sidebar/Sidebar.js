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
import { DataContext } from '../../components/context/DataContext';

const Sidebar = () => {
  const {currentUser} = useContext(AuthContext);
  const {users,isAdmin} = useContext(DataContext);
  const [admin,setAdmin] = useState("")

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
                <p className={classes.title}>LISTS</p>
                {isAdmin === false ? <Link to="/enquiries" style={{textDecoration:"none"}}>
                <li>
                  <ListIcon className={classes.icon}/>
                  <span>Enquiries</span>
                </li> 
                  </Link>:<></>}
                  {isAdmin === true ? <Link to="/users" style={{textDecoration:"none"}}>
                <li>
                  <GroupIcon className={classes.icon}/>
                 <span>Users</span> 
                </li>   
                </Link>:<></> }
                <p className={classes.title}>USER</p>
                <li>
                  <AccountCircleIcon className={classes.icon}/>
                  <span>Profile</span>
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