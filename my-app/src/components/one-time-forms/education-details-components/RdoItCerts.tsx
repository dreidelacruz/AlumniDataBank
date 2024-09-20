import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

function RdoItCerts(props: any) {
  const { itCertificationRating, setItCertificationRating } = props;

  const handleRating = (e: any) => {
    setItCertificationRating(e.target.value);
  };
  return (
    <div>
      <FormControl>
        <FormLabel id="job-status" style={{ fontSize: '22px',fontWeight: 'bolder' }}>IT Certifications</FormLabel>
        <div style={{ textAlign: 'justify', fontSize: '0.700rem' }}>
        "We invite you to assess your experience with the IT certifications pursued during your studies.
        Please consider the relevance of these certifications to your career goals, the quality of the training provided, and their impact on your professional development."
        </div>

        <RadioGroup
          row
          value={itCertificationRating}
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

export default RdoItCerts;
