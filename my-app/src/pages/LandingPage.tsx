import React, { useEffect, useState } from "react";
import baliuagbg from "../assets/isuBG.jpg";
import {
  Box,
  Button,
  Stack,
  Typography,
  keyframes,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";

const StyledContainer = styled(Box)`
  background-image: url(${baliuagbg});
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding-top: 5px;
  padding-bottom: 5px;
  z-index: 0; /* Ensure the container itself is below the content */

  /* Ensure the container covers the entire viewport */
  width: 100vw; /* Full width */
  height: 100vh; /* Full height */

  /* Add the dark overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: -1; /* Place the overlay behind the content */
  }

  /* Ensure the content is above the overlay */
  position: relative;
`;

const revealAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const useTypingEffect = (text: string, typingSpeed: any) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, typingSpeed]);

  return displayedText;
};

function LandingPage() {
  const animatedText = useTypingEffect(
    '"Link with Alumni, Link with Ventures, Link with Your Future."',
    40
  );
  return (
    <StyledContainer>
      <Stack
        direction={{ xs: "column", sm: "column" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="center"
        alignItems="flex-end"
      >
        <Typography
          component="h1"
          fontSize="6rem"
          textAlign="right"
          fontWeight={800}
          sx={{
            mr: 7,
            mt: 10,
            color: "white",
            animation: `${revealAnimation} 1s ease-in-out forwards`,
            textShadow: '4px 4px 8px Green',
          }}
        >
          ALUMNI DATA <br />
          BANK
        </Typography>

        <Box sx={{ mr: 7 }}>
          <Typography
            textAlign="right"
             fontSize="21.5px"
            sx={{
              color: "white",
              mr: 7,
              textShadow: '4px 4px 8px yellow',
            }}
            
          >
            {animatedText}
          </Typography>
        </Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ p: 7 }}
        >
          <Button
            component={Link}
            to="/login"
            color="success"
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Log in
          </Button>
          <Button
            component={Link}
            to="/register"
            color="inherit"
            variant="contained"
            sx={{ mr: 7, borderRadius: 2 }}
          >
            Sign up
          </Button>
        </Stack>
      </Stack>
    </StyledContainer>
  );
}

export default LandingPage;
