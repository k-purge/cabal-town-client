import { Theme } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material" {
  interface DefaultTheme extends Theme {}
}

// A custom theme for this app
let theme = createTheme({
  palette: {
    primary: {
      main: "#FFB800",
      contrastText: "#000",
    },

    secondary: {
      main: "#313855",
    },

    text: {
      primary: "#313855",
      secondary: "#00000",
    },
    error: {
      main: "#ef5350",
    },
    warning: {
      main: "#FF5147",
    },

    action: {
      active: "#ffffff",
      hover: "#00000",
      disabledBackground: "#B2B2B2",
      disabled: "",
    },
  },
  typography: {
    fontFamily: "Cabin Condensed, sans-serif",
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
