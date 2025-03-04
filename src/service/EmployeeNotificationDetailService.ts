import axios from "axios";
import { EmployeeNotificationData } from "../Types";

axios.defaults.withCredentials = true;
const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchEmployeeNotifications(
  token: string
): Promise<EmployeeNotificationData[]> {
  return await axios
    .get(apiUrl + "/wfh/getNotifications", {
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

export async function clearNotifications(
  token: string,
  notificationIds: number[]
): Promise<EmployeeNotificationData[]> {
  return await axios
    .post(apiUrl + "/wfh/clearNotifications", notificationIds, {
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
