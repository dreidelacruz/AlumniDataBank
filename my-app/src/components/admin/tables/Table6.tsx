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

function Table6({ selectedYear }: any) {
  const [tableYearEmpStatus, setTableYearEmpStatus] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearEmpStatus(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const totalArray = tableYearEmpStatus
    .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
    .map(
      (yearData) =>
        yearData.employee.employmentStatus.regular +
        yearData.employee.employmentStatus.temporary +
        yearData.employee.employmentStatus.casual +
        yearData.employee.employmentStatus.contractual +
        yearData.employee.employmentStatus.partTime +
        yearData.employee.employmentStatus.probitionary
    );

  const total = totalArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const exportToExcel = () => {
    const filteredData = tableYearEmpStatus
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const totalArray = tableYearEmpStatus
          .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
          .map(
            (yearData) =>
              yearData.employee.employmentStatus.regular +
              yearData.employee.employmentStatus.temporary +
              yearData.employee.employmentStatus.casual +
              yearData.employee.employmentStatus.contractual +
              yearData.employee.employmentStatus.partTime +
              yearData.employee.employmentStatus.probitionary
          );

        const total = totalArray.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );

        return [
          {
            EmploymentStatus: "Regular",
            Frequency: yearData.employee.employmentStatus.regular,
            Percentage:
              (
                (yearData.employee.employmentStatus.regular / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            EmploymentStatus: "Temporary",
            Frequency: yearData.employee.employmentStatus.temporary,
            Percentage:
              (
                (yearData.employee.employmentStatus.temporary / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            EmploymentStatus: "Casual",
            Frequency: yearData.employee.employmentStatus.casual,
            Percentage:
              (
                (yearData.employee.employmentStatus.casual / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            EmploymentStatus: "Contractual",
            Frequency: yearData.employee.employmentStatus.contractual,
            Percentage:
              (
                (yearData.employee.employmentStatus.contractual / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            EmploymentStatus: "Part-time",
            Frequency: yearData.employee.employmentStatus.partTime,
            Percentage:
              (
                (yearData.employee.employmentStatus.partTime / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            EmploymentStatus: "Probitionary",
            Frequency: yearData.employee.employmentStatus.probitionary,
            Percentage:
              (
                (yearData.employee.employmentStatus.probitionary / total) *
                100
              ).toFixed(2) + "%",
          },
        ];
      })
      .flat();

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "EmploymentStatusData");
    XLSX.writeFile(wb, "EmploymentStatusData.xlsx");
  };

  return (
    <>
      {tableYearEmpStatus
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
              <Typography variant="h6">Employment Status</Typography>
            </Box>
            <Grid container justifyContent="center" alignItems="center">
              <TableContainer
                component={Paper}
                sx={{ width: "auto", marginBottom: 2 }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Statuses</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Regular</TableCell>
                      <TableCell>
                        {yearData.employee.employmentStatus.regular}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.employmentStatus.regular / total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Temporary</TableCell>
                      <TableCell>
                        {yearData.employee.employmentStatus.temporary}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.employmentStatus.temporary /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Casual</TableCell>
                      <TableCell>
                        {yearData.employee.employmentStatus.casual}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.employmentStatus.casual / total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Contractual</TableCell>
                      <TableCell>
                        {yearData.employee.employmentStatus.contractual}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.employmentStatus.contractual /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Part-time</TableCell>
                      <TableCell>
                        {yearData.employee.employmentStatus.partTime}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.employmentStatus.partTime /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Probitionary</TableCell>
                      <TableCell>
                        {yearData.employee.employmentStatus.probitionary}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.employmentStatus.probitionary /
                            total) *
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

export default Table6;
