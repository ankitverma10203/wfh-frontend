import { RegisterInput } from "../Types";
import axios from "axios";

axios.defaults.withCredentials = true;
const apiUrl = import.meta.env.VITE_API_URL;

export async function register(
  registerInput: RegisterInput,
  token: string
): Promise<boolean> {
  return await axios
    .post(apiUrl + "/wfh/register", registerInput, {
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
