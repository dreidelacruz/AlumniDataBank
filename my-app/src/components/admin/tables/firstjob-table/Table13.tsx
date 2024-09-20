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

function Table13({ selectedYear }: any) {
  const [tableYearCurrentFirstJob, setTableYearCurrentFirstJob] = useState<
    any[]
  >([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearCurrentFirstJob(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const exportToExcel = () => {
    const filteredData = tableYearCurrentFirstJob
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const yesPercentage = (
          (yearData.firstJobDetail.currentFirstJob.yes /
            (yearData.firstJobDetail.currentFirstJob.yes +
              yearData.firstJobDetail.currentFirstJob.no)) *
          100
        ).toFixed(2);
        const noPercentage = (
          (yearData.firstJobDetail.currentFirstJob.no /
            (yearData.firstJobDetail.currentFirstJob.yes +
              yearData.firstJobDetail.currentFirstJob.no)) *
          100
        ).toFixed(2);

        return [
          ["Are you currently in your first job?", "", ""],
          ["Y/N", "Frequency", "Percentage"],
          [
            "Yes",
            yearData.firstJobDetail.currentFirstJob.yes,
            yesPercentage + "%",
          ],
          [
            "No",
            yearData.firstJobDetail.currentFirstJob.no,
            noPercentage + "%",
          ],
        ];
      })
      .flat();

    const ws = XLSX.utils.aoa_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CurrentFirstJobData");
    XLSX.writeFile(wb, "CurrentFirstJobData.xlsx");
  };

  return (
    <>
      {tableYearCurrentFirstJob
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
                Are you currently in your first job?
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
                        {yearData.firstJobDetail.currentFirstJob.yes}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.currentFirstJob.yes /
                            (yearData.firstJobDetail.currentFirstJob.yes +
                              yearData.firstJobDetail.currentFirstJob.no)) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>no</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.currentFirstJob.no}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.currentFirstJob.no /
                            (yearData.firstJobDetail.currentFirstJob.yes +
                              yearData.firstJobDetail.currentFirstJob.no)) *
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

export default Table13;
