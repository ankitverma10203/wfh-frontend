import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { NotificationsTwoTone } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import React from "react";
import { RoleOptions } from "../../Constants";
import NavLinksComponent from "./NavLinksComponent";
import UserInfo from "./UserInfo";

function NavBar(prop: { notifications: any[]; role: RoleOptions }) {
  return (
    <AppBar position="sticky" sx={{ margin: 0, padding: 0 }}>
      <Toolbar>
        <Typography variant="h3" component="span">
          WFH
        </Typography>
        <NavLinksComponent role={prop.role} />

        <IconButton aria-label="NotificationsActive" color="default">
          <Badge badgeContent={prop.notifications.length} color="secondary">
            <NotificationsTwoTone fontSize="large" color="inherit" />
          </Badge>
        </IconButton>

        <UserInfo />
      </Toolbar>
    </AppBar>
  );
}
export default React.memo(NavBar);
