import React, { useEffect, useState } from 'react';
import classes from './Navbar.module.css';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
  const [name, setName] = useState([]);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
   setName(user.displayName);
  }
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
              <div className={classes.counter}>1</div>
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