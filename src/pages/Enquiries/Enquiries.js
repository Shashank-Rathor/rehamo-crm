import React, { useContext } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import classes from './enquiries.module.css';
import Datatable from '../../components/datatable/Datatable';
import { DataContext } from '../../components/context/DataContext';

const Enquiries = () => {
  const {data} = useContext(DataContext);

  return (
    <div className={classes.enquiries}>
        <Sidebar/>
        <div className={classes.enquiriescontainer}>
            <Navbar data={data}/>
              <Datatable data={data}/>
        </div>
    </div>
  )
}

export default Enquiries