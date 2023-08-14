import React, { useEffect, useState } from 'react';
import classes from './Table.module.css';
import { DataGrid } from '@mui/x-data-grid';
import { userColoumns } from '../../datatablsesource';

const List = ({data}) => {
  
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
        checkboxSelection
      />
    </div>
  )
}

export default List;