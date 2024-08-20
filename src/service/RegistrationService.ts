import { RegisterInput } from "../Types";
import axios from "axios";

export async function register(registerInput: RegisterInput): Promise<boolean> {

    return await axios.post('http://localhost:8080/wfh/register', registerInput)
        .then(
            res => {
                console.log(res);
                return true;
            }
        ).catch(
            err => {
                console.error(err);
                return false;
            }
        )
}