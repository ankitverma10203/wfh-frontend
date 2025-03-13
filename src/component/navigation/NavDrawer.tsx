import { Logout } from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  Box,
  Avatar,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import NavLinksComponent from "./NavLinksComponent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth0 } from "@auth0/auth0-react";
import { MouseEvent } from "react";
import { RoleOptions } from "../../Constants";

function NavDrawer(props: {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => void;
  handleLogout: (
    event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
  ) => void;
  picture: string;
  name: string;
  email: string;
  role: RoleOptions;
}) {
  const theme = useTheme();
  const { logout } = useAuth0();

  return (
    <Drawer
      anchor="left"
      open={props.drawerOpen}
      onClose={() => props.toggleDrawer(false)}
      PaperProps={{
        sx: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        },
      }}
    >
      <IconButton onClick={() => props.toggleDrawer(false)}>
        <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton
          aria-label="AccountCircleRounded"
          color="default"
          size="small"
          sx={{ ml: 2 }}
        >
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={props.picture}
            alt="User Image"
            slotProps={{ img: { draggable: false } }}
          />
        </IconButton>
        <Typography>{props.name}</Typography>
        <Typography>{props.email}</Typography>
        <Typography>Role: {props.role}</Typography>
      </Box>
      <Divider
        sx={{
          margin: "10px",
          width: "100%",
          backgroundColor: theme.palette.secondary.dark,
          opacity: "30%",
        }}
      />
      <Box
        sx={{ marginRight: "35px", display: "flex", flexDirection: "column" }}
      >
        <NavLinksComponent
          role={props.role}
          highlightColor={theme.palette.secondary.dark}
          hoverColor={theme.palette.secondary.dark}
        />
      </Box>
      <Divider
        sx={{
          margin: "10px",
          width: "100%",
          backgroundColor: theme.palette.secondary.dark,
          opacity: "30%",
        }}
      />
      <IconButton
        onClick={() =>
          logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          })
        }
        sx={{
          borderRadius: "3rem",
          marginBottom: "10vh"
        }}
      >
        <Logout />
        <Typography>Logout</Typography>
      </IconButton>
    </Drawer>
  );
}

export default NavDrawer;
