import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#116736", 
      light: "#4eb43a",
      dark: "#0d4f2d",
    },
    secondary: {
        main:"#FECD07"
    },
    info: {
      main: "#FECD07",
    },
    // #8E44AD purple cite
    // #195f29 BU color
    // text:{
    //     primary:"#000000",
    //     secondary:"#7A7A7A"
    // }
  },
  typography: {
    fontFamily: "Roboto",
  },
});

const responsiveTheme = responsiveFontSizes(theme);
export default responsiveTheme;
