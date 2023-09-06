import React, { useEffect, useState } from 'react';
import classes from './Notifications.module.css';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const Notifications = ({data,handleNotification}) => {

  if(!data.length){
    return <p>Loading</p>
  }
  return (
    <div className={classes.notificationContainer}>
        <span className={classes.notifyTitle}>Follow Ups for today</span>
        <button className={classes.closebutton} onClick={() => handleNotification()}>
          Close
        </button>
        <hr/>
       {data ?  
       <div className={classes.notifyList}>
        <ul style={{padding: "0px"}}>
          {data.map((item) => (
            <>
            <Link  style={{textDecoration:"none", color: "gray"}}to = {`/enquiry?id=${item.ID}`}><li> <PersonIcon/> Name: {item.Name}<br/>Product: {item.Product}</li></Link>
            <hr/></>
          ))}
          </ul>
        </div> :<></>}
    </div>
  )
}

export default Notifications