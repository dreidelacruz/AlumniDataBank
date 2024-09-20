import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import baliuagbg from "../../assets/isuBG.jpg";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import axios from "axios";

function EmailConfirmationPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('https://localhost:5001/api/Account/EmailConfirmation', {
          userId,
          token,
        });

        if (response.status === 200) {
          console.log('Email verified successfully');
          // You can update the component state or show a success message here
        } else {
          console.log('Email verification failed');
          // You can update the component state or show an error message here
        }
      } catch (error) {
        console.error('Error during email verification:', error);
        // You can update the component state or show an error message here
      }
    };

    verifyEmail();
  }, [userId, token]);
  
  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundImage: `url(${baliuagbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Stack justifyContent="center" alignItems="center">
        <Card
          sx={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#dad9d7",
            m: 5,
            p: 5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MarkEmailReadIcon />
            <Typography variant="body1">Your email is now verified!</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/login">
              <Button sx={{ margin: 1, borderRadius: 1 }} variant="contained" color="info">
                Login
              </Button>
            </Link>
          </Box>
        </Card>
      </Stack>
    </Container>
  );
}

export default EmailConfirmationPage;
