import React, { useEffect, useState } from 'react';
import classes from './Table.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const List = () => {
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
    const stausdiv = function(status){
        const statusClasses=[];
        if(status === "active"){
            statusClasses.push(classes.active)
        }
        if(status === "sold"){
            statusClasses.push(classes.sold)
        }
        if(status === "closed"){
            statusClasses.push(classes.closed)
        }
        
        return(
            <span className={statusClasses}>{status}</span>
        )
    }

  return (
    <TableContainer component={Paper} className={classes.table}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableHead}>Date</TableCell>
          <TableCell className={classes.tableHead}>CRM</TableCell>
          <TableCell className={classes.tableHead}>Source</TableCell>
          <TableCell className={classes.tableHead}>Enquiry Type</TableCell>
          <TableCell className={classes.tableHead}>Name</TableCell>
          <TableCell className={classes.tableHead}>Address</TableCell>
          <TableCell className={classes.tableHead}>Contact</TableCell>
          <TableCell className={classes.tableHead}>Email</TableCell>
          <TableCell className={classes.tableHead}>Product</TableCell>
          <TableCell className={classes.tableHead}>Type Of Purchase</TableCell>
          <TableCell className={classes.tableHead}>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.ID}>
            <TableCell className={classes.tableCell}>{row.Date}</TableCell>
            <TableCell className={classes.tableCell}>{row.Crm}</TableCell>
            <TableCell className={classes.tableCell}>{row.Source}</TableCell>
            <TableCell className={classes.tableCell}>{row.EnquiryType}</TableCell>
            <TableCell className={classes.tableCell}>{row.Name}</TableCell>
            <TableCell className={classes.tableCell}>{row.Address}</TableCell>
            <TableCell className={classes.tableCell}>{row.Contact}</TableCell>
            <TableCell className={classes.tableCell}>{row.Email}</TableCell>
            <TableCell className={classes.tableCell}>{row.Product}</TableCell>
            <TableCell className={classes.tableCell}>{row.TypeOfPurchase}</TableCell>
            <TableCell className={classes.tableCell}>
                    {stausdiv(row.Status)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default List;