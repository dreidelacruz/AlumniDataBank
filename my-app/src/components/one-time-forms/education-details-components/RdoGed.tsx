import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import Divider from '@mui/material/Divider';

function RdoGed(props: any) {
  const { generalEducationRating, setGeneralEducationRating } = props;

  const handleRating = (e: any) => {
    setGeneralEducationRating(e.target.value)
  }
  return (
    
    <div>
      <FormControl>
      <div style={{fontSize:'13px',fontWeight: 600}}>Important:<span style={{ color: 'red' }}>Please read carefully.</span></div>
      <div style={{ textAlign: 'justify', fontSize: '0.680rem', fontWeight:400}}>
      "We kindly request that you complete this section by providing a rating for each item on a scale from 1 to 5, 
      where 1 represents "very poor" and 5 signifies "excellent." Your careful evaluations are essential for assessing the effectiveness of each aspect of our programs and will provide valuable insights into your experiences throughout your academic journey."
      </div>
      <Divider style={{ margin: '2px 0' }} />

        <FormLabel id="job-status" style={{ fontSize: '22px', marginTop:'15px', fontWeight: 'bolder'}}>General Education Subjects</FormLabel>
        <div style={{ textAlign: 'justify', fontSize: '0.700rem' }}>
        "We invite you to evaluate your experience with the general education subjects included in your curriculum.
        Please consider the relevance of these courses to your overall education, the effectiveness of the instruction, and how well they contributed to your personal and academic development."
        </div>
        <RadioGroup
          row
          value={generalEducationRating}
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

export default RdoGed;
