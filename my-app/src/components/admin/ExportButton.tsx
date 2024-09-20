import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

interface ExportButtonProps {
  tableData: any[];
  fileName: string;
}

const exportToExcel = (tableData: any[], fileName: string) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const ws = XLSX.utils.json_to_sheet(tableData);
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  const url = window.URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName + fileExtension;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ExportButton: React.FC<ExportButtonProps> = ({ tableData, fileName }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => exportToExcel(tableData, fileName)}
    >
      Export to Excel
    </Button>
  );
};

export default ExportButton;