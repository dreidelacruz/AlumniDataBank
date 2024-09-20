import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  Fab,
  Modal,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import styled from "@emotion/styled";
import { Stack } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TxtJobTitle from "./add-post-components/TxtJobTitle";
import TxtJobDescription from "./add-post-components/TxtJobDescription";
import BtnImageUpload from "./add-post-components/BtnImageUpload";
import BtnPdfUpload from "./add-post-components/BtnPdfUpload";
import axios from "axios";

const StyledStack = styled(Stack)({
  display: "flex",
  justifyContent: "center",
});

const StyledTypography = styled(Typography)({
  textAlign: "center",
});

const StyledButton = styled(Button)({
  marginTop: 2,
});

const StyledCircularProgress = styled(CircularProgress)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 2,
});

const StyledAlert = styled(Alert)({
  width: "100%",
});

const AddPost = (props: { onPostAdded: () => void }) => {
  const [open, setOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [jobFile, setJobFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (
    event: SyntheticEvent<Element, Event> | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleUploadImage = (data: string) => {
    setUserPhoto(data);
  };

  const handleUploadPDF = (data: string) => {
    setJobFile(data);
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when submitting the post
    const alumniData = localStorage.getItem("alumni");

    if (alumniData) {
      const alumniId = JSON.parse(alumniData).id;
      // call function with alumniId
      try {
        const jobPostResponse = await axios.post(
          "https://localhost:5001/api/JobPost",
          {
            jobTitle: jobTitle,
            description: description,
            appUserId: alumniId,
          }
        );
        // console.log(jobPostResponse.status)
        const jobPostId = jobPostResponse.data.id;

        // Upload user photo
        if (userPhoto) {
          const formData1 = new FormData();
          formData1.append("file", userPhoto);

          await axios.post(
            `https://localhost:5001/api/JobPost/add-photo/${jobPostId}`,
            formData1,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        // Upload job file
        if (jobFile) {
          const formData2 = new FormData();
          formData2.append("file", jobFile);

          await axios.post(
            `https://localhost:5001/api/JobPost/add-file/${jobPostId}`,
            formData2,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        setOpen(false);
        setJobTitle("");
        setDescription("");
        setUserPhoto("");
        setJobFile("");
        setSnackbarOpen(true);

        props.onPostAdded();
      } catch (error) {
        console.error("Error submitting the job post:", error);
        // alert("Fill up the title and description")
        setShowAlert(true);
      } finally {
        setLoading(false); // Set loading to false when the post is submitted
        // window.location.reload(); //Godly solution
      }
    }
  };

  return (
    <Box>
      <Fab
        onClick={(e) => setOpen(true)}
        color="info"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: { xs: "10px", sm: "20px", md: "10px" },
          right: { xs: "20px", sm: "30px", md: "40px" },
          width: { xs: "auto", sm: "110px", md: "120px" },
          height: { xs: "auto", sm: "60px", md: "70px" },
          padding: "6px 6px",
          transform: "translateY(-50%)",
          zIndex: 999,
        }}
        variant="extended"
      >
        <Typography
          fontWeight={500}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <AddCircleOutlineIcon sx={{ marginRight: "1px" }} />
          Add Post
        </Typography>
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ p: 4 }}>
          <StyledStack gap={1} sx={{ width: "100%" }}>
            <Box>
              <StyledTypography variant="h6" fontWeight="bold">
                Create Job Post
              </StyledTypography>
            </Box>

            <TxtJobTitle jobTitle={jobTitle} setJobTitle={setJobTitle} />
            <TxtJobDescription
              jobDescription={description}
              setJobDescription={setDescription}
            />
            <>
              <BtnImageUpload setUploadImage={handleUploadImage} />
            </>
            <>
              <BtnPdfUpload setUploadPDF={handleUploadPDF} />
            </>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ mt: 6 }}
            >
              {loading ? (
                <CircularProgress size={24} color="primary" />
              ) : (
                "Post"
              )}
            </Button>
            {showAlert && (
              <Alert severity="error" onClose={() => setShowAlert(false)}>
                Please fill up the Job Title and Job Description.
              </Alert>
            )}
          </StyledStack>
        </Box>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Posted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddPost;
