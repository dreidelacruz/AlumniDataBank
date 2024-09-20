import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

function RdoOjt(props: any) {
  const { onTheJobTrainingRating, setOnTheJobTrainingRating } = props;

  const handleRating = (e: any) => {
    setOnTheJobTrainingRating(e.target.value);
  };
  return (
    <div>
      <FormControl>
        <FormLabel id="job-status" style={{ fontSize: '22px', fontWeight: 'bolder' }}>On the Job Traning</FormLabel>
        <div style={{ textAlign: 'justify', fontSize: '0.700rem' }}>
        "We kindly request your evaluation of your on-the-job training experience.
        Please reflect on the relevance of the training to your field of study, the quality of mentorship received, and how effectively this experience prepared you for your professional career."
        </div>

        <RadioGroup
          row
          value={onTheJobTrainingRating}
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

export default RdoOjt;
