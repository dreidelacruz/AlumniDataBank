import { Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";

function TxtCurrentCompany(props: any) {
  const { companyName, setCompanyName, companyAddress, setCompanyAddress } =
    props;

  const handleCompanyName = (e: any) => {
    setCompanyName(e.target.value);
  };

  const handleCompanyAddress = (e: any) => {
    setCompanyAddress(e.target.value);
  };
  return (
    <Box sx={{ m: 2 }}>
      <Typography sx={{ mb: 1 }}>Current Company *not required*</Typography>
      <Stack>
        <Box sx={{ mb: 2 }}>
          <TextField
            sx={{ mb: 2 }}
            id="companyName"
            label="Company Name"
            value={companyName}
            onChange={handleCompanyName}
          />
        </Box>
        <Box>
          <TextField
            id="companyAddress"
            label="Company Address"
            value={companyAddress}
            onChange={handleCompanyAddress}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default TxtCurrentCompany;
