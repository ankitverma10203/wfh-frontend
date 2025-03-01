import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Logout, NotificationsTwoTone } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { Avatar, Box, Link, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { NavLink } from "../Types";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar(prop: { links: NavLink[]; notifications: any[] }) {
  const { user, logout } = useAuth0();
  const [name, setName] = useState<string>(user?.name || "");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (user?.name || !name) {
      setName(user?.name || "");
    }
  }, [user?.name]);

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

  return (
    <AppBar position="static" sx={{ margin: 0, padding: 0 }}>
      <Toolbar>
        <Typography variant="h3" component="span">
          WFH
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          {prop.links.map((navLink) => (
            <Link
              key={navLink.name}
              href={navLink.link}
              color={"inherit"}
              underline="none"
              sx={{ marginLeft: 5, fontSize: "large", fontFamily: "monospace" }}
            >
              {navLink.name}
            </Link>
          ))}
        </Box>

        <IconButton aria-label="NotificationsActive" color="default">
          <Badge badgeContent={prop.notifications.length} color="secondary">
            <NotificationsTwoTone fontSize="large" color="inherit" />
          </Badge>
        </IconButton>
        <Typography
          sx={{ marginLeft: 2, fontSize: "large", fontFamily: "monospace" }}
        >
          {user?.name}
        </Typography>
        <IconButton
          aria-label="AccountCircleRounded"
          color="default"
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
        >
          <Avatar sx={{ width: 32, height: 32 }} src={user?.picture} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
