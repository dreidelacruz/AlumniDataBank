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

function Table8({ selectedYear }: any) {
  const [tableYearReasonsForUnemploy, setTableYearReasonsForUnemploy] =
    useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearReasonsForUnemploy(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const totalArray = tableYearReasonsForUnemploy
    .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
    .map(
      (yearData) =>
        yearData.employee.reasonForUnemployed.pursingAdvanceStudies +
        yearData.employee.reasonForUnemployed.familyConcern +
        yearData.employee.reasonForUnemployed.healthReason +
        yearData.employee.reasonForUnemployed.lackOfExp +
        yearData.employee.reasonForUnemployed.inadeqSkill +
        yearData.employee.reasonForUnemployed.noJobOpport +
        yearData.employee.reasonForUnemployed.didNotLookForJob +
        yearData.employee.reasonForUnemployed.lackOfInterest +
        yearData.employee.reasonForUnemployed.unsatisfactoryOffer +
        yearData.employee.reasonForUnemployed.other
    );

  const total = totalArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const exportToExcel = () => {
    const filteredData = tableYearReasonsForUnemploy
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const totalArray = tableYearReasonsForUnemploy
          .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
          .map(
            (yearData) =>
              yearData.employee.reasonForUnemployed.pursingAdvanceStudies +
              yearData.employee.reasonForUnemployed.familyConcern +
              yearData.employee.reasonForUnemployed.healthReason +
              yearData.employee.reasonForUnemployed.lackOfExp +
              yearData.employee.reasonForUnemployed.inadeqSkill +
              yearData.employee.reasonForUnemployed.noJobOpport +
              yearData.employee.reasonForUnemployed.didNotLookForJob +
              yearData.employee.reasonForUnemployed.lackOfInterest +
              yearData.employee.reasonForUnemployed.unsatisfactoryOffer +
              yearData.employee.reasonForUnemployed.other
          );

        const total = totalArray.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );

        return [
          {
            ReasonsForUnemployment: "Pursuing Advance Studies",
            Frequency:
              yearData.employee.reasonForUnemployed.pursingAdvanceStudies,
            Percentage:
              (
                (yearData.employee.reasonForUnemployed.pursingAdvanceStudies /
                  total) *
                100
              ).toFixed(2) + "%",
          },
          {
            ReasonsForUnemployment: "Family Concern",
            Frequency: yearData.employee.reasonForUnemployed.familyConcern,
            Percentage:
              (
                (yearData.employee.reasonForUnemployed.familyConcern / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            ReasonsForUnemployment: "Health Reasons",
            Frequency: yearData.employee.reasonForUnemployed.healthReason,
            Percentage:
              (
                (yearData.employee.reasonForUnemployed.healthReason / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            ReasonsForUnemployment: "Lack of Experience",
            Frequency: yearData.employee.reasonForUnemployed.lackOfExp,
            Percentage:
              (
                (yearData.employee.reasonForUnemployed.lackOfExp / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            ReasonsForUnemployment: "Inadequate Skills",
            Frequency: yearData.employee.reasonForUnemployed.inadeqSkill,
            Percentage:
              (
                (yearData.employee.reasonForUnemployed.inadeqSkill / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            ReasonsForUnemployment: "No Job Opportunity",
            Frequency: yearData.employee.reasonForUnemployed.noJobOpport,
            Percentage:
              (
                (yearData.employee.reasonForUnemployed.noJobOpport / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            ReasonsForUnemployment: "Did Not Look For Job",
            Frequency: yearData.employee.reasonForUnemployed.didNotLookForJob,
            Percentage:
              (
                (yearData.employee.reasonForUnemployed.didNotLookForJob /
                  total) *
                100
              ).toFixed(2) + "%",
          },
          {
            ReasonsForUnemployment: "Lack Of Interest",
            Frequency: yearData.employee.reasonForUnemployed.lackOfInterest,
            Percentage:
              (
                (yearData.employee.reasonForUnemployed.lackOfInterest / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            ReasonsForUnemployment: "Unsatisfactory Offer",
            Frequency:
              yearData.employee.reasonForUnemployed.unsatisfactoryOffer,
            Percentage:
              (
                (yearData.employee.reasonForUnemployed.unsatisfactoryOffer /
                  total) *
                100
              ).toFixed(2) + "%",
          },
          {
            ReasonsForUnemployment: "Others",
            Frequency: yearData.employee.reasonForUnemployed.other,
            Percentage:
              (
                (yearData.employee.reasonForUnemployed.other / total) *
                100
              ).toFixed(2) + "%",
          },
        ];
      })
      .flat();

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ReasonsForUnemploymentData");
    XLSX.writeFile(wb, "ReasonsForUnemploymentData.xlsx");
  };

  return (
    <>
      {tableYearReasonsForUnemploy
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
                Please state your reasons for unemployment
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
                      <TableCell>Reasons</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Pursuing Advance Studies</TableCell>
                      <TableCell>
                        {
                          yearData.employee.reasonForUnemployed
                            .pursingAdvanceStudies
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.reasonForUnemployed
                            .pursingAdvanceStudies /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Family Concerns</TableCell>
                      <TableCell>
                        {yearData.employee.reasonForUnemployed.familyConcern}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.reasonForUnemployed.familyConcern /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Health Reasons</TableCell>
                      <TableCell>
                        {yearData.employee.reasonForUnemployed.healthReason}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.reasonForUnemployed.healthReason /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Lack of Experience</TableCell>
                      <TableCell>
                        {yearData.employee.reasonForUnemployed.lackOfExp}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.reasonForUnemployed.lackOfExp /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Inadequate Skills</TableCell>
                      <TableCell>
                        {yearData.employee.reasonForUnemployed.inadeqSkill}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.reasonForUnemployed.inadeqSkill /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>No Job Opportunities</TableCell>
                      <TableCell>
                        {yearData.employee.reasonForUnemployed.noJobOpport}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.reasonForUnemployed.noJobOpport /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Did not look for a Job</TableCell>
                      <TableCell>
                        {yearData.employee.reasonForUnemployed.didNotLookForJob}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.reasonForUnemployed
                            .didNotLookForJob /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Lack of Interest</TableCell>
                      <TableCell>
                        {yearData.employee.reasonForUnemployed.lackOfInterest}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.reasonForUnemployed
                            .lackOfInterest /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Unsatisfactory Offer</TableCell>
                      <TableCell>
                        {
                          yearData.employee.reasonForUnemployed
                            .unsatisfactoryOffer
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.reasonForUnemployed
                            .unsatisfactoryOffer /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Others</TableCell>
                      <TableCell>
                        {yearData.employee.reasonForUnemployed.other}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.reasonForUnemployed.other /
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

export default Table8;
