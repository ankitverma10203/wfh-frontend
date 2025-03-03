import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";
import { Logout } from "@mui/icons-material";
import {
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";

function UserInfo() {
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

  return (
    <>
      <Typography
        sx={{ marginLeft: 2, fontSize: "large", fontFamily: "monospace" }}
      >
        {name}
      </Typography>
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
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserInfo;
