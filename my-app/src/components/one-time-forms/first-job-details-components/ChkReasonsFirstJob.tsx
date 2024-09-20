import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";



const checkboxValues = [
  { label: "Salaries", value: "salary" },
  { label: "Career Challenge", value: "careerChallenge" },
  { label: "Related to Special Skills", value: "relatedSpecialSkil" },
  { label: "Proximity to my Residence", value: "proximtyMyResidence" },
  { label: "Others", value: "other" },
];

const ChkReasonsFirstJob = (props: any) => {
  const {checkedValuesReasons, setCheckedValuesReasons} = props

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (checkedValuesReasons.includes(value)) {
      setCheckedValuesReasons(checkedValuesReasons.filter((item: any) => item !== value));
    } else {
      setCheckedValuesReasons([...checkedValuesReasons, value]);
    }
  };
  return (
    <div>
      <Typography>Reasons for taking your first job</Typography>
      <Stack>
    {checkboxValues.map(({ label, value }) => (
      <FormControlLabel
        key={value}
        control={
          <Checkbox
            checked={checkedValuesReasons.includes(value)}
            onChange={handleCheckboxChange}
            value={value}
          />
        }
        label={label}
      />
    ))}
 <FormHelperText>Please select at least one checkbox</FormHelperText>
    </Stack>
  </div>
  );
};

export default ChkReasonsFirstJob;
