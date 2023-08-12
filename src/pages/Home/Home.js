import React, { useEffect, useState } from 'react';
import classes from './home.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import Table from '../../components/table/Table';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


const Home = () => {
   const [data,setData] = useState([]);
   const [activeData,setActiveData] = useState([]);
   const [soldData,setSoldData] = useState([]);
   const [closedData,setClosedData] = useState([]);
   const [filterData, setFilterData] = useState([]);
   const [startDate, setStartDate] = useState(" ");
   const [endDate, setEndDate] = useState(" ");
   const [dateData, setdateDate] = useState([]);
   const [sumActive, setSumActive] = useState("");
   const [sumSold, setSumSold] = useState("");
   const [sumClosed, setSumClosed] = useState("");
   

  useEffect(() => {
    const fetchData = async() => {
      let list = []
      try{
        const querySnapshot = await getDocs(collection(db, "enquiries"));
      querySnapshot.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()});
      });
      setData(list)
      setFilterData(list)
      }
      catch(err){
        console.log(err)
      }
    };
    fetchData()
  },[]);

  useEffect(() => {
   let active = filterData.filter(item => item.Status === "active");
      setActiveData(active);
      setSumActive(getArraySum(active))

   let sold = filterData.filter(item => item.Status === "sold");
      setSoldData(sold)
      setSumSold(getArraySum(sold))

   let closed = filterData.filter(item => item.Status === "closed");
      setClosedData(closed)
      setSumClosed(getArraySum(closed))
   
  },[data,dateData])

  const getArraySum = (arr) => {
    let sum = 0;
    
    for (let i = 0; i < arr.length; i++) {
      sum += parseFloat(arr[i].Revenue);
    }
    
    return sum;
  }

  const handleStartDate = (e) => {
   setStartDate(e.target.value);
 }
 const handleEndDate = (e) => {
   setEndDate(e.target.value);
 }
 const handleFilterDate = () => {

   const dataInRange = data.filter(item => {
     const itemDate = new Date(item.Date);
     return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
   });

   setdateDate(dataInRange)
   setFilterData(dataInRange)
 }
 const handleFilter = (type) => {
  if(dateData.length == 0){

    if(type == "active"){
      let active = data.filter(item => item.Status === "active");
      setFilterData(active)
      
    }
    else if(type == "sold"){
      let sold = data.filter(item => item.Status === "sold");
      setFilterData(sold)
    }
    else if(type == "closed"){
      let closed = data.filter(item => item.Status === "closed");
      setFilterData(closed)
    }
    else if(type == "all"){
      setFilterData(data)
    }      
  }
  else{
    
    if(type == "active"){
      let active = dateData.filter(item => item.Status === "active");
      setFilterData(active)
    }
    else if(type == "sold"){
      let sold = dateData.filter(item => item.Status === "sold");
      setFilterData(sold)
    }
    else if(type == "closed"){
      let closed = dateData.filter(item => item.Status === "closed");
      setFilterData(closed)
    }
    else if(type == "all"){
      setFilterData(data)
    } 
  }
 }

  
  return (
    <div className={classes.main}>
      <Sidebar/>
      <div className={classes.container}>
        <Navbar/>
         <div className={classes.widgets}>
            <Widget type="active" activeData={activeData} />
            <Widget type="sold" soldData={soldData}/>
            <Widget type="closed" closedData={closedData}/>
            <Widget type="total" list={filterData}/>
            <Widget type="revenueGenerated" list={filterData} soldRevenue={sumSold}/>
            <Widget type="revenueMissed" list={filterData} closedRevenue={sumClosed}/>
            <Widget type="revenueExpected" list={filterData} activeRevenue={sumActive}/>
         </div>
         <div className={classes.listContainer}>
         <div className={classes.datatableTitle}>
         <div className={classes.listTitle}>Enquiries</div>
         <div className={classes.filterLink} onClick={() => handleFilter("all")}>All</div>
            <div className={classes.filterLink} onClick={() => handleFilter("active")}>Active</div>
            <div className={classes.filterLink} onClick={() => handleFilter("sold")}>Sold</div>
            <div className={classes.filterLink} onClick={() => handleFilter("closed")}>Closed</div>
         <div className={classes.filterDate}>
            <label>Start Date</label>
            <input type="date" id="startDate" value={startDate} onChange={(e) => handleStartDate(e)}/>
            </div>
            <div className={classes.filterDate}>
            <label>End Date</label>
            <input type="date" id="endDate" value={endDate} onChange={(e) => handleEndDate(e)}/>
            </div>
            <div className={classes.link} onClick={() => handleFilterDate()}>FIlter</div>
         </div> 
            <Table data={filterData} />
         </div>
      </div>
   </div>
  )
}

export default Home;