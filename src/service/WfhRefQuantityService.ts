import axios from "axios";
import { WfhType } from "../Constants";

axios.defaults.withCredentials = true;
const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchWfhRefQuantityData(
  token: string
): Promise<Map<WfhType, number>> {
  return await axios
    .get(apiUrl + "/wfh/getWfhRefQuantity", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return {
        successFlg: false,
        status: "FAILED",
      };
    });
}

export async function updateWfhRefQuantityData(
  wfhRefQuantityData: Map<WfhType, number>,
  token: string
): Promise<boolean> {
    console.log("wfhRefQuantity: ", wfhRefQuantityData);
  return await axios
    .post(apiUrl + "/wfh/updateWfhRefQuantity", Object.fromEntries(wfhRefQuantityData), {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}
