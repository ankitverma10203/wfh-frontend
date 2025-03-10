import { ThemeOptions } from "@mui/material";

const wfhTheme = (darkMode: boolean): ThemeOptions => {
  return {
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#f48fb1" : "#0b6ac8",
        contrastText: "white",
      },
      secondary: {
        main: darkMode ? "#f48fb1" : "#60febd",
        light: darkMode ? "#fdd1e0" : "#b0fbdc",
        dark: darkMode ? "#f48fb1" : "#05a060",
      },
      background: {
        default: darkMode ? "#383b40" : "#f2f2f2",
        paper: darkMode ? "#24292e" : "#fff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#333",
        secondary: darkMode ? "#f5f5f5" : "#757575",
      },
      success: {
        main: darkMode ? "#2cc385" : "#05a060",
      },
      error: {
        main: darkMode ? "#ea5757" : "#cc0000",
      },
      warning: {
        main: "rgb(204, 153, 0)",
      },
      // divider: darkMode ? "#fff" : "rgba(0, 0, 0, 1)",
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
        fontWeight: 500,
        color: darkMode ? "#ffffff" : "#333",
      },
      h5: {
        fontSize: "1.3rem",
        fontWeight: 400,
        color: darkMode ? "#ffffff" : "#333",
      },
      h6: {
        fontSize: "1.1rem",
        fontWeight: 300,
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
