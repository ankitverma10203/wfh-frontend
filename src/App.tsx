import Snackbar from "@mui/material/Snackbar";
import "./App.css";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavLink, SnackbarProp } from "./Types";
import UserDashboard from "./component/UserDashboard";
import WfhRequestView from "./component/WfhRequestView";
import GenericPage from "./component/GenericPage";
import ApprovalPage from "./component/ApprovalPage";

function App() {
  const defaultSnackbarProp = {
    open: false,
    message: "",
  };

  const [snackbarProp, setSnackbarProp] =
    useState<SnackbarProp>(defaultSnackbarProp);
  const [notifications, setNotifications] = useState([]);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  function handleSnackbarClose(): void {
    setSnackbarProp(defaultSnackbarProp);
  }

  useEffect(() => {
    setNavLinks([
      { name: "Dashboard", link: "/dashboard" },
      { name: "Request WFH", link: "/wfhRequestForm" },
      { name: "Approvals", link: "/approval" },
    ]);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginForm setSnackbarProp={setSnackbarProp} />}
          />
          <Route
            path="/login"
            element={<LoginForm setSnackbarProp={setSnackbarProp} />}
          />
          <Route
            path="/register"
            element={<RegisterForm setSnackbarProp={setSnackbarProp} />}
          />
          <Route
            path="/dashboard"
            element={
              <GenericPage
                navLinks={navLinks}
                notifications={notifications}
                item={<UserDashboard setSnackbarProp={setSnackbarProp} />}
              />
            }
          />
          <Route
            path="/wfhRequestForm"
            element={
              <GenericPage
                navLinks={navLinks}
                notifications={notifications}
                item={<WfhRequestView setSnackbarProp={setSnackbarProp} />}
              />
            }
          />
          <Route
            path="/approval"
            element={
              <GenericPage
                navLinks={navLinks}
                notifications={notifications}
                item={<ApprovalPage setSnackbarProp={setSnackbarProp} />}
              />
            }
          />
        </Routes>
      </BrowserRouter>

      <Snackbar
        open={snackbarProp.open}
        autoHideDuration={3000}
        message={snackbarProp.message}
        onClose={handleSnackbarClose}
      />
    </>
  );
}

export default App;
