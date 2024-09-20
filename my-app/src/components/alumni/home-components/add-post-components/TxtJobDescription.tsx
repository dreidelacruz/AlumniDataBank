import { Box, TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField)({
  marginTop: 10,
  marginBottom: 10,
  display: "block",
});

function TxtJobDescription(props: any) {
  const { jobDescription, setJobDescription } = props;

  const handleJobDescriptionChange = (e: any) => {
    const text = e.target.value;
    setJobDescription(text);
  };

  return (
    <Box>
      <StyledTextField
        required
        id="outlined-multiline-static"
        label="Job Description"
        multiline
        rows={3}
        placeholder="Enter job description"
        value={jobDescription}
        onChange={handleJobDescriptionChange}
        fullWidth
        style={{ whiteSpace: "pre-line" }}
        helperText= "Required field."
      />
    </Box>
  );
}

export default TxtJobDescription;
