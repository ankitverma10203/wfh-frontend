import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "./component/authentication/AuthenticationGuard";
import NavBar from "./component/navigation/NavBar";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import { useState, useMemo, useEffect, Suspense, lazy } from "react";
import wfhTheme from "./utility/Theme";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PageLoader from "./component/authentication/PageLoader";

const LoginForm = lazy(() => import("./component/authentication/LoginForm"));
const Callback = lazy(() => import("./component/authentication/Callback"));
const UserDashboard = lazy(() => import("./component/dashboard/UserDashboard"));
const ApprovalPage = lazy(() => import("./component/approval/ApprovalPage"));
const EmployeeDetailPage = lazy(
  () => import("./component/employee-detail/EmployeeDetailPage")
);
const WfhAllotmentPage = lazy(
  () => import("./component/wfh-allotment/WfhAllotmentPage")
);

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(
    Cookies.get("darkMode")
      ? Cookies.get("darkMode") === "true"
      : window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                width: "100%",
                minHeight: "100vh",
                transition: "background-color 0.5s ease",
              }}
            >
              <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

              {useMemo(
                () => (
                  <Box
                    sx={{
                      marginBottom: "5vh",
                      display: "flex",
                      direction: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        <Route path="/" element={<LoginForm />} />
                        <Route path="/callback" element={<Callback />} />
                        <Route
                          path="/dashboard"
                          element={
                            <AuthenticationGuard component={UserDashboard} />
                          }
                        />
                        <Route
                          path="/approval"
                          element={
                            <AuthenticationGuard component={ApprovalPage} />
                          }
                        />
                        <Route
                          path="/employeeDetails"
                          element={
                            <AuthenticationGuard
                              component={EmployeeDetailPage}
                            />
                          }
                        />
                        <Route
                          path="/wfhAllocation"
                          element={
                            <AuthenticationGuard component={WfhAllotmentPage} />
                          }
                        />
                      </Routes>
                    </Suspense>
                  </Box>
                ),
                []
              )}
            </Box>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default React.memo(App);
