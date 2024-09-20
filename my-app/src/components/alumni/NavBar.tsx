import {
  AppBar,
  InputBase,
  styled,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchContext from "../../contexts/SearchContext";
import { useUserPhoto } from "../../contexts/UserPhotoContext";
import axios from "axios";
import useAuthRedirect from "../../useAuthRedirect";
import ISULogo from "../../assets/ISULogo";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "#B0B0B0",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledSearchInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherent",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const NavBar = () => {
  useAuthRedirect();
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [allAlumniIds, setAllAlumniIds] = useState<string[]>([]);

  const { setUserPhoto } = useUserPhoto();

  const location = useLocation();

  const alumniData = localStorage.getItem("alumni");
  const alumniId = alumniData ? JSON.parse(alumniData).id : null;
  const profileLink = alumniId
    ? `/alumni-profile/${alumniId}`
    : "/alumni-profile";

  useEffect(() => {
    const updatePhoto = async () => {
      const alumniData = localStorage.getItem("alumni");
      if (alumniData) {
        const parsedData = JSON.parse(alumniData);
        const userId = parsedData.id;
        try {
          const response = await axios.get(
            `https://localhost:5001/api/Account/get-current-user/${userId}`
          );
          setUserPhoto(response.data.userPhoto);
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      }
    };

    const fetchAllAlumniIds = async () => {
        try {
          const response = await axios.get(
            "https://localhost:5001/api/Account/alumni/all"
          );
          const alumniIds = response.data.data.map((alumni: any) => alumni.id);
          setAllAlumniIds(alumniIds);
        } catch (error) {
          console.error("Error fetching alumni IDs:", error);
        }
      };


    updatePhoto();
    fetchAllAlumniIds();
  }, [location, setUserPhoto]);

  const shouldDisplaySearch = () => {
    const alumniProfilePaths = allAlumniIds.map(id => `/alumni-profile/${id}`);
    const pagesWithoutSearch = [...alumniProfilePaths, "/policy"];
    return !pagesWithoutSearch.includes(location.pathname);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("alumni");
    navigate("/login", { replace: true }); 
  };

  const userPhoto = alumniData ? JSON.parse(alumniData).userPhoto : "";


  return (
    <AppBar position="sticky">
      <StyledToolBar>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ISULogo />
            <Typography
              variant="h5"
              sx={{ ml: 1, mr: 1 }}
              fontFamily="Goudy Old Style"
            >
              ISABELA STATE UNIVERSITY
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ISULogo />
            <Typography
              variant="h5"
              sx={{ ml: 1, mr: 1 }}
              fontFamily="Goudy Old Style"
            >
              ISU
            </Typography>
          </Box>
        </Box>
        {shouldDisplaySearch() && (
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="primary" />
            </SearchIconWrapper>
            <StyledSearchInputBase
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for job…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        )}
        <IconButton onClick={handleAvatarClick}>
          <Avatar sx={{ width: 40, height: 40 }} src={userPhoto} />
        </IconButton>
      </StyledToolBar>
      <Box
        sx={{
          backgroundColor: "#FECD07",
          padding: "0px 12px", // Adjust padding to control the height of the box
          textAlign: "center",
        }}
      >
        <Typography variant="body2" textAlign="left" sx={{ color: "#000000" }}>
          BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY
        </Typography>
      </Box>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={handleMenuClose}
        anchorEl={anchorEl || undefined}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate("/alumni-home");
          }}
        >
          Home
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate(profileLink);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate("/policy");
          }}
        >
          Policy
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavBar;
