import React, { useEffect, useState } from 'react';
import classes from './Table.module.css';
import { DataGrid } from '@mui/x-data-grid';
import { userColoumns } from '../../datatablsesource';
import { useNavigate } from 'react-router-dom';

const List = ({data}) => {

  const navigate = useNavigate();

  const handleCellClick = (params) => {

    console.log(params.row.id)
    navigate(`/enquiry?id=${params.row.id}`)
  }
  
  const actionColoumn = [
    {
      field: "ReminderDate",
      headerName: "Reminder Date",
      width: 110,
      renderCell:(params)=>{
        return(
          <div className={classes.cellAction}>
            {params.row.ReminderDate ? <div> {params.row.ReminderDate}</div> : <div>No Reminder</div>}
          </div>
        )
      }
    }
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={userColoumns.concat(actionColoumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={(params) => handleCellClick(params)}
        // checkboxSelection
      />
    </div>
  )
}

export default List;