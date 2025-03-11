import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { MouseEvent, useEffect, useState } from "react";
import NavLinksComponent from "./NavLinksComponent";
import NotificationComponent from "./NotificationComponent";
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";
import NavDrawer from "./NavDrawer";
import UserInfo from "./UserInfo";
import DarkModeToggleSwitch from "./DarkModeToggleSwitch";
import { RoleOptions } from "../../Constants";
import { getEmployeeData } from "../../service/EmployeeDetailService";

function NavBar(props: { darkMode: boolean; toggleDarkMode: () => void }) {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout, getAccessTokenSilently } = useAuth0();
  const [name, setName] = useState<string>(Cookies.get("name") || "");
  const [picture, setPicture] = useState<string>(Cookies.get("picture") || "");
  const [role, setRole] = useState<RoleOptions>(
    (Cookies.get("role") as RoleOptions) || RoleOptions.EMPLOYEE
  );

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

  const fetchEmployeeDetail = async () => {
    const token = await getAccessTokenSilently();
    const employeeDetails = await getEmployeeData(token);
    if (employeeDetails.role !== role) {
      setRole(employeeDetails.role);
    }
  };

  useEffect(() => {
    fetchEmployeeDetail();
  }, []);

  useEffect(() => {
    Cookies.set("role", role);
  }, [role]);

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
          <Typography variant="h1" component="span" sx={{ marginRight: 2 }}>
            WFH
          </Typography>
          {!isMediumScreen && (
            <Box sx={{ flexGrow: 1 }}>
              <NavLinksComponent
                role={role}
                highlightColor={theme.palette.secondary.main}
                hoverColor={theme.palette.secondary.light}
              />
            </Box>
          )}
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            <DarkModeToggleSwitch
              darkMode={props.darkMode}
              toggleDarkMode={props.toggleDarkMode}
            />

            <NotificationComponent />

            <Box>
              <IconButton
                aria-label="AccountCircleRounded"
                color="default"
                onClick={handleClick}
                size="large"
              >
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  src={picture}
                  alt="User Image"
                  slotProps={{ img: { draggable: false } }}
                />
              </IconButton>

              <UserInfo
                anchorEl={anchorEl}
                handleClose={handleClose}
                name={name}
                picture={picture}
                email={user?.email || ""}
                role={role}
                handleLogout={handleLogout}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <NavDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        handleLogout={handleLogout}
        name={name}
        email={user?.email || ""}
        picture={picture}
        role={role}
      />
    </>
  );
}
export default React.memo(NavBar);
