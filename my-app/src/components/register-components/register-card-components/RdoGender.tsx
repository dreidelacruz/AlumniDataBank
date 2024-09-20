import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import React from "react";


const RdoGender = (props: any) => {
  const {gender, setGender} = props
  
  const handleRdoChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value)
  }
  
  return (
    <div>
      <FormControl required>
        <FormLabel>Select gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name={props.name}
          value={gender}
          onChange={handleRdoChangeGender}
          row
          defaultValue=""
        >
          <FormControlLabel value="male" control={<Radio required />} label="Male" />
          <FormControlLabel value="female" control={<Radio required/>} label="Female" />
        </RadioGroup>
      </ FormControl>
    </div>
  );
};

export default RdoGender;
