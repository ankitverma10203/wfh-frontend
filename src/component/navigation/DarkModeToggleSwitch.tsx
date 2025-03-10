import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import NightlightTwoToneIcon from "@mui/icons-material/NightlightTwoTone";
import { Box, IconButton } from "@mui/material";

function DarkModeToggleSwitch(props: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) {
  return (
    <Box display="flex" alignItems="center">
      <IconButton
        aria-label="theme-mode"
        title="Toggle Dark Mode"
        onClick={props.toggleDarkMode}
        sx={{
          borderRadius: "3rem",
          display: "flex",
          direction: "row",
          justifyContent: "space-between",
          boxShadow: "inset 0 0 0.6rem rgba(0, 0, 0, 0.3)",
        }}
        disableTouchRipple
      >
        <NightlightTwoToneIcon
          fontSize="medium"
          color={props.darkMode ? "secondary" : "disabled"}
          sx={{ margin: "0 0.2rem 0 0" }}
        />
        <LightModeTwoToneIcon
          fontSize="medium"
          color={props.darkMode ? "disabled" : "secondary"}
          sx={{ margin: "0 0 0 0.2rem" }}
        />
      </IconButton>
    </Box>
  );
}

export default DarkModeToggleSwitch;
