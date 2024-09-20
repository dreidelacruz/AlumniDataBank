import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

function RdoFirstJobRelatedCourse(props: any) {
  const { jobRelatedCourse, setJobRelatedCourse } = props;

  const handleRdoFirstJobRelatedCourseChange = (e: any) => {
    setJobRelatedCourse(e.target.value);
  };
  return (
    <div>
      <FormControl>
        <FormLabel id="job-related-course">
          Is your first job Related to your course?
        </FormLabel>
        <RadioGroup
          row
          name="job-related-course"
          value={jobRelatedCourse}
          onChange={handleRdoFirstJobRelatedCourseChange}
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

export default RdoFirstJobRelatedCourse;


