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
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { SaveAlt } from "@mui/icons-material";

function Table7({ selectedYear }: any) {
  const [tableYearUnemployeeBool, setTableYearUnemployeeBool] = useState<any[]>(
    []
  );

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearUnemployeeBool(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const exportToExcel = () => {
    const filteredData = tableYearUnemployeeBool
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const yesPercentage = (
          (yearData.employee.employedAfterGraduation.yes /
            (yearData.employee.employedAfterGraduation.yes +
              yearData.employee.employedAfterGraduation.no)) *
          100
        ).toFixed(2);
        const noPercentage = (
          (yearData.employee.employedAfterGraduation.no /
            (yearData.employee.employedAfterGraduation.yes +
              yearData.employee.employedAfterGraduation.no)) *
          100
        ).toFixed(2);

        return [
          ["Have you been employed after Graduation?", "", ""],
          ["Y/N", "Frequency", "Percentage"],
          [
            "Yes",
            yearData.employee.employedAfterGraduation.yes,
            yesPercentage + "%",
          ],
          [
            "No",
            yearData.employee.employedAfterGraduation.no,
            noPercentage + "%",
          ],
        ];
      })
      .flat();

    const ws = XLSX.utils.aoa_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "HaveYouBeenEmployedData");
    XLSX.writeFile(wb, "HaveYouBeenEmployedData.xlsx");
  };

  return (
    <>
      {tableYearUnemployeeBool
        .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
        .map((yearData) => (
          <Fragment key={yearData.id}>
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
              <Typography variant="h6">
                Have you been employed after Graduation?
              </Typography>
            </Box>
            <Grid container justifyContent="center" alignItems="center">
              <TableContainer
                component={Paper}
                sx={{ width: "auto", marginBottom: 2 }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                        {yearData.employee.employedAfterGraduation.yes}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.employedAfterGraduation.yes /
                            (yearData.employee.employedAfterGraduation.yes +
                              yearData.employee.employedAfterGraduation.no)) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>no</TableCell>
                      <TableCell>
                        {yearData.employee.employedAfterGraduation.no}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.employedAfterGraduation.no /
                            (yearData.employee.employedAfterGraduation.yes +
                              yearData.employee.employedAfterGraduation.no)) *
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

export default Table7;
