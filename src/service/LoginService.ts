import { LoginStatus } from "../Constants";
import { LoginInput, LoginResponse } from "../Types";
import axios from "axios";

export async function login(loginInput: LoginInput): Promise<LoginResponse> {

    return await axios.post('http://localhost:8080/wfh/login', loginInput)
        .then(
            res => {
                console.log(res);
                return res.data;
            }
        ).catch(
            err => {
                console.error(err);
                return {id: -1, name:'', loginStatus: LoginStatus.LOGIN_FAILED}
            }
        )
}