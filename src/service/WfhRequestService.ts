import axios from "axios";
import { WfhRequest, WfhResponse } from "../Types";
import { WfhRequestStatus } from "../Constants";

export async function requestWfh(wfhRequest: WfhRequest): Promise<WfhResponse> {

    return await axios.post('http://localhost:8080/wfh/requestWfh', wfhRequest)
        .then(
            res => {
                console.log(res);
                return res.data;
            }
        ).catch(
            err => {
                console.error(err);
                return {
                    successFlg: false,
                    status: WfhRequestStatus.FAILED
                };
            }
        )
}