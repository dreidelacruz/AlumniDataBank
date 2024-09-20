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

function Table12({ selectedYear }: any) {
  const [tableYearDiffEncounter, setTableYearDiffEncounter] = useState<any[]>(
    []
  );

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearDiffEncounter(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const totalArray = tableYearDiffEncounter
    .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
    .map(
      (yearData) =>
        yearData.firstJobDetail.difficultiesEncounterFirstJob.noAvailJob +
        yearData.firstJobDetail.difficultiesEncounterFirstJob.lackOfExp +
        yearData.firstJobDetail.difficultiesEncounterFirstJob.lowCompenOffer +
        yearData.firstJobDetail.difficultiesEncounterFirstJob
          .lowOpporAdvancement +
        yearData.firstJobDetail.difficultiesEncounterFirstJob.lackOfSkill +
        yearData.firstJobDetail.difficultiesEncounterFirstJob.other
    );

  const total = totalArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const exportToExcel = () => {
    const filteredData = tableYearDiffEncounter
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const total =
          yearData.firstJobDetail.difficultiesEncounterFirstJob.noAvailJob +
          yearData.firstJobDetail.difficultiesEncounterFirstJob.lackOfExp +
          yearData.firstJobDetail.difficultiesEncounterFirstJob.lowCompenOffer +
          yearData.firstJobDetail.difficultiesEncounterFirstJob
            .lowOpporAdvancement +
          yearData.firstJobDetail.difficultiesEncounterFirstJob.lackOfSkill +
          yearData.firstJobDetail.difficultiesEncounterFirstJob.other;

        const calculatePercentage = (value: any) =>
          ((value / total) * 100).toFixed(2) + "%";

        return [
          [
            " What are the difficulties you encounter in looking for your first job?",
            "Frequency",
            "Percentage",
          ],
          [
            "No Available Job",
            yearData.firstJobDetail.difficultiesEncounterFirstJob.noAvailJob,
            calculatePercentage(
              yearData.firstJobDetail.difficultiesEncounterFirstJob.noAvailJob
            ),
          ],
          [
            "Lack of Experience",
            yearData.firstJobDetail.difficultiesEncounterFirstJob.lackOfExp,
            calculatePercentage(
              yearData.firstJobDetail.difficultiesEncounterFirstJob.lackOfExp
            ),
          ],
          [
            "Low Compensation Offer",
            yearData.firstJobDetail.difficultiesEncounterFirstJob
              .lowCompenOffer,
            calculatePercentage(
              yearData.firstJobDetail.difficultiesEncounterFirstJob
                .lowCompenOffer
            ),
          ],
          [
            "Limited Opportunities for Advancement",
            yearData.firstJobDetail.difficultiesEncounterFirstJob
              .lowOpporAdvancement,
            calculatePercentage(
              yearData.firstJobDetail.difficultiesEncounterFirstJob
                .lowOpporAdvancement
            ),
          ],
          [
            "Lack of Skills",
            yearData.firstJobDetail.difficultiesEncounterFirstJob.lackOfSkill,
            calculatePercentage(
              yearData.firstJobDetail.difficultiesEncounterFirstJob.lackOfSkill
            ),
          ],
          [
            "Others",
            yearData.firstJobDetail.difficultiesEncounterFirstJob.other,
            calculatePercentage(
              yearData.firstJobDetail.difficultiesEncounterFirstJob.other
            ),
          ],
        ];
      })
      .flat();

    const ws = XLSX.utils.aoa_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DifficultiesYouEncounter");
    XLSX.writeFile(wb, "DifficultiesYouEncounterData.xlsx");
  };

  return (
    <>
      {tableYearDiffEncounter
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
                What are the difficulties you encounter in looking for your
                first job?
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
                      <TableCell>Difficulties</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>No available job</TableCell>
                      <TableCell>
                        {
                          yearData.firstJobDetail.difficultiesEncounterFirstJob
                            .noAvailJob
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.difficultiesEncounterFirstJob
                            .noAvailJob /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Lack of experience</TableCell>
                      <TableCell>
                        {
                          yearData.firstJobDetail.difficultiesEncounterFirstJob
                            .lackOfExp
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.difficultiesEncounterFirstJob
                            .lackOfExp /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Low compensation offer</TableCell>
                      <TableCell>
                        {
                          yearData.firstJobDetail.difficultiesEncounterFirstJob
                            .lowCompenOffer
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.difficultiesEncounterFirstJob
                            .lowCompenOffer /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Low opportunity advancement</TableCell>
                      <TableCell>
                        {
                          yearData.firstJobDetail.difficultiesEncounterFirstJob
                            .lowOpporAdvancement
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.difficultiesEncounterFirstJob
                            .lowOpporAdvancement /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Lack of Skills</TableCell>
                      <TableCell>
                        {
                          yearData.firstJobDetail.difficultiesEncounterFirstJob
                            .lackOfSkill
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.difficultiesEncounterFirstJob
                            .lackOfSkill /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Others</TableCell>
                      <TableCell>
                        {
                          yearData.firstJobDetail.difficultiesEncounterFirstJob
                            .other
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.firstJobDetail.difficultiesEncounterFirstJob
                            .other /
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

export default Table12;
