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

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
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
            element={<AuthenticationGuard component={EmployeeDetailPage} />}
          />
          <Route
            path="/wfhAllocation"
            element={<AuthenticationGuard component={ApprovalPage} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
