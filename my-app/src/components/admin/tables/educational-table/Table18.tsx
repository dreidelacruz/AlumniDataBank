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

function Table18({ selectedYear }: any) {
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
        yearData.educationalDetail.ged.score1 +
        yearData.educationalDetail.ged.score2 +
        yearData.educationalDetail.ged.score3 +
        yearData.educationalDetail.ged.score4 +
        yearData.educationalDetail.ged.score5
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
          yearData.educationalDetail.ged.score1 +
          yearData.educationalDetail.ged.score2 +
          yearData.educationalDetail.ged.score3 +
          yearData.educationalDetail.ged.score4 +
          yearData.educationalDetail.ged.score5;

        const calculatePercentage = (value: any) =>
          ((value / total) * 100).toFixed(2) + "%";

        return [
          ["General Subjects", "Frequency", "Percentage"],
          [
            "Score 1",
            yearData.educationalDetail.ged.score1,
            calculatePercentage(yearData.educationalDetail.ged.score1),
          ],
          [
            "Score 2",
            yearData.educationalDetail.ged.score2,
            calculatePercentage(yearData.educationalDetail.ged.score2),
          ],
          [
            "Score 3",
            yearData.educationalDetail.ged.score3,
            calculatePercentage(yearData.educationalDetail.ged.score3),
          ],
          [
            "Score 4",
            yearData.educationalDetail.ged.score4,
            calculatePercentage(yearData.educationalDetail.ged.score4),
          ],
          [
            "Score 5",
            yearData.educationalDetail.ged.score5,
            calculatePercentage(yearData.educationalDetail.ged.score5),
          ],
        ];
      })
      .flat();

    const ws = XLSX.utils.aoa_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "GedData");
    XLSX.writeFile(wb, "GedData.xlsx");
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
              <Typography variant="h6">General Subjects</Typography>
            </Box>
            <Grid container justifyContent="center" alignItems="center">
              <TableContainer
                component={Paper}
                sx={{ width: "auto", marginBottom: 2 }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Score</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>
                        {yearData.educationalDetail.ged.score1}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.educationalDetail.ged.score1 / total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>
                        {yearData.educationalDetail.ged.score2}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.educationalDetail.ged.score2 / total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>
                        {yearData.educationalDetail.ged.score3}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.educationalDetail.ged.score3 / total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4</TableCell>
                      <TableCell>
                        {yearData.educationalDetail.ged.score4}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.educationalDetail.ged.score4 / total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5</TableCell>
                      <TableCell>
                        {yearData.educationalDetail.ged.score5}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.educationalDetail.ged.score5 / total) *
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

export default Table18;
