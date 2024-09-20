import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

function RdoElective(props: any) {
  const { electiveSubjectRating, setElectiveSubjectRating } = props;

  const handleRating = (e: any) => {
    setElectiveSubjectRating(e.target.value);
  };
  return (
    <div>
      <FormControl>
        <FormLabel id="job-status" style={{ fontSize: '22px', fontWeight: 'bolder'}}>
          Elective and Free Elective Subjects
        </FormLabel>
        <div style={{ textAlign: 'justify', fontSize: '0.700rem' }}>
           "We invite you to assess your experience with the elective and free elective subjects offered in your curriculum. 
           Please reflect on the diversity of options available, the relevance of the courses to your academic and career goals, and the overall quality of instruction."
        </div>

        <RadioGroup
          row
          value={electiveSubjectRating}
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

export default RdoElective;
