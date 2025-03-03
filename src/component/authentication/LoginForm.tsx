import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function LoginForm() {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  }, []);

  return <></>;
}

export default LoginForm;
