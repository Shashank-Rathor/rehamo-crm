import React, { useEffect, useState,useContext } from 'react';
import classes from './CrmDashboard.module.css';
import Widget from '../widget/Widget';
import { AuthContext } from "../context/AuthContext";

const CrmDashboard = ({data}) => {
    const [name, setName] = useState([]);
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {

        if (currentUser) {
         setName(currentUser.displayName);
        }
    })

  return (
    <>
    <span>Vicky</span>
    <div className={classes.widgets}>
            <Widget type="active" activeData={data} />
            <Widget type="sold" soldData={data}/>
            <Widget type="closed" closedData={data}/>
            <Widget type="total" list={data}/>
            {/* <Widget type="revenueGenerated" list={filterData} soldRevenue={sumSold}/>
            <Widget type="revenueMissed" list={filterData} closedRevenue={sumClosed}/>
            <Widget type="revenueExpected" list={filterData} activeRevenue={sumActive}/> */}
    </div>
    </>
  )
}

export default CrmDashboard