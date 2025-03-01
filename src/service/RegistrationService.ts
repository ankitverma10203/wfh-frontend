import { RegisterInput } from "../Types";
import axios from "axios";

axios.defaults.withCredentials = true;

export async function register(
  registerInput: RegisterInput,
  token: string
): Promise<boolean> {
  return await axios
    .post("http://localhost:8080/wfh/register", registerInput, {
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
