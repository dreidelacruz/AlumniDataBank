import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React from "react";

function RdoHowFindJob(props: any) {
  const { howFindJob, setHowFindJob } = props;

  const handleRdoHowFindJobChange = (e: any) => {
    setHowFindJob(e.target.value);
  };
  
  return (
    <div>
      <FormControl>
        <FormLabel id="how-find-job">
          How did you find your first job?
        </FormLabel>
        <RadioGroup
          row
          name="how-find-job"
          value={howFindJob}
          onChange={handleRdoHowFindJobChange}
        >
          <Stack>
            <FormControlLabel
              value="toAnAdvertisement"
              control={<Radio required />}
              label="To an advertisement"
            />
            <FormControlLabel
              value="asWalkInApplicant"
              control={<Radio required />}
              label="As walk-in applicant"
            />
            <FormControlLabel
              value="recommendedBySomeone"
              control={<Radio required />}
              label="Recomended by someone"
            />
            <FormControlLabel
              value="informationFromFriends"
              control={<Radio required />}
              label="Information from friends"
            />
          </Stack>
          <Stack>
            <FormControlLabel
              value="arrangedByTheSchool"
              control={<Radio required />}
              label="Arranged by the school"
            />
            <FormControlLabel
              value="familyBusiness"
              control={<Radio required />}
              label="Family business"
            />
            <FormControlLabel
              value="jobFairForPeso"
              control={<Radio required />}
              label="Job fair for public employment service office"
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

export default RdoHowFindJob;
