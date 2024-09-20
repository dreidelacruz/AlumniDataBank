import NavBar from '../../components/alumni/NavBar'
import AlumniProfile from '../../components/alumni/alumni-profile-components/AlumniProfile'
import { Container, styled } from '@mui/material'
import { useParams } from 'react-router-dom'
import baliuagbg from "../../assets/isuBG.jpg"

const StyledContainer = styled(Container)`
background-image: linear-gradient(175deg, transparent 60%, #FECD07 30%), url(${baliuagbg});
  background-size: cover;
  background-position: center;
  position: fixed;
  top: calc(64px + 20px);
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding-top: 5px;
  padding-bottom: 5px;

  @media (max-width: 600px) {
    top: calc(56px + 20px);
  }
`;

function AlumniProfilePage() {
  const { id } = useParams();

  return (
    <>
      <NavBar />
      <StyledContainer maxWidth="xl">
      <AlumniProfile id={id} /> 
      </StyledContainer>
    </>
  );
}

export default AlumniProfilePage