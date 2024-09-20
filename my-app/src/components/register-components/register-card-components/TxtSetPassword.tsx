import { Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";

function TxtSetPassword(props: any) {
  const { password, setPassword, rePassword, setRePassword } = props;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
  };

  return (
      <Box sx={{ m: 2 }}>
        <Typography sx={{ mb: 1 }}>Set Password</Typography>
        <Stack>
          <Box sx={{ mb: 2 }}>
            <TextField
              sx={{ mb: 2 }}
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={handlePasswordChange}
              inputProps={{
                pattern:
                  "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{6,}",
                title:
                  "Password must have 1 Uppercase, 1 Lowercase, 1 number, 1 non alphanumeric and at least 6 characters",
              }}
            />
          </Box>
          <Box>
            <TextField
              id="rePassword"
              label="Re-type Password"
              type="password"
              autoComplete="current-password"
              required
              value={rePassword}
              onChange={handleRePasswordChange}
            />
          </Box>
        </Stack>
      </Box>
  );
}

export default TxtSetPassword;
