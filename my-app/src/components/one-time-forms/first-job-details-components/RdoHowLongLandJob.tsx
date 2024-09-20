import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React from "react";

function RdoHowLongLandJob(props: any) {
  const {howLongLandJob, setHowLongLandJob} = props;

  const handleRdoHowLongLandJobChange = (e: any) => {
    setHowLongLandJob(e.target.value);
  };
  return (
    <div>
      <FormControl>
        <FormLabel id="how-long-job">
          How long did it take to land your first job?
        </FormLabel>
        <RadioGroup
          row
          name="how-long-job"
          value={howLongLandJob}
          onChange={handleRdoHowLongLandJobChange}
        >
          <Stack>
            <FormControlLabel
              value="lessThanAMonth"
              control={<Radio required />}
              label="Less than a month"
            />
            <FormControlLabel
              value="monthOneToThree"
              control={<Radio required/>}
              label="1-3 months"
            />
            <FormControlLabel
              value="monthFourToSix"
              control={<Radio required/>}
              label="4-6 months"
            />
            <FormControlLabel
              value="monthSevenToEleven"
              control={<Radio required/>}
              label="7-11 months"
            />
          </Stack>
          <Stack>
          <FormControlLabel
              value="yearOneToTwo"
              control={<Radio required/>}
              label="1-2 years"
            />
            <FormControlLabel
              value="yearTwoToThree"
              control={<Radio required/>}
              label="2-3 years"
            />
            <FormControlLabel
              value="yearThreeToFour"
              control={<Radio required/>}
              label="3-4 years"
            />
            <FormControlLabel
              value="others"
              control={<Radio required/>}
              label="Others"
            />
          </Stack>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RdoHowLongLandJob;
