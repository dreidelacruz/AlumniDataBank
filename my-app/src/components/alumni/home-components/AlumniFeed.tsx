import {
  Container,
  Stack,
  styled,
} from "@mui/material";
import baliuagbg from "../../../assets/isuBG.jpg";
import SideBarOneTime from "../../one-time-forms/SideBarOneTime";
import FeedOneTime from "../../one-time-forms/FeedOneTime";
import AddPost from "./AddPost";
import { useState } from "react";


const StyledContainer = styled(Container)`
  background-image: url(${baliuagbg});
  background-size: cover;
  background-position: center;
  position: fixed;
  top: calc(64px + 20px);
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding-top: 5px:
  padding-bottom: 5px;

  @media (max-width: 600px) {
    top: calc(56px + 20px);
  }
`;

function AlumniFeed() {
  const [refreshPosts, setRefreshPosts] = useState(false);
  return (
    <StyledContainer maxWidth="xl">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          justifyContent: "center",
        }}
      >
        <SideBarOneTime />
        <FeedOneTime refreshPosts={refreshPosts} />
      </Stack>
      <AddPost onPostAdded={() => setRefreshPosts(!refreshPosts)} />
    </StyledContainer>
  );
}

export default AlumniFeed;
