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

function Table16({ selectedYear }: any) {
  const [
    tableYearPresentJobRelatedCourse,
    setTableYearPresentJobRelatedCourse,
  ] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearPresentJobRelatedCourse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const exportToExcel = () => {
    const filteredData = tableYearPresentJobRelatedCourse
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const yesPercentage = (
          (yearData.educationalDetail.presentJobRelatedCourse.yes /
            (yearData.educationalDetail.presentJobRelatedCourse.yes +
              yearData.educationalDetail.presentJobRelatedCourse.no)) *
          100
        ).toFixed(2);
        const noPercentage = (
          (yearData.educationalDetail.presentJobRelatedCourse.no /
            (yearData.educationalDetail.presentJobRelatedCourse.yes +
              yearData.educationalDetail.presentJobRelatedCourse.no)) *
          100
        ).toFixed(2);

        return [
          ["Is your present job Related to your course?", "", ""],
          ["Y/N", "Frequency", "Percentage"],
          [
            "Yes",
            yearData.educationalDetail.presentJobRelatedCourse.yes,
            yesPercentage + "%",
          ],
          [
            "No",
            yearData.educationalDetail.presentJobRelatedCourse.no,
            noPercentage + "%",
          ],
        ];
      })
      .flat();

    const ws = XLSX.utils.aoa_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PresentJobRelatedCourseData");
    XLSX.writeFile(wb, "PresentJobRelatedCourseData.xlsx");
  };

  return (
    <>
      {tableYearPresentJobRelatedCourse
        .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
        .map((yearData) => (
          <Fragment key={yearData.id}>
            <Typography variant="h5" fontWeight="bold" sx={{mb:5}}>Education Details</Typography>
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
                Is your present job Related to your course?
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
                      {yearData.educationalDetail.presentJobRelatedCourse.yes}
                    </TableCell>
                    <TableCell>
                      {(
                        (yearData.educationalDetail.presentJobRelatedCourse
                          .yes /
                          (yearData.educationalDetail.presentJobRelatedCourse
                            .yes +
                            yearData.educationalDetail.presentJobRelatedCourse
                              .no)) *
                        100
                      ).toFixed(2)}
                      %
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>no</TableCell>
                    <TableCell>
                      {yearData.educationalDetail.presentJobRelatedCourse.no}
                    </TableCell>
                    <TableCell>
                      {(
                        (yearData.educationalDetail.presentJobRelatedCourse.no /
                          (yearData.educationalDetail.presentJobRelatedCourse
                            .yes +
                            yearData.educationalDetail.presentJobRelatedCourse
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

export default Table16;
