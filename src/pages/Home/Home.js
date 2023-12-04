import React, { useEffect, useState } from 'react';
import classes from './home.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import Table from '../../components/table/Table';
import CrmDashboard from '../../components/crmDashboard/CrmDashboard';
import { useContext } from "react";
import { DataContext } from '../../components/context/DataContext';
import SearchIcon from '@mui/icons-material/Search';


const Home = () => {
   const [activeData,setActiveData] = useState([]);
   const [soldData,setSoldData] = useState([]);
   const [closedData,setClosedData] = useState([]);
   const [filterData, setFilterData] = useState([]);
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [dateData, setdateDate] = useState([]);
   const [sumActive, setSumActive] = useState("");
   const [sumSold, setSumSold] = useState("");
   const [sumClosed, setSumClosed] = useState("");
   const {data} = useContext(DataContext);
   const [searchInput, setSearchInput] = useState('');
   const [clickedDiv, setClickedDiv] = useState('all');

   useEffect(() => {
    setFilterData(data)
   },[data])

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
   
  },[dateData,filterData])

  const getArraySum = (arr) => {
    let sum = 0;
    
    for (let i = 0; i < arr.length; i++) {
      sum += parseFloat(arr[i].Revenue);
    }
    
    return sum;
  }
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredResults = data.filter((item) =>
      Object.values(item).some((value) =>
        value !== null &&
        value.toString().toLowerCase().includes(searchTerm)
      )
    );
    setFilterData(filteredResults);
    setSearchInput(searchTerm);
  };

  const handleStartDate = (e) => {
   setStartDate(e.target.value);
 }
 const handleEndDate = (e) => {
   setEndDate(e.target.value);
 }
 const handleFilterDate = () => {

   const dataInRange = filterData.filter(item => {
     const itemDate = new Date(item.Date);
     return itemDate >= new Date(startDate + "T00:00:00") && itemDate <= new Date(endDate + "T23:59:59");
   });

   setdateDate(dataInRange)
   setFilterData(dataInRange)
 }
 const handleFilter = (type) => {
  setClickedDiv(type);

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
        <Navbar data={data}/>
         <div className={classes.widgets}>
            <Widget type="active"  style={{backgroundColor: "rgb(255, 225, 168) "}} activeData={activeData} />
            <Widget type="sold"  style={{backgroundColor: "rgb(175, 255, 175) "}}  soldData={soldData}/>
            <Widget type="closed" style={{backgroundColor: "rgb(255, 178, 178)"}}  closedData={closedData}/>
            <Widget type="total" style={{backgroundColor: "rgb(188, 228, 255)"}} list={filterData}/>
            <Widget type="revenueGenerated" style={{backgroundColor: "rgb(188, 228, 255)"}} list={filterData} soldRevenue={sumSold}/>
            <Widget type="revenueMissed" style={{backgroundColor: "rgb(188, 228, 255)"}} list={filterData} closedRevenue={sumClosed}/>
            <Widget type="revenueExpected" style={{backgroundColor: "rgb(188, 228, 255)"}} list={filterData} activeRevenue={sumActive}/>
         </div>
         {/* <CrmDashboard data={data}/> */}
         <div className={classes.listContainer}>
         <div className={classes.search}>
          <input type="text" placeholder='Search' value={searchInput} onChange={(e) => handleSearch(e)}/>
          <SearchIcon/>
        </div>
         <div className={classes.datatableTitle}>
         <div className={classes.listTitle}>Enquiries</div>
         <div className={classes.filters}>
         <div className={clickedDiv=== "all" ? classes.clickedLink :classes.filterLink} onClick={() => handleFilter("all")}>All</div>
            <div className={clickedDiv=== "active" ? classes.clickedLink :classes.filterLink} onClick={() => handleFilter("active")}>Active</div>
            <div className={clickedDiv=== "sold" ? classes.clickedLink :classes.filterLink} onClick={() => handleFilter("sold")}>Sold</div>
            <div className={clickedDiv=== "closed" ? classes.clickedLink :classes.filterLink} onClick={() => handleFilter("closed")}>Closed</div>
         </div>
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