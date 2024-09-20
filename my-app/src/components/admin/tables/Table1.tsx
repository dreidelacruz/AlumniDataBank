import { Fragment, useEffect, useState } from "react";
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

interface YearData {
  id: string;
  graduatedSchoolYear: string;
  gender: {
    male: number;
    female: number;
  };
}

function Table1({ selectedYear }: any) {
  const [tableYearGender, setTableYearGender] = useState<YearData[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearGender(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const exportToExcel = () => {
    const filteredData = tableYearGender
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const malePercentage = (
          (yearData.gender.male /
            (yearData.gender.male + yearData.gender.female)) *
          100
        ).toFixed(2);
        const femalePercentage = (
          (yearData.gender.female /
            (yearData.gender.male + yearData.gender.female)) *
          100
        ).toFixed(2);

        return [
          {
            Gender: "Male",
            Frequency: yearData.gender.male,
            Percentage: malePercentage + "%",
          },
          {
            Gender: "Female",
            Frequency: yearData.gender.female,
            Percentage: femalePercentage + "%",
          },
        ];
      })
      .flat();

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "GenderData");
    XLSX.writeFile(wb, "GenderData.xlsx");
  };

  return (
    <>
      <Box sx={{ justifyContent: "center", alignItems: "center" }}>
        {tableYearGender
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
                <Typography variant="h6">Gender Table</Typography>
              </Box>
              <Grid container justifyContent="center" alignItems="center">
                <TableContainer
                  component={Paper}
                  sx={{ width: "auto", marginBottom: 2 }}
                >
                  <Table sx={{ width: 540 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Gender</TableCell>
                        <TableCell>Frequency</TableCell>
                        <TableCell>Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Male</TableCell>
                        <TableCell>{yearData.gender.male}</TableCell>
                        <TableCell>
                          {(
                            (yearData.gender.male /
                              (yearData.gender.male + yearData.gender.female)) *
                            100
                          ).toFixed(2)}
                          %
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Female</TableCell>
                        <TableCell>{yearData.gender.female}</TableCell>
                        <TableCell>
                          {(
                            (yearData.gender.female /
                              (yearData.gender.male + yearData.gender.female)) *
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
      </Box>
    </>
  );
}

export default Table1;
