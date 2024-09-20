import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";


function RdoUnemploymentBoolean(props: any) {
  const {unemploymentBoolean, setUnemploymentBoolean} = props

  const handleRdoUnemploymentBoolean = (e: any) => {
    setUnemploymentBoolean(e.target.value);
  };
  return (
    <div>
      <FormControl>
        <FormLabel id="ruEmployed">
          Have you been employed after Graduation?
        </FormLabel>
        <RadioGroup
          row
          name={props.name}
          value={unemploymentBoolean}
          onChange={handleRdoUnemploymentBoolean}
          defaultValue=""
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

export default RdoUnemploymentBoolean;
