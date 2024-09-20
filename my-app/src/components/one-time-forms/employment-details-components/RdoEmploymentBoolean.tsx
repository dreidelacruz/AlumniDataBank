import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

function RdoEmploymentBoolean(props:any) {
  const {employmentBoolean, setEmploymentBoolean} = props

  const handleRdoChangeRdoEmploymentBoolean = (e: any) => {
    setEmploymentBoolean(e.target.value)
  }

  return (
    <div>
      <FormControl>
        <FormLabel id="employment-status">
          Are you Presently Employed?
        </FormLabel>
        <RadioGroup
          row
          name={props.name}
          value={employmentBoolean}
          onChange={handleRdoChangeRdoEmploymentBoolean}
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

export default RdoEmploymentBoolean;
