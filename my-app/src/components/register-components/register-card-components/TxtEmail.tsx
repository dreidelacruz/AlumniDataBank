import { Box, TextField, Typography } from "@mui/material";
import React from "react";

function TxtEmail(props:any) {
    const {email, setEmail} = props

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
  return (
    <Box sx={{m:2}}>
      <Typography sx={{mb:1}}>Email</Typography>
      <TextField
        id="email"
        type="email"
        variant="outlined"
        label="Email"
        required
        value={email}
        onChange={handleEmailChange}
      />
    </Box>
  );
}

export default TxtEmail;
