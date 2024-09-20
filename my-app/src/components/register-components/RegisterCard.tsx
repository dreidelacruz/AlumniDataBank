import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import RdoGender from "./register-card-components/RdoGender";
import CmbGradCourse from "./register-card-components/CmbGradCourse";
import { useEffect, useState } from "react";
import axios from "axios";
import TxtFullName from "./register-card-components/TxtFullName";
import TxtSetPassword from "./register-card-components/TxtSetPassword";
import TxtEmail from "./register-card-components/TxtEmail";
import TxtContactNumber from "./register-card-components/TxtContactNumber";
import TxtCurrentCompany from "./register-card-components/TxtCurrentCompany";
import DiaProceedResgister from "./register-card-components/DiaProceedResgister";
import { Link, useNavigate } from "react-router-dom";
import CmbYear from "./register-card-components/CmbYear";

const RegisterCard = () => {
  const proceedPage = useNavigate();
  const [displayName, setDisplayName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyAddress, setCompanyAddress] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [yearDatas, setYearDatas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitRegister = (e: any) => {
    e.preventDefault();
    if (password !== rePassword) {
      // console.log("asdsadsadsada")
      alert("Password do not match");
      return;
    }
    setShowConfirmationDialog(true);
  };

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const yearResponse = await axios.get("https://localhost:5001/api/Year");
        setYearDatas(yearResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchYears();
  }, []);

  const handleProceedRegister = () => {
    console.log("Registration successful!");

    const alumniAccountData = {
      displayName,
      password,
      email,
      year,
      phoneNumber,
      companyName,
      companyAddress,
      gender,
      course,
    };

    setIsLoading(true); // Set isLoading to true to show the CircularProgress

    axios
      .post(
        "https://localhost:5001/api/Account/alumni/register",
        alumniAccountData
      )
      .then((response) => {
        console.log(response);

        const courseIdArr = yearDatas
          .filter((yearData) => yearData.graduatedSchoolYear === year)
          .map((yearData) => yearData.course.id);

        const courseId = courseIdArr[0];

        return axios.put(
          `https://localhost:5001/api/Year/course/${course}/${courseId}`
        );
      })
      .then(() => {
        const genderIdArray = yearDatas
          .filter((yearData) => yearData.graduatedSchoolYear === year)
          .map((yearData) => yearData.gender.id);
        const genderId = genderIdArray[0];

        return axios.put(
          `https://localhost:5001/api/Year/gender/${gender}/${genderId}`
        );
      })
      .then(() => {
        setShowConfirmationDialog(false);
        proceedPage("/login");
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Error registering account! Try again. Please fill up the required form"
        );
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false to hide the CircularProgress
      });
  };

  const handleCancelRegister = () => {
    setShowConfirmationDialog(false);
  };

  return (
    <Card
      sx={{
        width: "100%",
        minWidth: "300px",
        "@media (min-width: 600px)": {
          maxWidth: "45%",
          minWidth: "400px",
        },
      }}
    >
      <form onSubmit={handleSubmitRegister}>
        <Box
          sx={{
            width: "100%",
            height: "100px",
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
                top: "-35px",
              }}
            >
        <CardHeader
          title={
            <Typography variant="h4" fontWeight="bold" textAlign="center">
              Register an Account
            </Typography>
          }
        />
        </Box>
        <CardContent>
          <Typography variant="h6" fontWeight="Bold" textAlign="center">
            Personal Details
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ md: 1 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={6}>
                <Box>
                  <TxtFullName
                    fullName={displayName}
                    setFullName={setDisplayName}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <TxtSetPassword
                    password={password}
                    setPassword={setPassword}
                    rePassword={rePassword}
                    setRePassword={setRePassword}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <TxtEmail email={email} setEmail={setEmail} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <TxtContactNumber
                    mobileNumber={phoneNumber}
                    setMobileNumber={setPhoneNumber}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ m: 2 }}>
                  <Typography>Year Graduated</Typography>
                  <CmbYear year={year} setYear={setYear} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <TxtCurrentCompany
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                    companyAddress={companyAddress}
                    setCompanyAddress={setCompanyAddress}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ m: 2 }}>
                  <RdoGender gender={gender} setGender={setGender} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ m: 2 }}>
                  <CmbGradCourse course={course} setCourse={setCourse} />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", mt: 2 }}
          >
            <Link to="/login">
              <Button sx={{ margin: 1, borderRadius: 1 }}>Back</Button>
            </Link>
            <Button
              variant="contained"
              type="submit"
              color="info"
              sx={{ margin: 1, borderRadius: 1 }}
            >
              Register
            </Button>
          </Stack>
        </CardContent>
      </form>
      <DiaProceedResgister
        showConfirmationDialog={showConfirmationDialog}
        handleCancelRegister={handleCancelRegister}
        handleProceedRegister={handleProceedRegister}
        isLoading={isLoading}
      />
    </Card>
  );
};

export default RegisterCard;
