import "./App.css";
import LoginForm from "./component/authentication/LoginForm";
import RegisterForm from "./component/authentication/RegisterForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDashboard from "./component/dashboard/UserDashboard";
import WfhRequestView from "./component/request-wfh/WfhRequestView";
import ApprovalPage from "./component/approval/ApprovalPage";
import { AuthenticationGuard } from "./component/authentication/AuthenticationGuard";
import Callback from "./component/authentication/Callback";
import NavBar from "./component/navigation/NavBar";
import { RoleOptions } from "./Constants";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getEmployeeData } from "./service/EmployeeDetailService";
import Cookies from "js-cookie";

function App() {
  const { getAccessTokenSilently } = useAuth0();
  const [role, setRole] = useState<RoleOptions>(
    (Cookies.get("role") as RoleOptions) || RoleOptions.EMPLOYEE
  );

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

  return (
    <>
      <BrowserRouter>
        <NavBar notifications={[]} role={role} />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/dashboard"
            element={<AuthenticationGuard component={UserDashboard} />}
          />
          <Route
            path="/wfhRequestForm"
            element={<AuthenticationGuard component={WfhRequestView} />}
          />
          <Route
            path="/approval"
            element={<AuthenticationGuard component={ApprovalPage} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
