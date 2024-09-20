import React, { useEffect, useState } from "react";
import NavBarAdmin from "../../components/admin/NavBarAdmin";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Collapse, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function AlumniData() {
  const [alumni, setAlumni] = useState<any[]>([]);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAlumniId, setSelectedAlumniId] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [searchAlumni, setSearchAlumni] = useState("");
  const [filteredAlumni, setFilteredAlumni] = useState<any[]>([]);

  const fetchAlumni = async () => {
    try {
      const response = await axios.get(
        "https://localhost:5001/api/Account/alumni/all"
      );
      setAlumni(response.data.data);
    } catch (error) {
      console.error("Error fetching alumni:", error);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  useEffect(() => {
    // Apply filters
    let filteredData = alumni;

    if (genderFilter !== "all") {
      filteredData = filteredData.filter(
        (alumnus) => alumnus.gender === genderFilter
      );
    }

    if (courseFilter !== "all") {
      filteredData = filteredData.filter(
        (alumnus) => alumnus.course === courseFilter
      );
    }

    if (yearFilter !== "all") {
      filteredData = filteredData.filter(
        (alumnus) => alumnus.year === yearFilter
      );
    }

    if (searchAlumni.trim() !== "") {
      filteredData = filteredData.filter((alumnus) =>
        alumnus.displayName.toLowerCase().includes(searchAlumni.toLowerCase())
      );
    }

    setFilteredAlumni(filteredData);
  }, [alumni, genderFilter, courseFilter, yearFilter, searchAlumni]);

  const handleClick = (id: string) => {
    setOpen((prevOpen: any) => ({ ...prevOpen, [id]: !prevOpen[id] }));
  };

  const deleteAlumni = async (id: string) => {
    try {
      await axios.delete(
        `https://localhost:5001/api/Account/alumni/delete/${id}`
      );
      setAlumni(alumni.filter((alumnus) => alumnus.id !== id));
      setDialogOpen(false);
    } catch (error) {
      console.error("Error deleting alumni:", error);
    }
  };

  const handleDialogOpen = (id: string) => {
    setSelectedAlumniId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedAlumniId(null);
    setDialogOpen(false);
  };

  return (
    <div>
      <NavBarAdmin />
      <Grid container spacing={2} alignItems="flex-end">
      <Grid item xs={12} sm={6} md={4} sx={{ml:1}}>
        <TextField
          label="Search alumni name"
          value={searchAlumni}
          onChange={(e: any) => setSearchAlumni(e.target.value)}
          margin="normal"
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={6} sm={3} md={2}>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            value={genderFilter}
            onChange={(e: any) => setGenderFilter(e.target.value as string)}
            label="Gender"
            autoWidth
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6} sm={3} md={2}>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Course</InputLabel>
          <Select
            value={courseFilter}
            onChange={(e: any) => setCourseFilter(e.target.value as string)}
            label="Course"
            autoWidth
          >
            <MenuItem value="all">All</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>User Photo</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Display Name</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Quote</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Company Address</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          {filteredAlumni.map((alumnus) => (
            <>
              <TableRow
                key={alumnus.id}
                sx={{ "& > *": { borderBottom: "unset" } }}
              >
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleClick(alumnus.id)}
                  >
                    {open[alumnus.id] ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <img
                    src={alumnus.userPhoto}
                    alt="User"
                    width="50"
                    height="50"
                  />
                </TableCell>
                <TableCell>{alumnus.email}</TableCell>
                <TableCell>{alumnus.displayName}</TableCell>
                <TableCell>{alumnus.year}</TableCell>
                <TableCell>{alumnus.course}</TableCell>
                <TableCell
                  style={{
                    maxWidth: "200px",
                    wordWrap: "break-word",
                  }}
                >
                  {alumnus.quote}
                </TableCell>
                <TableCell>{alumnus.gender}</TableCell>
                <TableCell>{alumnus.phoneNumber}</TableCell>
                <TableCell>{alumnus.companyName}</TableCell>
                <TableCell>{alumnus.companyAddress}</TableCell>
                <TableCell>{alumnus.createdAt}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDialogOpen(alumnus.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={open[alumnus.id]} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" gutterBottom component="div">
                        Job Posts
                      </Typography>
                      <Table size="small" aria-label="jobPosts">
                        <TableHead>
                          <TableRow>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Job Description</TableCell>
                            <TableCell align="right">Job Photo</TableCell>
                            <TableCell align="right">Job Files</TableCell>
                            <TableCell align="right">Created At</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {alumnus.jobPosts.map((jobPost: any) => (
                            <TableRow key={jobPost.id}>
                              <TableCell
                                component="th"
                                scope="row"
                                style={{
                                  maxWidth: "200px",
                                  wordWrap: "break-word",
                                }}
                              >
                                {jobPost.jobTitle}
                              </TableCell>
                              <TableCell
                                style={{
                                  maxWidth: "200px",
                                  wordWrap: "break-word",
                                }}
                              >
                                {jobPost.description}
                              </TableCell>
                              <TableCell align="right">
                                {jobPost.userPhoto?.url && (
                                  <img
                                    src={jobPost.userPhoto?.url}
                                    alt="User"
                                    width="50"
                                    height="50"
                                  />
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {jobPost.jobFile?.url && (
                                  <a
                                    href={jobPost.jobFile?.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View Files
                                  </a>
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {jobPost.created}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          ))}
        </Table>
      </TableContainer>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this alumni?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Please confirm that you want to delete
            this alumni.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => deleteAlumni(selectedAlumniId as string)}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlumniData;
