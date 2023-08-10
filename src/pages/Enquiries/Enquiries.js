import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import classes from './enquiries.module.css';
import Datatable from '../../components/datatable/Datatable';

const Enquiries = () => {
  return (
    <div className={classes.enquiries}>
        <Sidebar/>
        <div className={classes.enquiriescontainer}>
            <Navbar/>
              <Datatable/>
        </div>
    </div>
  )
}

export default Enquiries