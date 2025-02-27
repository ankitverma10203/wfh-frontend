import axios from "axios";
import { WfhBalanceInfo, WfhDetailData } from "../Types";
import { WfhType } from "../Constants";

axios.defaults.withCredentials = true;

export async function getWfhDetail(id: string, token: string): Promise<WfhDetailData[]> {
  console.log("token: ", token);
  return await axios
    .get("http://localhost:8080/wfh/getEmployeeWfhDetail", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log("error")
      console.error(err);
      if (err.response) {
        // handleUnauthentication(err.response.status);
      }
      return [];
    });
}

export async function getWfhBalance(id: string, token: string): Promise<WfhBalanceInfo> {
  console.log("token: ", token);
  return await axios
    .get("http://localhost:8080/wfh/getEmployeeWfhBalance", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res);
      return {
        pendingWfhQuantityMap: new Map(
          Object.entries(res.data.pendingWfhQuantityMap).map(([key, value]) => [
            key as WfhType,
            value as number,
          ])
        ),
        availedWfhQuantityMap: new Map(
            Object.entries(res.data.availedWfhQuantityMap).map(([key, value]) => [
                key as WfhType,
                value as number,
              ])
        ),
        remainingWfhQuantityMap: new Map(
            Object.entries(res.data.remainingWfhQuantityMap).map(([key, value]) => [
                key as WfhType,
                value as number,
              ])
        ),
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        remainingWfhQuantityMap: new Map<WfhType, number>(),
        availedWfhQuantityMap: new Map<WfhType, number>(),
        pendingWfhQuantityMap: new Map<WfhType, number>(),
      };
    });
}

