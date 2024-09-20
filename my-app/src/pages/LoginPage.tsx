import {
  Alert,
  Box,
  Button,
  Container,
  InputAdornment,
  Snackbar,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import baliuagbg from "../assets/isuBG.jpg";
import isuLogo from "../assets/isuLogo.png";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Stack } from "@mui/system";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";

const StyledContainer = styled(Box)({
  position: "relative",
  backgroundImage: `url(${baliuagbg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100vw", // Full width of the viewport
  height: "100vh",
  display: "flex",
  justifyContent: "center",
});

const StyledBox = styled(Box)({
  borderRadius: "2px",
  width: "fit-content",
  height: "auto",
  textAlign: "center",
  margin: "10px",
});

const StyledTextField = styled(TextField)({
  margin: "20px 40px",
  display: "flex",
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const alumniData = localStorage.getItem('alumni');
    if (alumniData) {
      navigate('/alumni-home');
    }
  }, [navigate]);

  useEffect(() => {
    const handlePopState = () => {
      const alumniData = localStorage.getItem('alumni');
      if (alumniData) {
        navigate('/alumni-home');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:5001/api/Account/login",
        {
          email,
          password,
        }
      );
      const currentAlumniResponse = await axios.get(
        `https://localhost:5001/api/Account/get-current-user/${response.data.id}`
      );
      if (currentAlumniResponse.status === 200) {
        localStorage.setItem(
          "alumni",
          JSON.stringify(currentAlumniResponse.data)
        );
        console.log(localStorage.getItem("alumni"));
        navigate("/alumni-home");
      }
      if (currentAlumniResponse.data.email === "admin@test.com") {
        navigate("/admin-dashboard");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<any>;
      if (axiosError.response?.status === 401) {
        const errorMessage =
          axiosError.response.data.title || axiosError.response.data;
        if (errorMessage === "Unauthorized") {
          setError("The email you provided does not exist.");
        } else if (errorMessage === "Password is incorrect") {
          setError("The password is incorrect.");
        } else if (errorMessage === "Email is not confirmed") {
          setError("The email is not verified.");
        } else {
          setError("An unexpected error occurred");
        }
        setSnackbarOpen(true);
      } else {
        setError("An unexpected error occurred");
        setSnackbarOpen(true);
      }
    }
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <StyledContainer>
        <Stack justifyContent="center" alignItems="flex-end" sx={{ mt: 6 }}>
          <StyledBox
            bgcolor={"background.paper"}
            boxShadow={"7px 7px 7px #433F3F"}
          >
            <Box
              sx={{
                width: "100%",
                height: "80px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  backgroundColor: "#FECD07",
                  transformOrigin: "top left",
                  transform: "skewY(-8deg)",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                top: "-45px",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 100,
                  width: 100,
                  position: "relative",
                  zIndex: 1,
                }}
                alt="cite-logo"
                src={isuLogo}
              />
            </Box>
            <Typography fontSize={24} fontWeight={500}>
              Login
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <StyledTextField
                id="email"
                variant="outlined"
                type={"email"}
                placeholder="Enter email"
                label="Email"
                value={email}
                onChange={handleEmailChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                id="password"
                variant="outlined"
                type={"password"}
                placeholder="Enter password"
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                type="submit"
                endIcon={<LoginOutlinedIcon />}
                sx={{ borderRadius: 1, mt: 1, mb: 1 }}
                color="info"
              >
                Login
              </Button>
            </Box>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 5,
                fontStyle: "italic",   // Makes the text italic
                fontSize: "0.875rem"   // Adjusts the font size to be smaller (you can adjust this value as needed)
              }}
            >
              <Link to="/register">
                <Button sx={{fontSize:10, fontStyle:"italic"}}>Create an Account</Button>
              </Link>
            </Typography>
          </StyledBox>
        </Stack>
      </StyledContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleSnackbarClose}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginPage;
