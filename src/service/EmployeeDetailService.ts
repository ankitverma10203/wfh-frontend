import { EmployeeStatus, NAME_KEY, ROLE_KEY, RoleOptions } from "../Constants";
import { EmployeeDetailData } from "../Types";
import axios from "axios";

axios.defaults.withCredentials = true;

export async function fetchPendingRegistrationData(
  token: string
): Promise<EmployeeDetailData[]> {
  return await axios
    .get("http://localhost:8080/wfh/getPendingEmployeeRegistration", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
}

export async function updateEmployeeData(
  employeeDetailData: EmployeeDetailData,
  token: string
): Promise<boolean> {
  return await axios
    .post("http://localhost:8080/wfh/updateEmployeeData", employeeDetailData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

export async function getEmployeeData(
  token: string
): Promise<EmployeeDetailData> {
  return await axios
    .get("http://localhost:8080/wfh/getEmployeeData", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return {
        employeeId: "",
        name: "",
        role: "",
        email: "",
        managerId: "",
        employeeStatus: "",
      };
    });
}

export async function fetchManagerDetails(
  token: string
): Promise<EmployeeDetailData[]> {
  return await axios
    .get("http://localhost:8080/wfh/getManagers", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (sessionStorage.getItem(ROLE_KEY) === RoleOptions.ADMIN.toString()) {
        const currentAdminDetails: EmployeeDetailData = {
          employeeId: "0",
          name: sessionStorage.getItem(NAME_KEY) ?? "",
          role: RoleOptions.ADMIN,
          email: "",
          managerId: "0",
          employeeStatus: EmployeeStatus.ACTIVE,
        };
        return [currentAdminDetails, ...res.data];
      }

      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
}
