import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

function RdoPresentJobCourse(props: any) {
  const { presentJobCourse, setPresentJobCourse } = props;

  const handleRdoPresentJobCourseChange = (e: any) => {
    setPresentJobCourse(e.target.value);
  };
  return (
    <div>
      <FormControl>
        <FormLabel id="job-related-educ">
          Is your present job Related to your course?
        </FormLabel>
        <RadioGroup
          row
          name="job-related-course"
          value={presentJobCourse}
          onChange={handleRdoPresentJobCourseChange}
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

export default RdoPresentJobCourse;
