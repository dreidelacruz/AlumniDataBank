import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

function RdoJobPosition(props: any) {
  const {jobPosition, setJobPosition} = props

  const handleRdoJobPosition = (e: any) => {
    setJobPosition(e.target.value);
  };
  return (
    <div>
      <FormControl>
        <FormLabel id="job-status">Job Position</FormLabel>
        <RadioGroup
          row
          name={props.name}
          value={jobPosition}
          onChange={handleRdoJobPosition}
          defaultValue=""
        >
          <Stack direction="column">
            <FormControlLabel
              value="managerial"
              control={<Radio required />}
              label="Manegerial"
            />
            <FormControlLabel
              value="supervisory"
              control={<Radio required />}
              label="Supervisory"
            />
            <FormControlLabel
              value="clerical"
              control={<Radio required />}
              label="Clerical"
            />
            <FormControlLabel
              value="selfEmployed"
              control={<Radio required />}
              label="Self-Employed"
            />
            <FormControlLabel
              value="other"
              control={<Radio required />}
              label="Others"
            />
          </Stack>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RdoJobPosition;
