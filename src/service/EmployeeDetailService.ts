import { EmployeeDetailData } from "../Types";
import axios from "axios";

axios.defaults.withCredentials = true;
const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchPendingRegistrationData(
  token: string
): Promise<EmployeeDetailData[]> {
  return await axios
    .get(apiUrl + "/wfh/getPendingEmployeeRegistration", {
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
    .post(apiUrl + "/wfh/updateEmployeeData", employeeDetailData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
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
    .get(apiUrl + "/wfh/getEmployeeData", {
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
    .get(apiUrl + "/wfh/getManagers", {
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

export async function fetchAdminDetails(
  token: string
): Promise<EmployeeDetailData[]> {
  return await axios
    .get(apiUrl + "/wfh/getAdmins", {
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
