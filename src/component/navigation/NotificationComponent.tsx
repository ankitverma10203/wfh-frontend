import { NotificationsTwoTone } from "@mui/icons-material";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { MouseEvent, useState, useEffect } from "react";
import {
  clearNotifications,
  fetchEmployeeNotifications,
} from "../../service/EmployeeNotificationDetailService";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";
import { EmployeeNotificationData } from "../../Types";
import wfhEventEmitter from "../../utility/EventEmitter";
import {
  APPROVAL_NOTIFICATION_EVENT_NAME,
  NAV_LINKS,
  NotificationLinks,
  NotificationType,
} from "../../Constants";
import { useNavigate } from "react-router-dom";

function NotificationComponent() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [messages, setMessages] = useState<EmployeeNotificationData[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(
    parseInt(Cookies.get("notificationCount") || "1")
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showFullNotification, setShowFullNotification] =
    useState<boolean>(false);
  const navigate = useNavigate();

  function handleClose(
    _event: {},
    _reason: "escapeKeyDown" | "backdropClick"
  ): void {
    setAnchorEl(null);
  }

  function handleClick(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): void {
    setAnchorEl(event.currentTarget);
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (messages && messages.length !== notificationCount) {
      setNotificationCount(messages.length);
      Cookies.set("notificationCount", messages.length.toString());
    }
  }, [messages]);

  const fetchNotifications = async () => {
    const token = await getAccessTokenSilently();
    const employeeNotifications: EmployeeNotificationData[] =
      await fetchEmployeeNotifications(token);
    const uniqueNotifications: EmployeeNotificationData[] = Array.from(
      new Set([...employeeNotifications, ...messages])
    );
    setMessages(uniqueNotifications);
  };

  useEffect(() => {
    if (user?.sub) {
      const eventSource = new EventSource(
        import.meta.env.VITE_API_URL + "/notification/" + user?.sub
      );

      eventSource.onmessage = (event) => {
        const notification: EmployeeNotificationData = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, notification]);

        if (
          notification.message.toLowerCase().includes("Approval".toLowerCase())
        ) {
          wfhEventEmitter.emit(APPROVAL_NOTIFICATION_EVENT_NAME);
        }
      };

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
  }, [user?.sub, messages]);

  async function clearNotification(notificationIds: number[]): Promise<void> {
    const updatedMessages = messages.filter(
      (msg) => !notificationIds.includes(msg.notificationId)
    );
    setMessages(updatedMessages);
    const token = await getAccessTokenSilently();
    clearNotifications(token, notificationIds);
  }

  function toggleShowFullNotification() {
    setShowFullNotification(!showFullNotification);
  }

  function navigateToPage(
    notificationId: number,
    notificationType: NotificationType
  ): void {
    if (notificationId) {
      const link = NAV_LINKS.filter(
        (navLink) => navLink.name === NotificationLinks[notificationType]
      )[0]?.link;
      navigate(link);
      clearNotification([notificationId]);
      setAnchorEl(null);
    }
  }

  return (
    <>
      <IconButton aria-label="NotificationsActive" onClick={handleClick}>
        <Badge badgeContent={notificationCount} color="secondary">
          <NotificationsTwoTone
            fontSize="large"
            color={notificationCount === 0 ? "disabled" : "secondary"}
          />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="notification-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notificationCount === 0 && <MenuItem>No notifications</MenuItem>}
        {notificationCount !== 0 && (
          <MenuItem
            disableRipple
            sx={{
              overflow: "auto",
              whiteSpace: "wrap",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              "&:hover": {
                backgroundColor: "transparent",
                cursor: "default",
              },
            }}
          >
            <Button
              sx={{
                minWidth: "60px",
                whiteSpace: "nowrap",
              }}
              onClick={() => toggleShowFullNotification()}
            >
              {showFullNotification
                ? "Don't Show Full Notification"
                : "Show Full Notification"}
            </Button>
            <Button
              sx={{
                minWidth: "60px",
                whiteSpace: "nowrap",
              }}
              onClick={() =>
                clearNotification(messages.map((msg) => msg.notificationId))
              }
            >
              Clear All
            </Button>
          </MenuItem>
        )}
        {messages.map((message, index) => (
          <MenuItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
            onClick={() =>
              navigateToPage(message.notificationId, message.notificationType)
            }
          >
            <Typography
              sx={
                showFullNotification
                  ? {
                      overflow: "auto",
                      whiteSpace: "normal",
                      flexGrow: 1,
                      maxWidth: "90%",
                    }
                  : {
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      flexGrow: 1,
                      maxWidth: "90%",
                    }
              }
              title={message.message}
            >
              {message.message}
            </Typography>
            <Button
              sx={{
                minWidth: "60px",
                marginLeft: "8px",
              }}
              onClick={() => clearNotification([message.notificationId])}
            >
              Clear
            </Button>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default NotificationComponent;
