import { Box, TextField, Typography } from "@mui/material";
import React from "react";

function TxtFullName(props: any) {
  const { fullName, setFullName } = props;

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };
  return (
    <Box sx={{m:2}}>
      <Typography sx={{mb:1}}>Name</Typography>
      <Box>
      <TextField
        id="fullName"
        variant="outlined"
        label="Full Name"
        required
        value={fullName}
        onChange={handleFullNameChange}
      />
      </Box>
    </Box>
  );
}

export default TxtFullName;
