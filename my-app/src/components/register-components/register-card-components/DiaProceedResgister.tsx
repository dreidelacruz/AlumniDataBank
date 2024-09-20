import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React from "react";

function DiaProceedResgister(props: any) {
  const {
    showConfirmationDialog,
    handleCancelRegister,
    handleProceedRegister,
    isLoading,
  } = props;
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Dialog open={showConfirmationDialog} onClose={handleCancelRegister}>
      <DialogTitle variant="h4" fontWeight="bold">
        READ THE FOLLOWING
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="h5"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
        >
          Important Note
        </Typography>
        <Typography variant="h6" color="danger">
          Please confirm that the details you have entered are correct before
          proceeding. Year, Course, and Gender are not editable!!
        </Typography>
        <Divider
          sx={{
            borderTop: "2px solid rgba(0, 0, 0, 0.12)",
            mt: 4,
          }}
        />
        <Typography
          variant="h5"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          fontStyle="Times New Roman"
        >
          Terms and Policy
        </Typography>
        <Typography variant="h6" gutterBottom fontStyle="Times New Roman">
          Introduction
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          fontStyle="Times New Roman"
          textAlign="justify"
        >
          Welcome to the alumni tracer web app. This Terms and Policy document
          governs your use of the web app. By accessing or using the web app,
          you agree to comply with these terms and policies. Please read them
          carefully.
        </Typography>
        <Typography variant="h6" gutterBottom fontStyle="Times New Roman">
          Job Posts and Uploads
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          fontStyle="Times New Roman"
          textAlign="justify"
        >
          Alumni are allowed to post job openings and upload job files and
          images. However, only job images are visible to other alumni. Detailed
          job files can be accessed by interested alumni after providing
          employment, first job, and educational details. The web app is not
          responsible for the accuracy or content of the job posts or uploaded
          files.
        </Typography>
        <Typography variant="h6" gutterBottom fontStyle="Times New Roman">
          Alumni Profiles and Privacy
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          fontStyle="Times New Roman"
          textAlign="justify"
        >
          Each alumni has the option to hide their personal details from other
          alumni. By default, personal details such as contact information and
          company details are shared. But the has the option to hide those. With
          that, alumni can view other alumni profiles with limited information.
          The web app respects user privacy and will not disclose personal
          information without explicit consent.
        </Typography>
        <Typography variant="h6" gutterBottom fontStyle="Times New Roman">
          Data Collection and Usage
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          fontStyle="Times New Roman"
          textAlign="justify"
        >
          The web app collects and uses data provided by alumni for the purpose
          of alumni tracing. The data includes employment details, first job
          information, and educational information. This data is used to improve
          the tracer system and help the school.
        </Typography>
        <Typography variant="h6" gutterBottom fontStyle="Times New Roman">
          Disclaimer
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          fontStyle="Times New Roman"
          textAlign="justify"
        >
          The web app is provided on an "as is" basis. While we strive to ensure
          the accuracy and reliability of the information and services provided,
          we cannot guarantee its completeness, timeliness, or accuracy. The web
          app shall not be held liable for any damages or losses arising from
          the use of the app or reliance on the information provided.
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="I agree"
        />
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelRegister} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleProceedRegister}
          color="primary"
          autoFocus
          disabled={!isChecked || isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Proceed"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DiaProceedResgister;
