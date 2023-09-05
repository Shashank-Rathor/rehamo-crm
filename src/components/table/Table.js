import React, { useEffect, useState } from 'react';
import classes from './Table.module.css';
import { DataGrid } from '@mui/x-data-grid';
import { userColoumns } from '../../datatablsesource';
import { useNavigate } from 'react-router-dom';
import Excelexport from '../../components/Excelexport';
import ViewModal from '../viewModal/ViewModal';

const List = ({data}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);

  const navigate = useNavigate();

  const handleCellClick = (params) => {

    console.log(params.row.id)
    navigate(`/enquiry?id=${params.row.id}`)
  }
  const handleButtonClick = (event,id) => {
    setIsModalOpen(true);
    const selectedData = data.find(obj => obj.ID === id);
    setViewData(selectedData);
    event.stopPropagation();
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectionChange = (selection) => {
    const selectedData = data.filter(row => selection.includes(row.ID));
    setSelectedRows(selectedData);
  };
  const actionColoumn = [
    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell:(params)=>{
        return(
          <div className={classes.cellAction}>
            <div className={classes.viewButton} onClick={(event) => handleButtonClick(event,params.row.id)}>View</div>
              {/* <div className={classes.deleteButton} onClick={() => handleDelete(params.row.ID)}>Delete</div> */}
          </div>
        )
      }
    }
  ]

  return (
    <div className={classes.table}>
      <Excelexport className={classes.link} data={selectedRows}/>
      <DataGrid
        className={classes.dataGrid}
        rows={data}
        columns={userColoumns.concat(actionColoumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[20,50,100,120,150,200]}
        onRowClick={(params) => handleCellClick(params)}
        checkboxSelection
        onRowSelectionModelChange={(selection) => handleSelectionChange(selection)}
      />
      <ViewModal
      isOpen={isModalOpen} 
      onClose={handleCloseModal}
      viewData={viewData}
      />
    </div>
  )
}

export default List;