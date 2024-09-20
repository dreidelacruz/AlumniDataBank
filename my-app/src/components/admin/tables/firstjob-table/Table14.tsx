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

function Table14({ selectedYear }: any) {
  const [tableYearStayFirstJob, setTableYearStayFirstJob] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearStayFirstJob(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const totalArray = tableYearStayFirstJob
    .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
    .map(
      (yearData) =>
        yearData.firstJobDetail.stayFirstJob.lessThanAMonth +
        yearData.firstJobDetail.stayFirstJob.monthOneToThree +
        yearData.firstJobDetail.stayFirstJob.monthFourToSix +
        yearData.firstJobDetail.stayFirstJob.monthSevenToEleven +
        yearData.firstJobDetail.stayFirstJob.yearOneToTwo +
        yearData.firstJobDetail.stayFirstJob.yearTwoToThree +
        yearData.firstJobDetail.stayFirstJob.yearThreeToFour +
        yearData.firstJobDetail.stayFirstJob.others
    );

  const total = totalArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const exportToExcel = () => {
    const filteredData = tableYearStayFirstJob
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const total =
          yearData.firstJobDetail.stayFirstJob.lessThanAMonth +
          yearData.firstJobDetail.stayFirstJob.monthOneToThree +
          yearData.firstJobDetail.stayFirstJob.monthFourToSix +
          yearData.firstJobDetail.stayFirstJob.monthSevenToEleven +
          yearData.firstJobDetail.stayFirstJob.yearOneToTwo +
          yearData.firstJobDetail.stayFirstJob.yearTwoToThree +
          yearData.firstJobDetail.stayFirstJob.yearThreeToFour +
          yearData.firstJobDetail.stayFirstJob.others;

        const calculatePercentage = (value: any) =>
          ((value / total) * 100).toFixed(2) + "%";

        return [
          ["How long did you stay in your first job?", "", ""],
          ["Length of Time", "Frequency", "Percentage"],
          [
            "Less than a month",
            yearData.firstJobDetail.stayFirstJob.lessThanAMonth,
            calculatePercentage(
              yearData.firstJobDetail.stayFirstJob.lessThanAMonth
            ),
          ],
          [
            "1-3 months",
            yearData.firstJobDetail.stayFirstJob.monthOneToThree,
            calculatePercentage(
              yearData.firstJobDetail.stayFirstJob.monthOneToThree
            ),
          ],
          [
            "4-6 months",
            yearData.firstJobDetail.stayFirstJob.monthFourToSix,
            calculatePercentage(
              yearData.firstJobDetail.stayFirstJob.monthFourToSix
            ),
          ],
          [
            "7-11 months",
            yearData.firstJobDetail.stayFirstJob.monthSevenToEleven,
            calculatePercentage(
              yearData.firstJobDetail.stayFirstJob.monthSevenToEleven
            ),
          ],
          [
            "1-2 years",
            yearData.firstJobDetail.stayFirstJob.yearOneToTwo,
            calculatePercentage(
              yearData.firstJobDetail.stayFirstJob.yearOneToTwo
            ),
          ],
          [
            "2-3 years",
            yearData.firstJobDetail.stayFirstJob.yearTwoToThree,
            calculatePercentage(
              yearData.firstJobDetail.stayFirstJob.yearTwoToThree
            ),
          ],
          [
            "3-4 years",
            yearData.firstJobDetail.stayFirstJob.yearThreeToFour,
            calculatePercentage(
              yearData.firstJobDetail.stayFirstJob.yearThreeToFour
            ),
          ],
          [
            "Others",
            yearData.firstJobDetail.stayFirstJob.others,
            calculatePercentage(yearData.firstJobDetail.stayFirstJob.others),
          ],
        ];
      })
      .flat();

    const ws = XLSX.utils.aoa_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "StayFirstJobData");
    XLSX.writeFile(wb, "StayFirstJobData.xlsx");
  };

  return (
    <>
      {tableYearStayFirstJob
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
                How long did you stay in your first job?
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
                      <TableCell>Length of Time</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Less than a month</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.stayFirstJob.lessThanAMonth}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.stayFirstJob.lessThanAMonth /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1 to 3 months</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.stayFirstJob.monthOneToThree}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.stayFirstJob
                            .monthOneToThree /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4 to 6 months</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.stayFirstJob.monthFourToSix}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.stayFirstJob.monthFourToSix /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>7 to 11 months</TableCell>
                      <TableCell>
                        {
                          yearData.firstJobDetail.stayFirstJob
                            .monthSevenToEleven
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.stayFirstJob
                            .monthSevenToEleven /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1 to 2 years</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.stayFirstJob.yearOneToTwo}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.stayFirstJob.yearOneToTwo /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2 to 3 years</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.stayFirstJob.yearTwoToThree}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.stayFirstJob.yearTwoToThree /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3 to 4 years</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.stayFirstJob.yearThreeToFour}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.stayFirstJob
                            .yearThreeToFour /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Others</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.stayFirstJob.others}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.stayFirstJob.others /
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

export default Table14;
