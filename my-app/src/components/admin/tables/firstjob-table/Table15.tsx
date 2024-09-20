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

function Table15({ selectedYear }: any) {
  const [tableYearReasonTakingFirstJob, setTableYearReasonTakingFirstJob] =
    useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearReasonTakingFirstJob(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const totalArray = tableYearReasonTakingFirstJob
    .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
    .map(
      (yearData) =>
        yearData.firstJobDetail.reasonTakingFirstJob.salary +
        yearData.firstJobDetail.reasonTakingFirstJob.careerChallenge +
        yearData.firstJobDetail.reasonTakingFirstJob.relatedSpecialSkil +
        yearData.firstJobDetail.reasonTakingFirstJob.proximtyMyResidence +
        yearData.firstJobDetail.reasonTakingFirstJob.other
    );

  const total = totalArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const exportToExcel = () => {
    const filteredData = tableYearReasonTakingFirstJob
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const total =
        yearData.firstJobDetail.reasonTakingFirstJob.salary +
        yearData.firstJobDetail.reasonTakingFirstJob.careerChallenge +
        yearData.firstJobDetail.reasonTakingFirstJob.relatedSpecialSkil +
        yearData.firstJobDetail.reasonTakingFirstJob.proximtyMyResidence +
        yearData.firstJobDetail.reasonTakingFirstJob.other

        const calculatePercentage = (value: any) =>
          ((value / total) * 100).toFixed(2) + "%";

        return [
          ["Reasons for taking your first job", "", ""],
          ["Reasons", "Frequency", "Percentage"],
          [
            "Salary",
            yearData.firstJobDetail.reasonTakingFirstJob.salary,
            calculatePercentage(yearData.firstJobDetail.reasonTakingFirstJob.salary),
          ],
          [
            "Career Challenge",
            yearData.firstJobDetail.reasonTakingFirstJob.careerChallenge,
            calculatePercentage(yearData.firstJobDetail.reasonTakingFirstJob.careerChallenge),
          ],
          [
            "Related to Special Skill",
            yearData.firstJobDetail.reasonTakingFirstJob.relatedSpecialSkil,
            calculatePercentage(yearData.firstJobDetail.reasonTakingFirstJob.relatedSpecialSkil),
          ],
          [
            "Proximity to My Residence",
            yearData.firstJobDetail.reasonTakingFirstJob.proximtyMyResidence,
            calculatePercentage(yearData.firstJobDetail.reasonTakingFirstJob.proximtyMyResidence),
          ],
          [
            "Others",
            yearData.firstJobDetail.reasonTakingFirstJob.other,
            calculatePercentage(yearData.firstJobDetail.reasonTakingFirstJob.other),
          ],
        ];
      })
      .flat();

    const ws = XLSX.utils.aoa_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ReasonsForFirstJobData");
    XLSX.writeFile(wb, "ReasonsForFirstJobData.xlsx");
  };

  return (
    <>
      {tableYearReasonTakingFirstJob
        .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
        .map((yearData) => (
          <Fragment key={yearData.id}>
                  <Stack>
        <Button size="small" endIcon={<SaveAlt />} onClick={exportToExcel}>
          export to excel
        </Button>
      </Stack>
            <Box>
              <Typography variant="h6">Reasons for taking your first job</Typography>
            </Box>
            <Grid container justifyContent="center" alignItems="center">
              <TableContainer
                component={Paper}
                sx={{ width: "auto", marginBottom: 2 }}
              >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Frequency</TableCell>
                    <TableCell>Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Salary</TableCell>
                    <TableCell>
                      {yearData.firstJobDetail.reasonTakingFirstJob.salary}
                    </TableCell>
                    <TableCell>
                      {(
                        (yearData.firstJobDetail.reasonTakingFirstJob
                          .salary /
                          total) *
                        100
                      ).toFixed(2)}
                      %
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Carrer Challenge</TableCell>
                    <TableCell>
                      {yearData.firstJobDetail.reasonTakingFirstJob.careerChallenge}
                    </TableCell>
                    <TableCell>
                      {(
                        (yearData.firstJobDetail.reasonTakingFirstJob
                          .careerChallenge /
                          total) *
                        100
                      ).toFixed(2)}
                      %
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Related to my Special Skills</TableCell>
                    <TableCell>
                      {
                        yearData.firstJobDetail.reasonTakingFirstJob
                          .relatedSpecialSkil
                      }
                    </TableCell>
                    <TableCell>
                      {(
                        (yearData.firstJobDetail.reasonTakingFirstJob
                          .relatedSpecialSkil /
                          total) *
                        100
                      ).toFixed(2)}
                      %
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Proximity to my Residence</TableCell>
                    <TableCell>
                      {
                        yearData.firstJobDetail.reasonTakingFirstJob
                          .proximtyMyResidence
                      }
                    </TableCell>
                    <TableCell>
                      {(
                        (yearData.firstJobDetail.reasonTakingFirstJob
                          .proximtyMyResidence /
                          total) *
                        100
                      ).toFixed(2)}
                      %
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Others</TableCell>
                    <TableCell>
                      {yearData.firstJobDetail.reasonTakingFirstJob.other}
                    </TableCell>
                    <TableCell>
                      {(
                        (yearData.firstJobDetail.reasonTakingFirstJob.other /
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

export default Table15;
