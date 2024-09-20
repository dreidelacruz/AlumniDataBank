import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

function RdoStillInFirstJob(props: any) {
  const { stillInFirstJob, setStillInFirstJob } = props;

  const handleRdoStillInFirstJobChange = (e: any) => {
    setStillInFirstJob(e.target.value);
  };
  return (
    <div>
      <FormControl>
        <FormLabel id="still-1st-job">
          Are you currently in your first job?
        </FormLabel>
        <RadioGroup
          row
          name="still-1st-job"
          value={stillInFirstJob}
          onChange={handleRdoStillInFirstJobChange}
        >
          <FormControlLabel
            value="yes"
            control={<Radio required />}
            label="Yes"
          />
          <FormControlLabel
            value="no"
            control={<Radio required />}
            label="No"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RdoStillInFirstJob;
