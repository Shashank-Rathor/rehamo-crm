import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import classes from './Users.module.css';

const Enquiries = () => {
  return (
    <div className={classes.users}>
        <Sidebar/>
        <div className={classes.usersContainer}>
            <Navbar/>

        </div>
    </div>
  )
}

export default Enquiries