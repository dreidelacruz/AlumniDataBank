import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const CmbGradCourse = (props: any) => {
  const {course, setCourse} = props

  const handleChangeCourse = (event: any) => {
    setCourse(event.target.value);
  };

  return (
    <div>
      <Typography>Your Course</Typography>
      <FormControl required sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-required-label">
          Select Course
        </InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          label="Select Course"
          value={course}
          onChange={handleChangeCourse}
          displayEmpty
          inputProps={{ "aria-label": "Course" }}
          name={props.name}
          defaultValue=""
        >
          <MenuItem value="bsit">BSIT</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </div>
  );
};
export default CmbGradCourse;
