import React, { useEffect, useState } from 'react';
import classes from './Navbar.module.css';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonIcon from '@mui/icons-material/Person';
import Notifications from '../notifications/Notifications';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = ({data}) => {
  const [name, setName] = useState([]);
  const [notifications,setNotifications] = useState([]);
  const [notificationCount,setNotificationCount] = useState("");
  const [isNotification,setIsNotification] = useState(false);
  const {currentUser} = useContext(AuthContext);

useEffect(() => {

  if (currentUser) {
   setName(currentUser.displayName);
  }

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
  const todayDay = String(today.getDate()).padStart(2, '0');
  
    let notificationList = [];
    data.map((item) => {
      if(item.ReminderDate){
      var dateArray = item.ReminderDate.split("-");
      var day = dateArray[2].split("T")[0]
      var month = dateArray[1]
      var year = dateArray[0];


      if(item.Crm === currentUser.displayName){
      if((day == todayDay && month == todayMonth && year == todayYear)|| (day < todayDay && month < todayMonth && year < todayYear && item.Status === "active") ){
        notificationList.push({...item})
      }
    }
    else{
      return
    }
  }
    })
    setNotifications(notificationList);
    setNotificationCount(notificationList.length);


}, [data]);

  const handleNotification = () =>{
    setIsNotification(!isNotification)
  }

  return (
    <div className={classes.navbar} >
      <div className={classes.wrapper} >
      <div className={classes.item}>
       <NotificationsNoneIcon className={classes.icon} onClick={() => handleNotification()}/>
       
        <div className={classes.counter}>{notificationCount}</div>
        {isNotification === true ?  <Notifications data={notifications} handleNotification={handleNotification}/> : <></>}
            </div>
        <div />
        <div className={classes.items} >
            {/* <button className={classes.fetch_button}>New</button> */}
            <div className={classes.item}>
              <PersonIcon className={classes.icon}/>
              {name}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar