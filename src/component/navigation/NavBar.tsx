import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import NavLinksComponent from "./NavLinksComponent";
import UserInfo from "./UserInfo";
import NotificationComponent from "./NotificationComponent";

function NavBar() {
  return (
    <AppBar position="sticky" sx={{ margin: 0, padding: 0 }}>
      <Toolbar>
        <Typography variant="h3" component="span">
          WFH
        </Typography>
        <NavLinksComponent />

        <NotificationComponent />

        <UserInfo />
      </Toolbar>
    </AppBar>
  );
}
export default React.memo(NavBar);
