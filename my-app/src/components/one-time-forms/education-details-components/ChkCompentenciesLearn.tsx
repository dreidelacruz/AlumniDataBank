import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Stack,
} from "@mui/material";
import React from "react";

function ChkCompentenciesLearn(props: any) {
  const { competencies, setCompetencies } = props;

  const handleCheckboxChange = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      setCompetencies([...competencies, value]);
    } else {
      setCompetencies(competencies.filter((c: any) => c !== value));
    }
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        What competencies you learn in college?
      </FormLabel>
      <FormGroup aria-label="compe-learn-in-college" row>
        <Stack direction="column">
          <FormControlLabel
            value="communicationSkill"
            control={<Checkbox />}
            label="Communication skill"
            labelPlacement="end"
            onChange={handleCheckboxChange}
          />
          <FormControlLabel
            value="criticalThinkingSkill"
            control={<Checkbox />}
            label="Critical thinking skill"
            labelPlacement="end"
            onChange={handleCheckboxChange}
          />
          <FormControlLabel
            value="humanRelationSkill"
            control={<Checkbox />}
            label="Human relation skill"
            labelPlacement="end"
            onChange={handleCheckboxChange}
          />
          <FormControlLabel
            value="entrepreneurialSkill"
            control={<Checkbox />}
            label="Entrepreneurial skill"
            labelPlacement="end"
            onChange={handleCheckboxChange}
          />
          <FormControlLabel
            value="itSkill"
            control={<Checkbox />}
            label="IT skill"
            labelPlacement="end"
            onChange={handleCheckboxChange}
          />
          <FormControlLabel
            value="problemSolvingSkill"
            control={<Checkbox />}
            label="Problem solving skill"
            labelPlacement="end"
            onChange={handleCheckboxChange}
          />
          <FormControlLabel
            value="otherSkill"
            control={<Checkbox />}
            label="Other skill"
            labelPlacement="end"
            onChange={handleCheckboxChange}
          />
          <FormHelperText>
            Please select at least one checkbox
          </FormHelperText>
        </Stack>
      </FormGroup>
    </FormControl>
  );
}

export default ChkCompentenciesLearn;
