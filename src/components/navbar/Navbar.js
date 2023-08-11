import React, { useEffect, useState } from 'react';
import classes from './Navbar.module.css';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonIcon from '@mui/icons-material/Person';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { collection, getDocs,doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { UndoRounded } from '@mui/icons-material';

const Navbar = () => {
  const [name, setName] = useState([]);
  const [data,setData] = useState([]);
  const [notifications,setNotifications] = useState([]);
  const [notificationCount,setNotificationCount] = useState("");
  const {currentUser} = useContext(AuthContext)

useEffect(() => {

  if (currentUser) {
   setName(currentUser.displayName);
  }
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
  const todayDay = String(today.getDate()).padStart(2, '0');

  const fetchData = async() => {
    let list = []
    let notificationList = [];
    try{
      const querySnapshot = await getDocs(collection(db, "enquiries"));
    querySnapshot.forEach((doc) => {
      list.push({id: doc.id, ...doc.data()});
    });
    setData(list)
    list.map((item) => {
      if(item.ReminderDate){
      var dateArray = item.ReminderDate.split("-");
      var day = dateArray[2].split("T")[0]
      var month = dateArray[1]
      var year = dateArray[0];

      if(day == todayDay && month == todayMonth && year == todayYear ){
        notificationList.push({...item})
      }
    }
    else{
      return
    }
    })
    setNotifications(notificationList);
    setNotificationCount(notificationList.length);
    console.log(notificationList)
    }
    catch(err){
      console.log(err)
    }
  };
  
  fetchData();
}, []);

  return (
    <div className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.search}>
          <input type="text" placeholder='Search'/>
          <SearchIcon/>
        </div>
        <div className={classes.items}>
            <div className={classes.item}>
              <NotificationsNoneIcon className={classes.icon}/>
              <div className={classes.counter}>{notificationCount}</div>
            </div>
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