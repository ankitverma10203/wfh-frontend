import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { MouseEvent, useEffect, useState } from "react";
import NavLinksComponent from "./NavLinksComponent";
import NotificationComponent from "./NotificationComponent";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  colors,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Logout } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";

function NavBar() {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth0();
  const [name, setName] = useState<string>(Cookies.get("name") || "");
  const [picture, setPicture] = useState<string>(Cookies.get("picture") || "");

  function handleClose(
    _event: {},
    _reason: "escapeKeyDown" | "backdropClick"
  ): void {
    setAnchorEl(null);
  }

  function handleLogout(
    _event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
  ): void {
    setAnchorEl(null);
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  function handleClick(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): void {
    setAnchorEl(event.currentTarget);
  }

  useEffect(() => {
    if (user?.picture && user.picture !== picture) {
      setPicture(user.picture);
      Cookies.set("picture", user.picture);
    }
  }, [user?.picture, picture]);

  useEffect(() => {
    if (user?.name && user.name !== name) {
      setName(user.name);
      Cookies.set("name", user.name);
    }
  }, [user?.name, name]);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ margin: 0, padding: 0 }}>
        <Toolbar>
          {isMediumScreen && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ marginRight: "20px" }}
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h3" component="span">
            WFH
          </Typography>
          {!isMediumScreen && (
            <Box sx={{ flexGrow: 1 }}>
              <NavLinksComponent />
            </Box>
          )}
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            <NotificationComponent />
            {!isSmallScreen && <Typography>{name}</Typography>}

            <Box>
              <IconButton
                aria-label="AccountCircleRounded"
                color="default"
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
              >
                <Avatar sx={{ width: 32, height: 32 }} src={picture} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <MenuItem
                  sx={{
                    display: "flex",
                    direction: "column",
                    justifyContent: "center",
                  }}
                  disableRipple
                >
                  <Avatar sx={{ width: 100, height: 100 }} src={picture} />
                </MenuItem>
                <MenuItem
                  disableRipple
                  sx={{
                    display: "flex",
                    direction: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography>
                    <b>Name:</b> {name}
                  </Typography>
                </MenuItem>
                <MenuItem
                  disableRipple
                  sx={{
                    display: "flex",
                    direction: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography>
                    <b>Email:</b> {user?.email}
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    display: "flex",
                    direction: "column",
                    justifyContent: "center",
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                    <Typography>Logout</Typography>
                  </ListItemIcon>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.primary.main,
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          },
        }}
      >
        <IconButton sx={{ color: "white" }} onClick={() => toggleDrawer(false)}>
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
            <Avatar sx={{ width: 100, height: 100 }} src={picture} />
          </IconButton>
          <Typography>{name}</Typography>
          <Typography sx={{ fontWeight: "" }}>{user?.email}</Typography>
        </Box>
        <Divider
          sx={{ margin: "10px", width: "100%", backgroundColor: "lightblue", opacity: "30%" }}
        />
        <Box
          sx={{ marginRight: "35px", display: "flex", flexDirection: "column" }}
        >
          <NavLinksComponent />
        </Box>
        <Divider
          sx={{ margin: "10px", width: "100%", backgroundColor: "lightblue", opacity: "30%"  }}
        />
        <IconButton onClick={() => handleLogout} sx={{ color: "white" }}>
          <Logout fontSize="small" />
          <Typography>Logout</Typography>
        </IconButton>
      </Drawer>
    </>
  );
}
export default React.memo(NavBar);
