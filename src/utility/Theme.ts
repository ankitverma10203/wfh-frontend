import { ThemeOptions } from "@mui/material";

const wfhTheme = (darkMode: boolean): ThemeOptions => {
  return {
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#5cb1fe" : "#1976d2",
        contrastText: "white"
      },
      secondary: {
        main: darkMode ? "#f48fb1" : "#60febd",
        light: darkMode ? "#fdd1e0" : "#b0fbdc",
        dark: darkMode ? "#f48fb1" : "#05a060"
      },
      background: {
        default: darkMode ? "#131212" : "#f5f5f5",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#333",
        secondary: darkMode ? "#f5f5f5" : "#757575",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
      h1: {
        fontSize: "2rem",
        fontWeight: 700,
        color: darkMode ? "#ffffff" : "inherit",
      },
      h2: {
        fontSize: "1.7rem",
        fontWeight: 600,
        color: darkMode ? "#ffffff" : "#333",
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: darkMode ? "#ffffff" : "#333",
      },
      h5: {
        fontSize: "1.3rem",
        fontWeight: 100,
        color: darkMode ? "#ffffff" : "#333",
      },
      h6: {
        fontSize: "1.1rem",
        fontWeight: 100,
        color: darkMode ? "#ffffff" : "#333",
      },
      body1: {
        fontSize: "1rem",
        color: darkMode ? "#ffffff" : "#333",
      },
      body2: {
        fontSize: "0.875rem",
        color: darkMode ? "#fff" : "#333",
      },
    },
  };
};

export default wfhTheme;
