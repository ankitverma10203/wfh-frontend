import { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { LoginFormProp, LoginInput, LoginResponse } from "../Types";
import Typography from "@mui/material/Typography";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../service/LoginService";
import { ID_KEY, LoginStatus, NAME_KEY } from "../Constants";

function LoginForm(prop: LoginFormProp) {
  const defaultRegisterFormData: LoginInput = {
    id: "",
    password: "",
  };
  const [loginInput, setLoginInput] = useState<LoginInput>(
    defaultRegisterFormData
  );
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    var loginResponse: LoginResponse = await login(loginInput);
    var loginSuccessFlag: boolean =
      loginResponse.loginStatus === LoginStatus.LOGIN_SUCCESS;

    prop.setSnackbarProp({
      open: true,
      message: loginSuccessFlag ? "Login Successful" : "Login Failed",
    });
    setLoginInput(defaultRegisterFormData);

    if (loginSuccessFlag) {
      localStorage.setItem(ID_KEY, loginResponse.id.toString());
      localStorage.setItem(NAME_KEY, loginResponse.name);
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Box
        my={4}
        display="flex"
        flexDirection={"column"}
        gap={2}
        p={4}
        sx={{
          border: "2px solid grey",
          backgroundColor: "white",
          minWidth: "30vw",
          maxWidth: "60vw",
        }}
      >
        <Typography variant="h2" sx={{ color: "black" }}>
          Login
        </Typography>

        <TextField
          required
          id="id"
          label="Employee id"
          placeholder="Employee Id / Email"
          name="id"
          type="text"
          value={loginInput.id}
          onChange={handleChange}
        />

        <TextField
          required
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
          value={loginInput.password}
          onChange={handleChange}
        />

        <Button variant="outlined" type="submit" onClick={handleLogin}>
          Login
        </Button>

        <Typography variant="body1" sx={{ color: "black" }}>
          New User? Click here to <NavLink to="/register">Register</NavLink>
        </Typography>
      </Box>
    </>
  );
}

export default LoginForm;
