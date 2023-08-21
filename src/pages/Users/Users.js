import React, {useContext, useEffect} from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import classes from './Users.module.css';
import { AuthContext } from '../../components/context/AuthContext';
import { DataContext } from '../../components/context/DataContext';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { collection, getDocs,doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Enquiries = () => {
  const {users} = useContext(DataContext);


  const handleDelete = async(id) => {

    try{
      console.log(id)
      await deleteDoc(doc(db, "users", id))
      .then(() => {
        window.location.reload();
      })
    }
    catch(err){
      console.log(err)
    }
  }
  
const columns = [
  { field: 'Date', headerName: 'Date', width: 115 },
  { field: 'Name', headerName: 'Name', width: 110 },
  { field: 'Email', headerName: 'Email', width: 250 },
  { field: 'Role', headerName: 'Role', width: 130 },
];
const actionColoumn = [
  {
    field: "action",
    headerName: "Action",
    width: 140,
    renderCell:(params)=>{
      return(
        <div className={classes.cellAction}>
          <Link to={`/users/edit?id=${params.row.id}`}style={{textDecoration:"none"}}>
          <div className={classes.viewButton}>Edit</div>
          </Link>
            <div className={classes.deleteButton} onClick={() => handleDelete(params.row.id)}>Delete</div>
        </div>
      )
    }
  }
]
  return (
    <div className={classes.users}>
        <Sidebar/>
        <div className={classes.usersContainer}>
          <div className={classes.datatable}>
          <div className={classes.datatableTitle}>
          <Link to="/users/new" style={{textDecoration: "none"}} className={classes.link}>
          Add New
        </Link>
        </div>
          <DataGrid
        rows={users? users : null}
        columns={columns.concat(actionColoumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
          </div>
        </div>
    </div>
  )
}

export default Enquiries