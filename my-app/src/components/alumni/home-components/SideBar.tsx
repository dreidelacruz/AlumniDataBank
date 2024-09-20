import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)({
  borderRadius: "3px",
  alignItems: "center",
  backgroundColor: "#FECD07",
  padding: "12px",
  // background: "primary",
  display: "flex",
  flexDirection: "column"
});

interface Alumnus {
  id: string;
  userPhoto: string;
  displayName: string;
}

function SideBar({ formSubmitted }: any) {
  const [alumni, setAlumni] = useState<Alumnus[]>([]);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const response = await axios.get(
        "https://localhost:5001/api/Account/alumni/all"
      );
      setAlumni(response.data.data);
    } catch (error) {
      console.error("Error fetching alumni:", error);
    }
  };

  const handleListItemClick = (id: string) => {
    navigate(`/alumni-profile/${id}`);
    console.log(id);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filteredAlumni = alumni.filter((alumnus) => {
    const displayName = alumnus.displayName.toLowerCase();
    const q = query.toLowerCase();
    return displayName.includes(q);
  });
  return (
    <Box>
      <StyledBox>
        <Typography
          sx={{
            alignItems: "center",
            textAlign: "center",
            fontWeight: "bold",
            color:"black"
          }}
        >
          View Alumni
        </Typography>
        <TextField
          id="filled-search"
          label="Search alumni..."
          type="search"
          variant="outlined"
          size="small"
          value={query}
          onChange={handleSearchChange}
          sx={{ mb: "15px", backgroundColor: "#fff", borderRadius: 1 }}
        />
        <Box>
          <List
            dense
            sx={{
              height: 450,
              bgcolor: "background.paper",
              borderRadius: "5px",
              overflow: "auto",
              "@media (max-width: 600px)": {
                maxHeight: "100%", // Set the maxHeight to 100% of the viewport height for small screens
                minWidth: "340px", // Set the minWidth to 100% for small screens
              },
              "@media (min-width: 601px)": {
                height: 570, // Set the maxHeight to 450px for larger screens
                minWidth: "330px", // Set the minWidth to 330px for larger screens
              },
            }}
          >
            {filteredAlumni.map((alumnus) => (
              <ListItem
                key={alumnus.id}
                disablePadding
                sx={{ borderRadius: "10px" }}
              >
                <ListItemButton
                  onClick={() => handleListItemClick(alumnus.id)}
                  disabled={!formSubmitted}
                >
                  <ListItemAvatar>
                    <Avatar alt={`avatar`} src={alumnus.userPhoto} />
                  </ListItemAvatar>
                  <ListItemText>{alumnus.displayName}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </StyledBox>
    </Box>
  );
}

export default SideBar;
