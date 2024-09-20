import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


function CmbYear(props: any) {
  const { year, setYear } = props;
  const [yearOptions, setYearOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/Year');
        setYearOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchYears();
  }, []);

  const handleSelect = (event: SelectChangeEvent) => {
    const selectedYear = event.target.value as string;
    setYear(selectedYear);
  };

  return (
    <FormControl required sx={{ minWidth: 150, m:1 }}>
      <InputLabel id="year-label">Select Year</InputLabel>
      <Select
        labelId="year-label"
        id="year-select"
        label="Select Year"
        value={year}
        onChange={handleSelect}
      >
   {yearOptions.map((option: any) => (
    <MenuItem key={option.id} value={option.graduatedSchoolYear}>
      {option.graduatedSchoolYear}
    </MenuItem>
        ))}
      </Select>
      <FormHelperText>Required</FormHelperText>
    </FormControl>
  );
}

export default CmbYear;