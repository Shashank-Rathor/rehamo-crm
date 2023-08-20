import React, { useEffect, useState } from 'react';
import classes from './Datatable.module.css';
import { DataGrid } from '@mui/x-data-grid';
import {userColoumns, userRows} from '../../datatablsesource';
import { Link } from 'react-router-dom';
import Excelexport from '../../components/Excelexport';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from '../../components/context/DataContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Datatable = () => {
  const {data} = useContext(DataContext);
  const {handleDelete} = useContext(DataContext);
  const [filterData, setFilterData] = useState([]);
  const [crmData, setCrmData] = useState([]);
  const [startDate, setStartDate] = useState(" ");
  const [endDate, setEndDate] = useState(" ");
  const [dateData, setdateDate] = useState([]);
  const [name, setName] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  
  const yourParameter = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    if (currentUser) {
      setName(currentUser.displayName);
     }
      let crmList=[];

      data.map((item) => {
        if(item.Crm === yourParameter.name){
        crmList.push({...item})
      }
      else{
        return
      }
      })

      setFilterData(crmList)
      setCrmData(crmList)
  },[data])

  const handleSelectionChange = (selection) => {
    console.log(selection)
  };

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
  const handleCellClick = (params) => {

    console.log(params.row.id)
    navigate(`/enquiry?id=${params.row.id}`)
  }

  const handleFilter = (type) => {

    if(dateData.length == 0){

    if(type == "active"){
      let active = crmData.filter(item => item.Status === "active");
      setFilterData(active)
    }
    else if(type == "sold"){
      let sold = crmData.filter(item => item.Status === "sold");
      setFilterData(sold)
    }
    else if(type == "closed"){
      let closed = crmData.filter(item => item.Status === "closed");
      setFilterData(closed)
    }
    else if(type == "all"){
      setFilterData(crmData)
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
      setFilterData(crmData)
    } 
  }
  }
  
  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  }
  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  }
  const handleFilterDate = () => {

    const dataInRange = crmData.filter(item => {
      const itemDate = new Date(item.Date);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
    setFilterData(dataInRange)
    setdateDate(dataInRange)
    
  }

  const actionColoumn = [
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell:(params)=>{
        return(
          <div className={classes.cellAction}>
            <Link to={`/enquiry?id=${params.row.ID}`}style={{textDecoration:"none"}}>
            <div className={classes.viewButton}>View</div>
            </Link>
              {/* <div className={classes.deleteButton} onClick={() => handleDelete(params.row.ID)}>Delete</div> */}
          </div>
        )
      }
    }
  ]

  return (
    <div className={classes.datatable}>
      
      <div style={{display: "flex"}}>
      <div className={classes.search}>
          <input type="text" placeholder='Search' value={searchInput} onChange={(e) => handleSearch(e)}/>
          <SearchIcon/>
        </div>
        <div style={{paddingTop: "5px"}}>
        <Link to="/enquiries/new" style={{textDecoration: "none",marginLeft: "20px"}} className={classes.link}>
          Add New
        </Link>
        </div>
        </div>
        <div className={classes.datatableTitle}>
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
            <Excelexport className={classes.link} data={filterData}/>
        </div>
         <DataGrid
        rows={filterData}
        columns={userColoumns.concat(actionColoumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={(params) => handleCellClick(params)}
        // checkboxSelection
        // selectionModel={selectedRows}
        // onSelectionModelChange={(selection) => handleSelectionChange(selection)}
      />
    </div>
  )
}

export default Datatable;