import "./App.css";
import LoginForm from "./component/authentication/LoginForm";
import RegisterForm from "./component/authentication/RegisterForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDashboard from "./component/dashboard/UserDashboard";
import ApprovalPage from "./component/approval/ApprovalPage";
import { AuthenticationGuard } from "./component/authentication/AuthenticationGuard";
import Callback from "./component/authentication/Callback";
import NavBar from "./component/navigation/NavBar";
import EmployeeDetailPage from "./component/employee-detail/EmployeeDetailPage";
import WfhAllotmentPage from "./component/wfh-allotment/WfhAllotmentPage";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import { useState, useMemo, useEffect } from "react";
import wfhTheme from "./utility/Theme";
import React from "react";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    Cookies.get("darkMode") === "true"
  );

  const theme = useMemo(() => createTheme(wfhTheme(darkMode)), [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    Cookies.set("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              width: "100%",
              minHeight: "100vh",
              paddingBottom: "5vh"
            }}
          >
            <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <Box>
              <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route
                  path="/dashboard"
                  element={<AuthenticationGuard component={UserDashboard} />}
                />
                <Route
                  path="/approval"
                  element={<AuthenticationGuard component={ApprovalPage} />}
                />
                <Route
                  path="/employeeDetails"
                  element={
                    <AuthenticationGuard component={EmployeeDetailPage} />
                  }
                />
                <Route
                  path="/wfhAllocation"
                  element={<AuthenticationGuard component={WfhAllotmentPage} />}
                />
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default React.memo(App);
