import { Box, Container, Stack, styled } from '@mui/material';
import baliuagbg from '../assets/isuBG.jpg'
import RegisterCard from '../components/register-components/RegisterCard';

const StyledContainer = styled(Container)({
  position: "static",
  backgroundImage: `url(${baliuagbg})`,
  minHeight: "100%",
  minWidth: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  padding: "5px",
});


const RegisterPage = () => {
  return (
    <StyledContainer>
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <RegisterCard/>
    </Stack>
    </StyledContainer>
  )
}

export default RegisterPage