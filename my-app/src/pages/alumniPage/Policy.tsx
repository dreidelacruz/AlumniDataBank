import { Box, Card, Container, Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";
import NavBar from "../../components/alumni/NavBar";
import baliuagbg from "../../assets/isuBG.jpg";

const StyledContainer = styled(Container)({
  position: "relative",
  backgroundImage: `url(${baliuagbg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
});

const StyledBox = styled(Box)({
  justifyContent: "center",
  display: "flex",
});

const StyledCard = styled(Card)`
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 500px;
  margin: 10px;
  padding: 30px;
  transition: transform 0.3s ease-out;
  transform: translateY(0);
  will-change: transform;

  &:hover {
    transform: translateY(-10px);
  }
`;

function Policy() {
  return (
    <>
      <NavBar />
      <StyledContainer maxWidth="xl">
        <StyledBox>
          <StyledCard>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Terms and Policy
            </Typography>
            <Typography variant="h5" gutterBottom sx={{mt:5}}>
              Introduction
            </Typography>
            <Divider
              sx={{
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                mb: 2,
              }}
            />
            <Typography variant="body1" gutterBottom>
              Welcome to the alumni tracer web app. This Terms and Policy
              document governs your use of the web app. By accessing or using
              the web app, you agree to comply with these terms and policies.
              Please read them carefully.
            </Typography>
            <Typography variant="h5" gutterBottom sx={{mt:5}}>
              Job Posts and Uploads
            </Typography>
            <Divider
              sx={{
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                mb: 2,
              }}
            />
            <Typography variant="body1" gutterBottom>
              Alumni are allowed to post job openings and upload job files and
              images. However, only job images are visible to other alumni.
              Detailed job files can be accessed by interested alumni after
              providing employment, first job, and educational details. The web
              app is not responsible for the accuracy or content of the job
              posts or uploaded files.
            </Typography>
            <Typography variant="h5" gutterBottom sx={{mt:5}}>
              Alumni Profiles and Privacy
            </Typography>
            <Divider
              sx={{
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                mb: 2,
              }}
            />
            <Typography variant="body1" gutterBottom>
              Each alumni has the option to hide their personal details from
              other alumni. By default, personal details such as contact
              information and company details are shared. But the has the option
              to hide those. With that, alumni can view other alumni profiles
              with limited information. The web app respects user privacy and
              will not disclose personal information without explicit consent.
            </Typography>
            <Typography variant="h5" gutterBottom sx={{mt:5}}>
              Data Collection and Usage
            </Typography>
            <Divider
              sx={{
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                mb: 2,
              }}
            />
            <Typography variant="body1" gutterBottom>
              The web app collects and uses data provided by alumni for the
              purpose of alumni tracing. The data includes employment details,
              first job information, and educational information. This data is
              used to improve the tracer system and help the school.
            </Typography>
            <Typography variant="h5" gutterBottom sx={{mt:5}}>
              Disclaimer
            </Typography>
            <Divider
              sx={{
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                mb: 2,
              }}
            />
            <Typography variant="body1" gutterBottom>
              The web app is provided on an "as is" basis. While we strive to
              ensure the accuracy and reliability of the information and
              services provided, we cannot guarantee its completeness,
              timeliness, or accuracy. The web app shall not be held liable for
              any damages or losses arising from the use of the app or reliance
              on the information provided.
            </Typography>
          </StyledCard>
        </StyledBox>
      </StyledContainer>
    </>
  );
}

export default Policy;
