import { TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField)({
  marginTop: 10,
  marginBottom: 10,
  display: "block",
});

function TxtJobTitle(props: any) {
  const { jobTitle, setJobTitle } = props;

  const handleJobTitleChange = (e:any) => {
    const input = e.target.value;
    if (input.length <= 40) {
      setJobTitle(input);
    }
  }
  return (
    <div>
      <StyledTextField
        required
        id="outlined-required"
        label="Job Title"
        placeholder="Enter a title"
        value={jobTitle}
        onChange={handleJobTitleChange}
        fullWidth
        inputProps={{ maxLength: 40 }} // Limit the input to 40 characters
        helperText= "Required field. 40 characters only."
      />
    </div>
  );
}

export default TxtJobTitle;
