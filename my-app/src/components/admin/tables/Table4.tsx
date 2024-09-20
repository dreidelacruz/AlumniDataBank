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

function Table4({ selectedYear }: any) {
  const [tableYearCompanyType, setTableYearCompanyType] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://localhost:5001/api/Year")
      .then((response: any) => {
        setTableYearCompanyType(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!selectedYear) {
    return null;
  }

  const totalArray = tableYearCompanyType
    .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
    .map(
      (yearData) =>
        yearData.employee.companyType.bpoIndustry +
        yearData.employee.companyType.educationalInstitution +
        yearData.employee.companyType.multinationalCompany +
        yearData.employee.companyType.bankingInstitution +
        yearData.employee.companyType.govermentOffices +
        yearData.employee.companyType.privateInstitution +
        yearData.employee.companyType.itIndustry +
        yearData.employee.companyType.insurances +
        yearData.employee.companyType.communicationCompany +
        yearData.employee.companyType.other
    );

  const total = totalArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const exportToExcel = () => {
    const filteredData = tableYearCompanyType
      .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
      .map((yearData) => {
        const totalArray = tableYearCompanyType
          .filter((yearData) => yearData.graduatedSchoolYear === selectedYear)
          .map(
            (yearData) =>
              yearData.employee.companyType.bpoIndustry +
              yearData.employee.companyType.educationalInstitution +
              yearData.employee.companyType.multinationalCompany +
              yearData.employee.companyType.bankingInstitution +
              yearData.employee.companyType.govermentOffices +
              yearData.employee.companyType.privateInstitution +
              yearData.employee.companyType.itIndustry +
              yearData.employee.companyType.insurances +
              yearData.employee.companyType.communicationCompany +
              yearData.employee.companyType.other
          );

        const total = totalArray.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );

        return [
          {
            CompanyType: "BPO Industry",
            Frequency: yearData.employee.companyType.bpoIndustry,
            Percentage:
              (
                (yearData.employee.companyType.bpoIndustry / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            CompanyType: "Educational Institution",
            Frequency: yearData.employee.companyType.educationalInstitution,
            Percentage:
              (
                (yearData.employee.companyType.educationalInstitution / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            CompanyType: "Multinational Companies",
            Frequency: yearData.employee.companyType.multinationalCompany,
            Percentage:
              (
                (yearData.employee.companyType.multinationalCompany / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            CompanyType: "Banking Institution",
            Frequency: yearData.employee.companyType.bankingInstitution,
            Percentage:
              (
                (yearData.employee.companyType.bankingInstitution / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            CompanyType: "Government Offices",
            Frequency: yearData.employee.companyType.govermentOffices,
            Percentage:
              (
                (yearData.employee.companyType.govermentOffices / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            CompanyType: "Private Institution",
            Frequency: yearData.employee.companyType.privateInstitution,
            Percentage:
              (
                (yearData.employee.companyType.privateInstitution / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            CompanyType: "IT Industry",
            Frequency: yearData.employee.companyType.itIndustry,
            Percentage:
              (
                (yearData.employee.companyType.itIndustry / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            CompanyType: "Insurances",
            Frequency: yearData.employee.companyType.insurances,
            Percentage:
              (
                (yearData.employee.companyType.insurances / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            CompanyType: "Communication Company",
            Frequency: yearData.employee.companyType.communicationCompany,
            Percentage:
              (
                (yearData.employee.companyType.communicationCompany / total) *
                100
              ).toFixed(2) + "%",
          },
          {
            CompanyType: "Others",
            Frequency: yearData.employee.companyType.other,
            Percentage:
              ((yearData.employee.companyType.other / total) * 100).toFixed(2) +
              "%",
          },
        ];
      })
      .flat();

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CompanyType");
    XLSX.writeFile(wb, "CompanyType.xlsx");
  };

  return (
    <>
      {tableYearCompanyType
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
              <Typography variant="h6">Company Type</Typography>
            </Box>
            <Grid container justifyContent="center" alignItems="center">
              <TableContainer
                component={Paper}
                sx={{ width: "auto", marginBottom: 2 }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Types</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>BPO Industry</TableCell>
                      <TableCell>
                        {yearData.employee.companyType.bpoIndustry}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.companyType.bpoIndustry / total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Educational Institution</TableCell>
                      <TableCell>
                        {yearData.employee.companyType.educationalInstitution}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.companyType
                            .educationalInstitution /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Multinational Companies</TableCell>
                      <TableCell>
                        {yearData.employee.companyType.multinationalCompany}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.companyType.multinationalCompany /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Banking Institution</TableCell>
                      <TableCell>
                        {yearData.employee.companyType.bankingInstitution}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.companyType.bankingInstitution /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Government Offices</TableCell>
                      <TableCell>
                        {yearData.employee.companyType.govermentOffices}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.companyType.govermentOffices /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Private Institution</TableCell>
                      <TableCell>
                        {yearData.employee.companyType.privateInstitution}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.companyType.privateInstitution /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>IT Industry</TableCell>
                      <TableCell>
                        {yearData.employee.companyType.itIndustry}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.companyType.itIndustry / total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Insurances</TableCell>
                      <TableCell>
                        {yearData.employee.companyType.insurances}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.companyType.insurances / total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Communication Company</TableCell>
                      <TableCell>
                        {yearData.employee.companyType.communicationCompany}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.companyType.communicationCompany /
                            total) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Others</TableCell>
                      <TableCell>
                        {yearData.employee.companyType.other}
                      </TableCell>
                      <TableCell>
                        {(
                          (yearData.employee.companyType.other / total) *
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
export default Table4;
