import React from 'react';
import * as XLSX from 'xlsx';

const Excelexport = ({data,className}) => {
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `crmData.xlsx`);
      };

  return (
    <button className={className} onClick={exportToExcel}>Export to Excel</button>
  )
}

export default Excelexport