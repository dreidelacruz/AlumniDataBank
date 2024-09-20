import {
  Box,
  styled,
} from "@mui/material";
import PostCard from "./PostCard";

const StyledBox = styled(Box)({
  borderRadius: "5px",
  alignItems: "left",
  backgroundColor: "#195f29",
  padding: "2px",
  background: "primary",
  display: "flex",
});


function MainFeed() {
  return (
    <div>
      <StyledBox>
        <PostCard />
      </StyledBox>
    </div>
  );
}

export default MainFeed;

