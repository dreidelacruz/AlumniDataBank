import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React from "react";

function RdoDifficultiesFirstJob(props: any) {
  const { difficultiesFirstJob, setDifficultiesFirstJob } = props;

  const handleRdoDifficultiesFirstJobChange = (e: any) => {
    setDifficultiesFirstJob(e.target.value);
  };
  
  return (
    <div>
      <FormControl>
        <FormLabel id="diff-look-job">
          Difficulties you encounter in looking for your first job
        </FormLabel>
        <RadioGroup
          row
          name="diff-look-job"
          value={difficultiesFirstJob}
          onChange={handleRdoDifficultiesFirstJobChange}
        >
           <Stack>
          <FormControlLabel
            value="noAvailJob"
            control={<Radio required />}
            label="No available job"
          />
          <FormControlLabel
            value="lackOfExp"
            control={<Radio required />}
            label="Lack of experience"
          />
          <FormControlLabel
            value="lowCompenOffer"
            control={<Radio required />}
            label="Low compensation offer"
          />
          <FormControlLabel
            value="lowOpporAdvancement"
            control={<Radio required />}
            label="Low opportunity advancement"
          />
          <FormControlLabel
            value="lackOfSkill"
            control={<Radio required />}
            label="Lack of skills"
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

export default RdoDifficultiesFirstJob;
