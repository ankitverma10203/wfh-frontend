import { useEffect, useState } from "react";
import RegistrationApprovalView from "./RegistrationApprovalView";
import WfhApprovalView from "./WfhApprovalView";
import { getEmployeeData } from "../service/EmployeeDetailService";
import { useAuth0 } from "@auth0/auth0-react";
import { RoleOptions } from "../Constants";

function ApprovalPage() {
  const [role, setRole] = useState<RoleOptions>();
  const { getAccessTokenSilently } = useAuth0();

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
      {role === RoleOptions.ADMIN && <RegistrationApprovalView />}
      {(role === RoleOptions.ADMIN || role === RoleOptions.MANAGER) && (
        <WfhApprovalView />
      )}
    </>
  );
}

export default ApprovalPage;
