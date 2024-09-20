import {
    AppBar,
    styled,
    Toolbar,
    Typography,
    Box,
    Menu,
    MenuItem,
    IconButton,
  } from "@mui/material";
  import CiteLogo from "../../assets/ISULogo";
  import MenuIcon from '@mui/icons-material/Menu';
  import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthRedirect from "../../useAuthRedirect";
  
  const StyledToolBar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });
  
  
  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
  }));  
  
  const NavBarAdmin = () => {
    useAuthRedirect();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
  
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
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
            <CiteLogo />
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
            <CiteLogo />
            <Typography
              variant="h5"
              sx={{ ml: 1, mr: 1 }}
              fontFamily="Goudy Old Style"
            >
              ISU
            </Typography>
          </Box>
        </Box>
        <StyledIconButton
        onClick={handleMenuClick}
        >
          <MenuIcon
            sx={{ width: 40, height: 40, color:"white" }}
          />
        </StyledIconButton>
      </StyledToolBar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleMenuClose} component="a" href="/admin-dashboard">
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          component="a"
          href="/alumni-records"
        >
          Alumni Records
        </MenuItem>
        <MenuItem onClick={handleLogout} component="a" href="/login">
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
    )
  }
  
  export default NavBarAdmin;
  