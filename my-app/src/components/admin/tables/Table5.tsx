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

function Table5({ selectedYear }: any) {
  const [tableYearJobPosition, setTableYearJobPosition] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearJobPosition(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const totalArray = tableYearJobPosition
    .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
    .map(
      (yearData) =>
        yearData.employee.jobPosition.managerial +
        yearData.employee.jobPosition.supervisory +
        yearData.employee.jobPosition.clerical +
        yearData.employee.jobPosition.selfEmployed +
        yearData.employee.jobPosition.other
    );

  const total = totalArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const exportToExcel = () => {
    const filteredData = tableYearJobPosition
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const totalArray = tableYearJobPosition
          .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
          .map(
            (yearData) =>
              yearData.employee.jobPosition.managerial +
              yearData.employee.jobPosition.supervisory +
              yearData.employee.jobPosition.clerical +
              yearData.employee.jobPosition.selfEmployed +
              yearData.employee.jobPosition.other
          );

        const total = totalArray.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );

        return [
          {
            JobPosition: "Managerial",
            Frequency: yearData.employee.jobPosition.managerial,
            Percentage:
              (
                (yearData.employee.jobPosition.managerial / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            JobPosition: "Supervisory",
            Frequency: yearData.employee.jobPosition.supervisory,
            Percentage:
              (
                (yearData.employee.jobPosition.supervisory / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            JobPosition: "Clerical",
            Frequency: yearData.employee.jobPosition.clerical,
            Percentage:
              ((yearData.employee.jobPosition.clerical / total) * 100).toFixed(
                2
              ) + "%",
          },
          {
            JobPosition: "Self-employed",
            Frequency: yearData.employee.jobPosition.selfEmployed,
            Percentage:
              (
                (yearData.employee.jobPosition.selfEmployed / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            JobPosition: "Others",
            Frequency: yearData.employee.jobPosition.other,
            Percentage:
              ((yearData.employee.jobPosition.other / total) * 100).toFixed(2) +
              "%",
          },
        ];
      })
      .flat();

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "JobPositionData");
    XLSX.writeFile(wb, "JobPositionData.xlsx");
  };

  return (
    <>
      {tableYearJobPosition
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
              <Typography variant="h6">Job Position</Typography>
            </Box>
            <Grid container justifyContent="center" alignItems="center">
              <TableContainer
                component={Paper}
                sx={{ width: "auto", marginBottom: 2 }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Positions</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Managerial</TableCell>
                      <TableCell>
                        {yearData.employee.jobPosition.managerial}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.jobPosition.managerial / total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Supervisory</TableCell>
                      <TableCell>
                        {yearData.employee.jobPosition.supervisory}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.jobPosition.supervisory / total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Clerical</TableCell>
                      <TableCell>
                        {yearData.employee.jobPosition.clerical}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.jobPosition.clerical / total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Self-employed</TableCell>
                      <TableCell>
                        {yearData.employee.jobPosition.selfEmployed}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.jobPosition.selfEmployed / total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Others</TableCell>
                      <TableCell>
                        {yearData.employee.jobPosition.other}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.jobPosition.other / total) *
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

export default Table5;
