import { Link } from 'react-router-dom';
import classes from './components/datatable/Datatable.module.css';

export const userColoumns = [
  {field: 'ID',headerName: 'ID',width: 90},
  {field: 'Date',headerName: 'Date',width: 115},
  {field: 'Crm',headerName: 'CRM',width: 70},
  {field: 'Source',headerName: 'Source',width: 100},
  {field: 'EnquiryType',headerName: 'Enquiry Type',width: 70},
  {field: 'Name',headerName: 'Name',width: 100},
  {field: 'Contact',headerName: 'Contact',width: 110},
  {field: 'Email',headerName: 'Email',width: 120},
  {field: 'Product',headerName: 'Product',width: 130},
  {field: 'Revenue',headerName: 'Revenue',width: 100},
  {field: 'TypeOfPurchase',headerName: 'Type of Purchase',width: 70},
  
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

   
]

