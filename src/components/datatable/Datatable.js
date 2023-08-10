import React, { useEffect, useState } from 'react';
import classes from './Datatable.module.css';
import { DataGrid } from '@mui/x-data-grid';
import {userColoumns, userRows} from '../../datatablsesource';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Datatable = () => {

  const [data,setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async() => {
      let list = []
      try{
        const querySnapshot = await getDocs(collection(db, "enquiries"));
      querySnapshot.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()});
      });
      setData(list)
      }
      catch(err){
        console.log(err)
      }
    };
    fetchData()
  },[]);


  return (
    <div className={classes.datatable}>
        <div className={classes.datatableTitle}>
        <Link to="/enquiries/new" style={{textDecoration: "none"}} className={classes.link}>
          Add New
        </Link>
        </div>
         <DataGrid
        rows={data}
        columns={userColoumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable