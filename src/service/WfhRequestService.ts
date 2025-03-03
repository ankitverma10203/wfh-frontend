import axios from "axios";
import { WfhRequest, WfhResponse } from "../Types";
import { WfhRequestStatus } from "../Constants";

axios.defaults.withCredentials = true;
const apiUrl = import.meta.env.VITE_API_URL;

export async function requestWfh(
  wfhRequest: WfhRequest,
  token: string
): Promise<WfhResponse> {
  return await axios
    .post(apiUrl + "/wfh/requestWfh", wfhRequest, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return {
        successFlg: false,
        status: WfhRequestStatus.FAILED,
      };
    });
}
