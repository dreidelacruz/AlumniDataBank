import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import NavBarAdmin from "../../components/admin/NavBarAdmin";
import CmbYear from "../../components/register-components/register-card-components/CmbYear";
import axios from "axios";
import Table1 from "../../components/admin/tables/Table1";
import Table2 from "../../components/admin/tables/Table2";
import Chart1Gender from "../../components/admin/charts/Chart1Gender";
import Chart2 from "../../components/admin/charts/Chart2";
import Table3 from "../../components/admin/tables/Table3";
import Table4 from "../../components/admin/tables/Table4";
import Table5 from "../../components/admin/tables/Table5";
import Table6 from "../../components/admin/tables/Table6";
import Table7 from "../../components/admin/tables/Table7";
import Table8 from "../../components/admin/tables/Table8";
import Chart4 from "../../components/admin/charts/Chart4";
import Table9 from "../../components/admin/tables/firstjob-table/Table9";
import Table10 from "../../components/admin/tables/firstjob-table/Table10";
import Table11 from "../../components/admin/tables/firstjob-table/Table11";
import Table12 from "../../components/admin/tables/firstjob-table/Table12";
import Table13 from "../../components/admin/tables/firstjob-table/Table13";
import Table14 from "../../components/admin/tables/firstjob-table/Table14";
import Table15 from "../../components/admin/tables/firstjob-table/Table15";
import Table16 from "../../components/admin/tables/educational-table/Table16";
import Table17 from "../../components/admin/tables/educational-table/Table17";
import Table18 from "../../components/admin/tables/educational-table/Table18";
import Table19 from "../../components/admin/tables/educational-table/Table19";
import Table20 from "../../components/admin/tables/educational-table/Table20";
import Table21 from "../../components/admin/tables/educational-table/Table21";
import Table22 from "../../components/admin/tables/educational-table/Table22";
import Table23 from "../../components/admin/tables/educational-table/Table23";
import Chart3 from "../../components/admin/charts/Chart3";
import Chart5 from "../../components/admin/charts/Chart5";
import Chart6 from "../../components/admin/charts/Chart6";
import Chart7 from "../../components/admin/charts/Chart7";
import Chart8 from "../../components/admin/charts/Chart8";
import Chart9 from "../../components/admin/charts/firstjob-chart/Chart9";
import Chart10 from "../../components/admin/charts/firstjob-chart/Chart10";
import Chart11 from "../../components/admin/charts/firstjob-chart/Chart11";
import Chart12 from "../../components/admin/charts/firstjob-chart/Chart12";
import Chart13 from "../../components/admin/charts/firstjob-chart/Chart13";
import Chart14 from "../../components/admin/charts/firstjob-chart/Chart14";
import Chart15 from "../../components/admin/charts/firstjob-chart/Chart15";
import Chart16 from "../../components/admin/charts/education-chart/Chart16";
import Chart17 from "../../components/admin/charts/education-chart/Chart17";
import Chart18 from "../../components/admin/charts/education-chart/Chart18";
import Chart19 from "../../components/admin/charts/education-chart/Chart19";
import Chart20 from "../../components/admin/charts/education-chart/Chart20";
import Chart21 from "../../components/admin/charts/education-chart/Chart21";
import Chart22 from "../../components/admin/charts/education-chart/Chart22";
import Chart23 from "../../components/admin/charts/education-chart/Chart23";
import BtnResetPassword from "../../components/alumni/alumni-profile-components/inside-profile-components/BtnResetPassword";
import DeleteYear from "../../components/admin/DeleteYear";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: 8,
  border: "2px solid",
  borderColor: theme.palette.divider,
}));

function AdminDashboard() {
  const [graduatedSchoolYear, setGraduatedSchoolYear] = React.useState("");
  const [selectedYear, setSelectedYear] = React.useState("");
  const [selectedFilter, setSelectedFilter] = React.useState("all");
  const [showFilter, setShowFilter] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedEmploymentFilter, setSelectedEmploymentFilter] =
    useState("allEmploy");
  const [selectedFirstJobFilter, setSelectedFirstJobFilter] = useState("allFJ");
  const [selectedEducationFilter, setSelectedEducationFilter] =
    useState("allEduc");

  const handleEmploymentFilterChange = (event: any) => {
    setSelectedEmploymentFilter(event.target.value);
  };

  const handleFirstJobFilterChange = (event: any) => {
    setSelectedFirstJobFilter(event.target.value);
  };

  const handleEducationFilterChange = (event: any) => {
    setSelectedEducationFilter(event.target.value);
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const checkYearExists = async (year: any) => {
    try {
      const response = await axios.get("https://localhost:5001/api/Year");
      const years = response.data;
      return years.some((y: any) => y.graduatedSchoolYear === year);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleKeyPress = (e: any) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode < 48 || keyCode > 57) {
      // 48-57 are the key codes for numbers 0-9
      e.preventDefault();
    }
  };

  const handleChangeYear = (e: any) => {
    const inputYear = e.target.value;
    // allow only input of 4 numeric characters (YYYY format)
    if (/^\d{0,4}$/.test(inputYear)) {
      setGraduatedSchoolYear(inputYear);
    }
  };

  const handleCreateYear = async () => {
    if (await checkYearExists(graduatedSchoolYear)) {
      setErrorMessage("This year already exists in the database.");
    } else {
      setErrorMessage("");
      try {
        const response = await axios.post("https://localhost:5001/api/Year", {
          graduatedSchoolYear,
        });
        console.log(response.data);
        setGraduatedSchoolYear("");
        window.location.reload();
        // Handle successful response here, e.g., show a success message or update the UI
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleViewYearData = () => {
    setSelectedYear(graduatedSchoolYear);
    setShowFilter(true);
  };

  const handleFilterChange = (e: any) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div>
      <NavBarAdmin />
      <Box sx={{ m: 2 }}>
        <Stack spacing={{ xs: 1, sm: 2, md: 4 }}>
          <Card
            sx={{
              m: 2,
              p: 3,
              border: "2px solid black",
              borderWidth: "2px",
              textAlign: "center",
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Button
                onClick={handleOpenDeleteDialog}
                variant="contained"
                color="error"
                sx={{height:"fit-content", width:"fit-content"}}
              >
                DELETE YEAR
              </Button>
              <DeleteYear
                open={deleteDialogOpen}
                handleClose={handleCloseDeleteDialog}
              />
              <Stack>
                <Typography fontWeight="bold">
                  Reset admin password here
                </Typography>
                <BtnResetPassword />
              </Stack>
            </Stack>
            <Item>
              <Typography sx={{ mb: 1 }}>Year Graduated</Typography>
              <TextField
                label="Year"
                variant="outlined"
                error={!!errorMessage}
                helperText={errorMessage}
                defaultValue=""
                onChange={handleChangeYear}
                placeholder="YYYY"
                onKeyPress={handleKeyPress}
                inputProps={{
                  maxLength: 4,
                  inputMode: "numeric",
                  pattern: "\\d*",
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="info"
                sx={{ mt: 1 }}
                onClick={handleCreateYear}
              >
                create year
              </Button>
            </Item>
            <Item>
              <CmbYear
                year={graduatedSchoolYear}
                setYear={setGraduatedSchoolYear}
              />
              <Button
                fullWidth
                variant="contained"
                color="info"
                sx={{ mt: 1 }}
                onClick={handleViewYearData}
              >
                view year data
              </Button>
            </Item>
          </Card>
          {selectedYear && (
            <>
              <Card
                sx={{
                  m: 2,
                  p: 3,
                  border: "2px solid black",
                  borderWidth: "2px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 5 }}>
                  Year {graduatedSchoolYear}
                </Typography>
                <Grid container spacing={2} justifyContent="center" gap={1}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={5}
                    sx={{ border: "2px solid black", borderWidth: "1px" }}
                  >
                    <Table1 selectedYear={selectedYear} />
                    <Chart1Gender selectedYear={selectedYear} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={5}
                    sx={{ border: "2px solid black", borderWidth: "1px" }}
                  >
                    <Table2 selectedYear={selectedYear} />
                    <Chart2 selectedYear={selectedYear} />
                  </Grid>
                </Grid>
              </Card>

              <Card
                sx={{
                  m: 2,
                  p: 3,
                  border: "2px solid black",
                  borderWidth: "2px",
                }}
              >
                {showFilter && (
                  <Item sx={{ backgroundColor: "#dad9d7" }}>
                    <Typography sx={{ mb: 1 }} fontWeight="bold" variant="h5">
                      Filter Details
                    </Typography>
                    <Select
                      value={selectedFilter}
                      onChange={handleFilterChange}
                      autoWidth
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="employment">Employment Details</MenuItem>
                      <MenuItem value="firstJob">First Job Details</MenuItem>
                      <MenuItem value="education">Education Details</MenuItem>
                    </Select>
                    {selectedFilter === "employment" && (
                      <Select
                        value={selectedEmploymentFilter}
                        onChange={handleEmploymentFilterChange}
                        autoWidth
                        sx={{ m: 1 }}
                      >
                        <MenuItem value="allEmploy">All Employment Details</MenuItem>
                        <MenuItem value="table1.1">Presently Employed?</MenuItem>
                        <MenuItem value="table1.2">Company Type</MenuItem>
                        <MenuItem value="table1.3">Job Position</MenuItem>
                        <MenuItem value="table1.4">Employment Status</MenuItem>
                        <MenuItem value="table1.5">Employed After Graduation?</MenuItem>
                        <MenuItem value="table1.6">Reasons For Unemployment</MenuItem>
                      </Select>
                    )}
                    {selectedFilter === "firstJob" && (
                      <Select
                        value={selectedFirstJobFilter}
                        onChange={handleFirstJobFilterChange}
                        autoWidth
                        sx={{ m: 1 }}
                      >
                        <MenuItem value="allFJ">All First Job Details</MenuItem>
                        <MenuItem value="table2.1">Course-related First Job?</MenuItem>
                        <MenuItem value="table2.2">How Long Land First Job</MenuItem>
                        <MenuItem value="table2.3">Finding First Job</MenuItem>
                        <MenuItem value="table2.4">Difficulties Encountered</MenuItem>
                        <MenuItem value="table2.5">Currently in First Job?</MenuItem>
                        <MenuItem value="table2.6">How Long Stay First Job</MenuItem>
                        <MenuItem value="table2.7">Reasons Taking First Job</MenuItem>
                      </Select>
                    )}
                    {selectedFilter === "education" && (
                      <Select
                        value={selectedEducationFilter}
                        onChange={handleEducationFilterChange}
                        autoWidth
                        sx={{ m: 1 }}
                      >
                        <MenuItem value="allEduc">All Education Details</MenuItem>
                        <MenuItem value="table3.1">Present Job Related to Course?</MenuItem>
                        <MenuItem value="table3.2">Competencies Learned</MenuItem>
                        <MenuItem value="table3.3">GED</MenuItem>
                        <MenuItem value="table3.4">Professional Subjects</MenuItem>
                        <MenuItem value="table3.5">Elective and Free Elective Subjects</MenuItem>
                        <MenuItem value="table3.6">IT Certification</MenuItem>
                        <MenuItem value="table3.7">Seminars, Conferences, and Training</MenuItem>
                        <MenuItem value="table3.8">On the Job Training</MenuItem>
                      </Select>
                    )}
                  </Item>
                )}
                {selectedFilter === "all" || selectedFilter === "employment" ? (
                  <>
                    {(selectedFilter === "all" ||
                      (selectedFilter === "employment" &&
                        (selectedEmploymentFilter === "allEmploy" ||
                          selectedEmploymentFilter === "table1.1"))) && (
                      <Item>
                        <Table3 selectedYear={selectedYear} />
                        <Chart3 selectedYear={selectedYear} />
                      </Item>
                    )}
                    {(selectedFilter === "all" ||
                      (selectedFilter === "employment" &&
                        (selectedEmploymentFilter === "allEmploy" ||
                          selectedEmploymentFilter === "table1.2"))) && (
                      <Item>
                        <Table4 selectedYear={selectedYear} />
                        <Chart4 selectedYear={selectedYear} />
                      </Item>
                    )}
                    {(selectedFilter === "all" ||
                      (selectedFilter === "employment" &&
                        (selectedEmploymentFilter === "allEmploy" ||
                          selectedEmploymentFilter === "table1.3"))) && (
                      <Item>
                        <Table5 selectedYear={selectedYear} />
                        <Chart5 selectedYear={selectedYear} />
                      </Item>
                    )}
                    {(selectedFilter === "all" ||
                      (selectedFilter === "employment" &&
                        (selectedEmploymentFilter === "allEmploy" ||
                          selectedEmploymentFilter === "table1.4"))) && (
                      <Item>
                        <Table6 selectedYear={selectedYear} />
                        <Chart6 selectedYear={selectedYear} />
                      </Item>
                    )}
                    {(selectedFilter === "all" ||
                      (selectedFilter === "employment" &&
                        (selectedEmploymentFilter === "allEmploy" ||
                          selectedEmploymentFilter === "table1.5"))) && (
                      <Item>
                        <Table7 selectedYear={selectedYear} />
                        <Chart7 selectedYear={selectedYear} />
                      </Item>
                    )}
                    {(selectedFilter === "all" ||
                      (selectedFilter === "employment" &&
                        (selectedEmploymentFilter === "allEmploy" ||
                          selectedEmploymentFilter === "table1.6"))) && (
                      <Item>
                        <Table8 selectedYear={selectedYear} />
                        <Chart8 selectedYear={selectedYear} />
                      </Item>
                    )}
                  </>
                ) : null}
                {selectedFilter === "all" || selectedFilter === "firstJob" ? (
                  <>
            
                      {(selectedFilter === "all" ||
                        (selectedFilter === "firstJob" &&
                          (selectedFirstJobFilter === "allFJ" ||
                            selectedFirstJobFilter === "table2.1"))) && (
                        <Item>
                          <Table9 selectedYear={selectedYear} />
                          <Chart9 selectedYear={selectedYear} />
                        </Item>
                      )}
                  
              
                      {(selectedFilter === "all" ||
                        (selectedFilter === "firstJob" &&
                          (selectedFirstJobFilter === "allFJ" ||
                            selectedFirstJobFilter === "table2.2"))) && (
                        <Item>
                          <Table10 selectedYear={selectedYear} />
                          <Chart10 selectedYear={selectedYear} />
                        </Item>
                      )}
             
             
                      {(selectedFilter === "all" ||
                        (selectedFilter === "firstJob" &&
                          (selectedFirstJobFilter === "allFJ" ||
                            selectedFirstJobFilter === "table2.3"))) && (
                        <Item>
                          <Table11 selectedYear={selectedYear} />
                          <Chart11 selectedYear={selectedYear} />
                        </Item>
                      )}
             
                   
                      {(selectedFilter === "all" ||
                        (selectedFilter === "firstJob" &&
                          (selectedFirstJobFilter === "allFJ" ||
                            selectedFirstJobFilter === "table2.4"))) && (
                        <Item>
                          <Table12 selectedYear={selectedYear} />
                          <Chart12 selectedYear={selectedYear} />
                        </Item>
                      )}
   
     
                      {(selectedFilter === "all" ||
                        (selectedFilter === "firstJob" &&
                          (selectedFirstJobFilter === "allFJ" ||
                            selectedFirstJobFilter === "table2.5"))) && (
                        <Item>
                          <Table13 selectedYear={selectedYear} />
                          <Chart13 selectedYear={selectedYear} />
                        </Item>
                      )}
            
          
                      {(selectedFilter === "all" ||
                        (selectedFilter === "firstJob" &&
                          (selectedFirstJobFilter === "allFJ" ||
                            selectedFirstJobFilter === "table2.6"))) && (
                        <Item>
                          <Table14 selectedYear={selectedYear} />
                          <Chart14 selectedYear={selectedYear} />
                        </Item>
                      )}
                  
                      {(selectedFilter === "all" ||
                        (selectedFilter === "firstJob" &&
                          (selectedFirstJobFilter === "allFJ" ||
                            selectedFirstJobFilter === "table2.7"))) && (
                        <Item>
                          <Table15 selectedYear={selectedYear} />
                          <Chart15 selectedYear={selectedYear} />
                        </Item>
                      )}
                  </>
                ) : null}
                {selectedFilter === "all" || selectedFilter === "education" ? (
                  <>
                    {(selectedFilter === "all" ||
                      (selectedFilter === "education" &&
                        (selectedEducationFilter === "allEduc" ||
                          selectedEducationFilter === "table3.1"))) && (
                      <Item>
                        <Table16 selectedYear={selectedYear} />
                        <Chart16 selectedYear={selectedYear} />
                      </Item>
                    )}
                    {(selectedFilter === "all" ||
                      (selectedFilter === "education" &&
                        (selectedEducationFilter === "allEduc" ||
                          selectedEducationFilter === "table3.2"))) && (
                      <Item>
                        <Table17 selectedYear={selectedYear} />
                        <Chart17 selectedYear={selectedYear} />
                      </Item>
                    )}
                    {(selectedFilter === "all" ||
                      (selectedFilter === "education" &&
                        (selectedEducationFilter === "allEduc" ||
                          selectedEducationFilter === "table3.3"))) && (
                      <Item>
                        <Table18 selectedYear={selectedYear} />
                        <Chart18 selectedYear={selectedYear} />
                      </Item>
                    )}
                    {(selectedFilter === "all" ||
                      (selectedFilter === "education" &&
                        (selectedEducationFilter === "allEduc" ||
                          selectedEducationFilter === "table3.4"))) && (
                      <Item>
                        <Table19 selectedYear={selectedYear} />
                        <Chart19 selectedYear={selectedYear} />
                      </Item>
                    )}
                    {(selectedFilter === "all" ||
                      (selectedFilter === "education" &&
                        (selectedEducationFilter === "allEduc" ||
                          selectedEducationFilter === "table3.5"))) && (
                      <Item>
                        <Table20 selectedYear={selectedYear} />
                        <Chart20 selectedYear={selectedYear} />
                      </Item>
                    )}
                    {(selectedFilter === "all" ||
                      (selectedFilter === "education" &&
                        (selectedEducationFilter === "allEduc" ||
                          selectedEducationFilter === "table3.6"))) && (
                      <Item>
                        <Table21 selectedYear={selectedYear} />
                        <Chart21 selectedYear={selectedYear} />
                      </Item>
                    )}
                    {(selectedFilter === "all" ||
                      (selectedFilter === "education" &&
                        (selectedEducationFilter === "allEduc" ||
                          selectedEducationFilter === "table3.7"))) && (
                      <Item>
                        <Table22 selectedYear={selectedYear} />
                        <Chart22 selectedYear={selectedYear} />
                      </Item>
                    )}
                    {(selectedFilter === "all" ||
                      (selectedFilter === "education" &&
                        (selectedEducationFilter === "allEduc" ||
                          selectedEducationFilter === "table3.8"))) && (
                      <Item>
                        <Table23 selectedYear={selectedYear} />
                        <Chart23 selectedYear={selectedYear} />
                      </Item>
                    )}
                  </>
                ) : null}
              </Card>
            </>
          )}
        </Stack>
      </Box>
    </div>
  );
}

export default AdminDashboard;
