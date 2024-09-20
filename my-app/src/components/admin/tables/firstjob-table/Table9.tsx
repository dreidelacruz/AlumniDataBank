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

function Table9({ selectedYear }: any) {
  const [tableYearRelatedFirstJob, setTableYearRelatedFirstJob] = useState<
    any[]
  >([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearRelatedFirstJob(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const exportToExcel = () => {
    const filteredData = tableYearRelatedFirstJob
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const yesPercentage = (
          (yearData.firstJobDetail.firstJobRelatedCourse.yes /
            (yearData.firstJobDetail.firstJobRelatedCourse.yes +
              yearData.firstJobDetail.firstJobRelatedCourse.no)) *
          100
        ).toFixed(2);
        const noPercentage = (
          (yearData.firstJobDetail.firstJobRelatedCourse.no /
            (yearData.firstJobDetail.firstJobRelatedCourse.yes +
              yearData.firstJobDetail.firstJobRelatedCourse.no)) *
          100
        ).toFixed(2);

        return [
          ["Is your first job Related to your course?", "", ""],
          ["Y/N", "Frequency", "Percentage"],
          [
            "Yes",
            yearData.firstJobDetail.firstJobRelatedCourse.yes,
            yesPercentage + "%",
          ],
          [
            "No",
            yearData.firstJobDetail.firstJobRelatedCourse.no,
            noPercentage + "%",
          ],
        ];
      })
      .flat();

    const ws = XLSX.utils.aoa_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FirstJobRelatedToYourCourseData");
    XLSX.writeFile(wb, "FirstJobRelatedToYourCourseData.xlsx");
  };

  return (
    <>
      {tableYearRelatedFirstJob
        .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
        .map((yearData) => (
          <Fragment key={yearData.id}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 5 }}>
              First Job Details
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
              <Typography variant="h6">
                Is your first job Related to your course?
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
                        {yearData.firstJobDetail.firstJobRelatedCourse.yes}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.firstJobRelatedCourse.yes /
                            (yearData.firstJobDetail.firstJobRelatedCourse.yes +
                              yearData.firstJobDetail.firstJobRelatedCourse
                                .no)) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>no</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.firstJobRelatedCourse.no}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.firstJobRelatedCourse.no /
                            (yearData.firstJobDetail.firstJobRelatedCourse.yes +
                              yearData.firstJobDetail.firstJobRelatedCourse
                                .no)) *
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

export default Table9;
