import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import * as XLSX from "xlsx";
import { SaveAlt } from "@mui/icons-material";

function Table3({ selectedYear }: any) {
  const [tableYearEmployeeBool, setTableYearEmployeeBool] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearEmployeeBool(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const exportToExcel = () => {
    const filteredData = tableYearEmployeeBool
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const yesPercentage = (
          (yearData.employee.presentlyEmployed.yes /
            (yearData.employee.presentlyEmployed.yes +
              yearData.employee.presentlyEmployed.no)) *
          100
        ).toFixed(2);
        const noPercentage = (
          (yearData.employee.presentlyEmployed.no /
            (yearData.employee.presentlyEmployed.yes +
              yearData.employee.presentlyEmployed.no)) *
          100
        ).toFixed(2);

        return [
          ["Are you Presently Employed?", "", ""],
          ["Y/N", "Frequency", "Percentage"],
          ["Yes", yearData.employee.presentlyEmployed.yes, yesPercentage + "%"],
          ["No", yearData.employee.presentlyEmployed.no, noPercentage + "%"],
        ];
      })
      .flat();

    const ws = XLSX.utils.aoa_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "AreYouPresntlyEmployedData");
    XLSX.writeFile(wb, "AreYouPresntlyEmployedData.xlsx");
  };

  return (
    <>
      {tableYearEmployeeBool
        .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
        .map((yearData) => (
          <Fragment key={yearData.id}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 5 }}>
              Employment Details
            </Typography>
            <Stack>
              <Button
                size="small"
                endIcon={<SaveAlt />}
                onClick={exportToExcel}
              >
                export to excel
              </Button>
            </Stack>
            <Box>
              <Typography variant="h6">Are you Presently Employed?</Typography>
            </Box>
            <Grid container justifyContent="center" alignItems="center">
              <TableContainer
                component={Paper}
                sx={{ width: "auto", marginBottom: 2 }}
              >
                <Table sx={{ minWidth: 640 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>y/n</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>yes</TableCell>
                      <TableCell>
                        {yearData.employee.presentlyEmployed.yes}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.presentlyEmployed.yes /
                            (yearData.employee.presentlyEmployed.yes +
                              yearData.employee.presentlyEmployed.no)) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>no</TableCell>
                      <TableCell>
                        {yearData.employee.presentlyEmployed.no}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.presentlyEmployed.no /
                            (yearData.employee.presentlyEmployed.yes +
                              yearData.employee.presentlyEmployed.no)) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Fragment>
        ))}
    </>
  );
}

export default Table3;
