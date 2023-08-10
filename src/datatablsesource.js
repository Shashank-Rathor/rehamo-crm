import { Link } from 'react-router-dom';
import classes from './components/datatable/Datatable.module.css';

export const userColoumns = [
  {field: 'Date',headerName: 'Date',width: 110},
  {field: 'Crm',headerName: 'CRM',width: 70},
  {field: 'Source',headerName: 'Source',width: 100},
  {field: 'EnquiryType',headerName: 'Enquiry Type',width: 70},
  {field: 'Name',headerName: 'Name',width: 100},
  {field: 'Address',headerName: 'Address',width: 70},
  {field: 'Contact',headerName: 'Contact',width: 70},
  {field: 'Email',headerName: 'Email',width: 70},
  {field: 'Product',headerName: 'Product',width: 70},
  {field: 'TypeOfPurchase',headerName: 'Type of Purchase',width: 70},
  {field: 'Remarks',headerName: 'Remarks',width: 70},
  
  {
    field: 'Status',
    headerName: 'Status',
    width: 70,
    cellClassName: (params) => 
    {
        if(params.row.Status === "active"){
            return( `${classes.active}`)
        }
        if(params.row.Status === "sold"){
            return( `${classes.sold}`)
        }
        if(params.row.Status === "closed"){
            return( `${classes.closed}`)
        }
    }
},
{
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell:(params)=>{
      return(
        <div className={classes.cellAction}>
          <Link to={`/enquiry?id=${params.row.ID}`}style={{textDecoration:"none"}}>
          <div className={classes.viewButton}>View</div>
          </Link>
            <div className={classes.deleteButton}>Delete</div>
        </div>
      )
    }
  }
   
]

