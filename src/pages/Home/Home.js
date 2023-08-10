import React from 'react';
import classes from './home.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import Table from '../../components/table/Table';

const Home = () => {
  
  return (
    <div className={classes.main}>
      <Sidebar/>
      <div className={classes.container}>
        <Navbar/>
         <div className={classes.widgets}>
            <Widget type="active"/>
            <Widget type="sold"/>
            <Widget type="closed"/>
            <Widget type="total"/>
         </div>
         <div className={classes.listContainer}>
            <div className={classes.listTitle}>Enquiries</div>
            <Table/>
         </div>
      </div>
   </div>
  )
}

export default Home;