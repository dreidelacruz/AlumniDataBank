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

function Table17({ selectedYear }: any) {
  const [tableYearCompetency, setTableYearCompetency] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearCompetency(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const totalArray = tableYearCompetency
    .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
    .map(
      (yearData) =>
        yearData.educationalDetail.compentencyLearningInCollege
          .communicationSkill +
        yearData.educationalDetail.compentencyLearningInCollege
          .criticalThinkingSkill +
        yearData.educationalDetail.compentencyLearningInCollege
          .humanRelationSkill +
        yearData.educationalDetail.compentencyLearningInCollege
          .entrepreneurialSkill +
        yearData.educationalDetail.compentencyLearningInCollege.itSkill +
        yearData.educationalDetail.compentencyLearningInCollege
          .problemSolvingSkill +
        yearData.educationalDetail.compentencyLearningInCollege.otherSkill
    );

  const total = totalArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const exportToExcel = () => {
    const filteredData = tableYearCompetency
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const total =
          yearData.educationalDetail.compentencyLearningInCollege
            .communicationSkill +
          yearData.educationalDetail.compentencyLearningInCollege
            .criticalThinkingSkill +
          yearData.educationalDetail.compentencyLearningInCollege
            .humanRelationSkill +
          yearData.educationalDetail.compentencyLearningInCollege
            .entrepreneurialSkill +
          yearData.educationalDetail.compentencyLearningInCollege.itSkill +
          yearData.educationalDetail.compentencyLearningInCollege
            .problemSolvingSkill +
          yearData.educationalDetail.compentencyLearningInCollege.otherSkill;

        const calculatePercentage = (value: any) =>
          ((value / total) * 100).toFixed(2) + "%";

        return [
          ["What Competencies learned in College?", "Frequency", "Percentage"],
          [
            "Communication Skill",
            yearData.educationalDetail.compentencyLearningInCollege
              .communicationSkill,
            calculatePercentage(
              yearData.educationalDetail.compentencyLearningInCollege
                .communicationSkill
            ),
          ],
          [
            "Critical Thinking Skill",
            yearData.educationalDetail.compentencyLearningInCollege
              .criticalThinkingSkill,
            calculatePercentage(
              yearData.educationalDetail.compentencyLearningInCollege
                .criticalThinkingSkill
            ),
          ],
          [
            "Human Relation Skill",
            yearData.educationalDetail.compentencyLearningInCollege
              .humanRelationSkill,
            calculatePercentage(
              yearData.educationalDetail.compentencyLearningInCollege
                .humanRelationSkill
            ),
          ],
          [
            "Entrepreneurial Skill",
            yearData.educationalDetail.compentencyLearningInCollege
              .entrepreneurialSkill,
            calculatePercentage(
              yearData.educationalDetail.compentencyLearningInCollege
                .entrepreneurialSkill
            ),
          ],
          [
            "IT Skill",
            yearData.educationalDetail.compentencyLearningInCollege.itSkill,
            calculatePercentage(
              yearData.educationalDetail.compentencyLearningInCollege.itSkill
            ),
          ],
          [
            "Problem Solving Skill",
            yearData.educationalDetail.compentencyLearningInCollege
              .problemSolvingSkill,
            calculatePercentage(
              yearData.educationalDetail.compentencyLearningInCollege
                .problemSolvingSkill
            ),
          ],
          [
            "Other Skills",
            yearData.educationalDetail.compentencyLearningInCollege.otherSkill,
            calculatePercentage(
              yearData.educationalDetail.compentencyLearningInCollege.otherSkill
            ),
          ],
        ];
      })
      .flat();

    const ws = XLSX.utils.aoa_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CompentencyInCollegeData");
    XLSX.writeFile(wb, "CompentencyInCollegeData.xlsx");
  };

  return (
    <>
      {tableYearCompetency
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
                What Competencies learned in College you find very useful
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
                      <TableCell>Competencies</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Communication Skill</TableCell>
                      <TableCell>
                        {
                          yearData.educationalDetail
                            .compentencyLearningInCollege.communicationSkill
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.educationalDetail
                            .compentencyLearningInCollege.communicationSkill /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Critical Thinking Skill</TableCell>
                      <TableCell>
                        {
                          yearData.educationalDetail
                            .compentencyLearningInCollege.criticalThinkingSkill
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.educationalDetail
                            .compentencyLearningInCollege
                            .criticalThinkingSkill /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Human Relation Skill</TableCell>
                      <TableCell>
                        {
                          yearData.educationalDetail
                            .compentencyLearningInCollege.humanRelationSkill
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.educationalDetail
                            .compentencyLearningInCollege.humanRelationSkill /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Entrepreneurial Skill</TableCell>
                      <TableCell>
                        {
                          yearData.educationalDetail
                            .compentencyLearningInCollege.entrepreneurialSkill
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.educationalDetail
                            .compentencyLearningInCollege.entrepreneurialSkill /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>IT Skill</TableCell>
                      <TableCell>
                        {
                          yearData.educationalDetail
                            .compentencyLearningInCollege.itSkill
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.educationalDetail
                            .compentencyLearningInCollege.itSkill /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Problem Solving Skill</TableCell>
                      <TableCell>
                        {
                          yearData.educationalDetail
                            .compentencyLearningInCollege.problemSolvingSkill
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.educationalDetail
                            .compentencyLearningInCollege.problemSolvingSkill /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Other Skill</TableCell>
                      <TableCell>
                        {
                          yearData.educationalDetail
                            .compentencyLearningInCollege.otherSkill
                        }
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.educationalDetail
                            .compentencyLearningInCollege.otherSkill /
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

export default Table17;
