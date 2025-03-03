import "./App.css";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserDashboard from "./component/UserDashboard";
import WfhRequestView from "./component/WfhRequestView";
import ApprovalPage from "./component/ApprovalPage";
import { AuthenticationGuard } from "./component/AuthenticationGuard";
import Callback from "./component/Callback";
import NavBar from "./component/NavBar";
import { NAV_LINKS, RoleOptions } from "./Constants";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getEmployeeData } from "./service/EmployeeDetailService";

function App() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [name, setName] = useState<string>(user?.name || "");
  const [role, setRole] = useState<RoleOptions>(RoleOptions.EMPLOYEE);
  const [picture, setPicture] = useState<string>(user?.picture || "");

  useEffect(() => {
    setName(user?.name || "");
  }, [user?.name]);

  useEffect(() => {
    setPicture(user?.picture || "");
  }, [user?.picture]);

  useEffect(() => {
    fetchEmployeeDetail();
  }, []);

  const fetchEmployeeDetail = async () => {
    const token = await getAccessTokenSilently();
    const employeeDetails = await getEmployeeData(token);
    setRole(employeeDetails.role);
  };

  return (
    <>
      <BrowserRouter>
        <NavBar
          links={NAV_LINKS}
          notifications={[]}
          role={role}
          name={name}
          picture={picture}
        />
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
