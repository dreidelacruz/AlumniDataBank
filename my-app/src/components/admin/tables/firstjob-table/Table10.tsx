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

function Table10({ selectedYear }: any) {
  const [tableYearLandFirstJob, setTableYearLandFirstJob] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearLandFirstJob(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const totalArray = tableYearLandFirstJob
    .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
    .map(
      (yearData) =>
        yearData.firstJobDetail.landFirstJob.lessThanAMonth +
        yearData.firstJobDetail.landFirstJob.monthOneToThree +
        yearData.firstJobDetail.landFirstJob.monthFourToSix +
        yearData.firstJobDetail.landFirstJob.monthSevenToEleven +
        yearData.firstJobDetail.landFirstJob.yearOneToTwo +
        yearData.firstJobDetail.landFirstJob.yearTwoToThree +
        yearData.firstJobDetail.landFirstJob.yearThreeToFour +
        yearData.firstJobDetail.landFirstJob.others
    );

  const total = totalArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const exportToExcel = () => {
    const filteredData = tableYearLandFirstJob
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const total =
          yearData.firstJobDetail.landFirstJob.lessThanAMonth +
          yearData.firstJobDetail.landFirstJob.monthOneToThree +
          yearData.firstJobDetail.landFirstJob.monthFourToSix +
          yearData.firstJobDetail.landFirstJob.monthSevenToEleven +
          yearData.firstJobDetail.landFirstJob.yearOneToTwo +
          yearData.firstJobDetail.landFirstJob.yearTwoToThree +
          yearData.firstJobDetail.landFirstJob.yearThreeToFour +
          yearData.firstJobDetail.landFirstJob.others;

        const calculatePercentage = (value: any) =>
          ((value / total) * 100).toFixed(2) + "%";

        return [
          ["How long did it take to land your first job?", "", ""],
          ["Length of Time", "Frequency", "Percentage"],
          [
            "Less than a month",
            yearData.firstJobDetail.landFirstJob.lessThanAMonth,
            calculatePercentage(
              yearData.firstJobDetail.landFirstJob.lessThanAMonth
            ),
          ],
          [
            "1-3 months",
            yearData.firstJobDetail.landFirstJob.monthOneToThree,
            calculatePercentage(
              yearData.firstJobDetail.landFirstJob.monthOneToThree
            ),
          ],
          [
            "4-6 months",
            yearData.firstJobDetail.landFirstJob.monthFourToSix,
            calculatePercentage(
              yearData.firstJobDetail.landFirstJob.monthFourToSix
            ),
          ],
          [
            "7-11 months",
            yearData.firstJobDetail.landFirstJob.monthSevenToEleven,
            calculatePercentage(
              yearData.firstJobDetail.landFirstJob.monthSevenToEleven
            ),
          ],
          [
            "1-2 years",
            yearData.firstJobDetail.landFirstJob.yearOneToTwo,
            calculatePercentage(
              yearData.firstJobDetail.landFirstJob.yearOneToTwo
            ),
          ],
          [
            "2-3 years",
            yearData.firstJobDetail.landFirstJob.yearTwoToThree,
            calculatePercentage(
              yearData.firstJobDetail.landFirstJob.yearTwoToThree
            ),
          ],
          [
            "3-4 years",
            yearData.firstJobDetail.landFirstJob.yearThreeToFour,
            calculatePercentage(
              yearData.firstJobDetail.landFirstJob.yearThreeToFour
            ),
          ],
          [
            "Others",
            yearData.firstJobDetail.landFirstJob.others,
            calculatePercentage(yearData.firstJobDetail.landFirstJob.others),
          ],
        ];
      })
      .flat();

    const ws = XLSX.utils.aoa_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TimeToLandFirstJob");
    XLSX.writeFile(wb, "TimeToLandFirstJob.xlsx");
  };

  return (
    <>
      {tableYearLandFirstJob
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
                How long did it take to land your first job?
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
                        {yearData.firstJobDetail.landFirstJob.lessThanAMonth}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.landFirstJob.lessThanAMonth /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1 to 3 months</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.landFirstJob.monthOneToThree}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.landFirstJob
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
                        {yearData.firstJobDetail.landFirstJob.monthFourToSix}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.landFirstJob.monthFourToSix /
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
                          yearData.firstJobDetail.landFirstJob
                            .monthSevenToEleven
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.landFirstJob
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
                        {yearData.firstJobDetail.landFirstJob.yearOneToTwo}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.landFirstJob.yearOneToTwo /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2 to 3 years</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.landFirstJob.yearTwoToThree}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.landFirstJob.yearTwoToThree /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3 to 4 years</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.landFirstJob.yearThreeToFour}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.landFirstJob
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
                        {yearData.firstJobDetail.landFirstJob.others}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.landFirstJob.others /
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

export default Table10;
