import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

function RdoEmploymentStatus(props: any) {
  const {employmentStatus, setEmploymentStatus} = props

  const handleRdoEmploymentStatus = (e: any) => {
    setEmploymentStatus(e.target.value);
  };
  return (
    <div>
      <FormControl>
        <FormLabel id="status-emp">Employment Status</FormLabel>
        <RadioGroup
          row
          name={props.name}
          value={employmentStatus}
          onChange={handleRdoEmploymentStatus}
        >
          <Stack direction="column">
            <FormControlLabel
              value="regular"
              control={<Radio required />}
              label="Regular"
            />
            <FormControlLabel
              value="temporary"
              control={<Radio required />}
              label="Temporary"
            />
            <FormControlLabel
              value="casual"
              control={<Radio required />}
              label="Casual"
            />
            <FormControlLabel
              value="contractual"
              control={<Radio />}
              label="Contractual"
            /> 
            <FormControlLabel
              value="partTime"
              control={<Radio required />}
              label="Part-time"
            />
            <FormControlLabel
              value="probitionary"
              control={<Radio required />}
              label="Probitionary"
            />
          </Stack>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RdoEmploymentStatus;
