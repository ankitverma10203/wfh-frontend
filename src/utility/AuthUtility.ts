import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const handleUnauthention = (status: string) => {
  if (status == "403") {
    const navigate = useNavigate();
    sessionStorage.clear();
    Cookies.remove("token");
    navigate("/login");
  }
};