import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

function RdoProSubject(props: any) {
  const { professionalSubjectRating, setProfessionalSubjectRating } = props;

  const handleRating = (e: any) => {
    setProfessionalSubjectRating(e.target.value);
  };
  return (
    <div>
      <FormControl>
        <FormLabel id="job-status" style={{ fontSize: '22px',fontWeight: 'bolder' }}>Professional Subjects (Coding/Programming Subjects)</FormLabel>

        <div style={{ textAlign: 'justify', fontSize: '0.700rem' }}>
  "We kindly request that you evaluate your experience with the coding and programming subjects within your curriculum. 
  Please consider factors such as the relevance of the content, the effectiveness of instruction, and your overall proficiency in these areas."
        </div>
        <RadioGroup
          row
          value={professionalSubjectRating}
          onChange={handleRating}
          defaultValue=""
        >
          <Stack direction="row">
            <FormControlLabel
              value="score1"
              control={<Radio required />}
              label="1"
              labelPlacement="top"
            />
            <FormControlLabel
              value="score2"
              control={<Radio required />}
              label="2"
              labelPlacement="top"
            />
            <FormControlLabel
              value="score3"
              control={<Radio required />}
              label="3"
              labelPlacement="top"
            />
            <FormControlLabel
              value="score4"
              control={<Radio required />}
              label="4"
              labelPlacement="top"
            />
            <FormControlLabel
              value="score5"
              control={<Radio required />}
              label="5"
              labelPlacement="top"
            />
          </Stack>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RdoProSubject;
