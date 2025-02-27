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
import { NAV_LINKS } from "./Constants";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar links={NAV_LINKS} notifications={[]} />
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
