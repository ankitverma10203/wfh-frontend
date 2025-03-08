import { Logout } from "@mui/icons-material";
import {
  Menu,
  MenuItem,
  Avatar,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { MouseEvent } from "react";

function UserInfo(props: {
  anchorEl: null | HTMLElement;
  handleClose: (e: {}, reason: "escapeKeyDown" | "backdropClick") => void;
  handleLogout: (
    _event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
  ) => void;
  name: string;
  picture: string;
  email: string;
}) {
  return (
    <Menu
      anchorEl={props.anchorEl}
      id="account-menu"
      open={Boolean(props.anchorEl)}
      onClose={props.handleClose}
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
        <Avatar
          sx={{ width: 100, height: 100 }}
          src={props.picture}
          alt="User Image"
          slotProps={{ img: { draggable: false } }}
        />
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
          <b>Name:</b> {props.name}
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
          <b>Email:</b> {props.email}
        </Typography>
      </MenuItem>
      <MenuItem
        onClick={props.handleLogout}
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
  );
}

export default UserInfo;
