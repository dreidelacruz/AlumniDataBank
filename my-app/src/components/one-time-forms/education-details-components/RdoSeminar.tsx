import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

function RdoSeminar(props: any) {
  const { seminarRating, setSeminarRating } = props;

  const handleRating = (e: any) => {
    setSeminarRating(e.target.value);
  };
  return (
    <div>
      <FormControl>
        <FormLabel id="job-status" style={{ fontSize: '22px',fontWeight: 'bolder' }}>Seminars, Conferences, and Trainings</FormLabel>
        <div style={{ textAlign: 'justify', fontSize: '0.700rem' }}>
        "We respectfully request your evaluation of the seminars, conferences, and training sessions you attended.
        Please reflect on the relevance of these events to your academic and professional growth, the quality of the content presented, and the overall effectiveness of the sessions."
        </div>
        <RadioGroup
          row
          value={seminarRating}
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

export default RdoSeminar;
