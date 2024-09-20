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

function Table11({ selectedYear }: any) {
  const [tableYearFindFirstJob, setTableYearFindFirstJob] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearFindFirstJob(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const totalArray = tableYearFindFirstJob
    .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
    .map(
      (yearData) =>
        yearData.firstJobDetail.findFirstJob.toAnAdvertisement +
        yearData.firstJobDetail.findFirstJob.asWalkInApplicant +
        yearData.firstJobDetail.findFirstJob.recommendedBySomeone +
        yearData.firstJobDetail.findFirstJob.informationFromFriends +
        yearData.firstJobDetail.findFirstJob.arrangedByTheSchool +
        yearData.firstJobDetail.findFirstJob.familyBusiness +
        yearData.firstJobDetail.findFirstJob.jobFairForPeso +
        yearData.firstJobDetail.findFirstJob.other
    );

  const total = totalArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const exportToExcel = () => {
    const filteredData = tableYearFindFirstJob
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const total =
          yearData.firstJobDetail.findFirstJob.toAnAdvertisement +
          yearData.firstJobDetail.findFirstJob.asWalkInApplicant +
          yearData.firstJobDetail.findFirstJob.recommendedBySomeone +
          yearData.firstJobDetail.findFirstJob.informationFromFriends +
          yearData.firstJobDetail.findFirstJob.arrangedByTheSchool +
          yearData.firstJobDetail.findFirstJob.familyBusiness +
          yearData.firstJobDetail.findFirstJob.jobFairForPeso +
          yearData.firstJobDetail.findFirstJob.other;

        const calculatePercentage = (value: any) =>
          ((value / total) * 100).toFixed(2) + "%";

        return [
          ["How did you find your first job?", "Frequency", "Percentage"],
          [
            "To an Advertisement",
            yearData.firstJobDetail.findFirstJob.toAnAdvertisement,
            calculatePercentage(
              yearData.firstJobDetail.findFirstJob.toAnAdvertisement
            ),
          ],
          [
            "As a Walk-in Applicant",
            yearData.firstJobDetail.findFirstJob.asWalkInApplicant,
            calculatePercentage(
              yearData.firstJobDetail.findFirstJob.asWalkInApplicant
            ),
          ],
          [
            "Recommended by Someone",
            yearData.firstJobDetail.findFirstJob.recommendedBySomeone,
            calculatePercentage(
              yearData.firstJobDetail.findFirstJob.recommendedBySomeone
            ),
          ],
          [
            "Information from Friends",
            yearData.firstJobDetail.findFirstJob.informationFromFriends,
            calculatePercentage(
              yearData.firstJobDetail.findFirstJob.informationFromFriends
            ),
          ],
          [
            "Arranged by the School",
            yearData.firstJobDetail.findFirstJob.arrangedByTheSchool,
            calculatePercentage(
              yearData.firstJobDetail.findFirstJob.arrangedByTheSchool
            ),
          ],
          [
            "Family Business",
            yearData.firstJobDetail.findFirstJob.familyBusiness,
            calculatePercentage(
              yearData.firstJobDetail.findFirstJob.familyBusiness
            ),
          ],
          [
            "Job Fair for Peso",
            yearData.firstJobDetail.findFirstJob.jobFairForPeso,
            calculatePercentage(
              yearData.firstJobDetail.findFirstJob.jobFairForPeso
            ),
          ],
          [
            "Others",
            yearData.firstJobDetail.findFirstJob.other,
            calculatePercentage(yearData.firstJobDetail.findFirstJob.other),
          ],
        ];
      })
      .flat();

    const ws = XLSX.utils.aoa_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FindJobData");
    XLSX.writeFile(wb, "FindJobData.xlsx");
  };

  return (
    <>
      {tableYearFindFirstJob
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
                How did you find your first job?
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
                      <TableCell>Ways</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>To an advertisement</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.findFirstJob.toAnAdvertisement}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.findFirstJob
                            .toAnAdvertisement /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>As a walk-in applicant</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.findFirstJob.asWalkInApplicant}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.findFirstJob
                            .asWalkInApplicant /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Recommended by someone</TableCell>
                      <TableCell>
                        {
                          yearData.firstJobDetail.findFirstJob
                            .recommendedBySomeone
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.findFirstJob
                            .recommendedBySomeone /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Information from friends</TableCell>
                      <TableCell>
                        {
                          yearData.firstJobDetail.findFirstJob
                            .informationFromFriends
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.findFirstJob
                            .informationFromFriends /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Arranged by the school</TableCell>
                      <TableCell>
                        {
                          yearData.firstJobDetail.findFirstJob
                            .arrangedByTheSchool
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.findFirstJob
                            .arrangedByTheSchool /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Family Business</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.findFirstJob.familyBusiness}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.findFirstJob.familyBusiness /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Job fair for public employment service office
                      </TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.findFirstJob.jobFairForPeso}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.findFirstJob.jobFairForPeso /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Others</TableCell>
                      <TableCell>
                        {yearData.firstJobDetail.findFirstJob.other}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.findFirstJob.other / total) *
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

export default Table11;
