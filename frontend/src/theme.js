import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#210F37", // Deep Purple
    },
    secondary: {
      main: "#4F1C51", // Dark Magenta
    },
    error: {
      main: "#A55B4B", // Rusty Red for errors
    },
    success: {
      main: "#DCA06D", // Warm Gold for success
    },
    background: {
      default: "#F5F5F5", // Light background
      paper: "#FFFFFF", // White background for cards
    },
    text: {
      primary: "#210F37", // Deep Purple for main text
      secondary: "#4F1C51", // Dark Magenta for subtext
    },
  },
  typography: {
    fontFamily: `"Cinzel", "Cinzel Fallback", serif`,
    h1: {
      fontFamily: `"Raleway", "Raleway Fallback", sans-serif`,
      fontWeight: 700,
    },
    h2: {
      fontFamily: `"Raleway", "Raleway Fallback", sans-serif`,
      fontWeight: 600,
    },
    h6 :{
        fontFamily: `"Raleway", "Raleway Fallback", sans-serif`,
        fontWeight: 600,
        color: "#4F1C51",
      },
    body1: {
      fontFamily: `"Cinzel", "Cinzel Fallback", serif`,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "10px 18px",
          fontWeight: 600,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#210F37", // Default text color
        },
      },
    },
  },
});

export default theme;
