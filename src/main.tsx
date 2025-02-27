import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import authConfig from "./auth_config.json";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      cacheLocation={"localstorage"}
      authorizationParams={{
        redirect_uri: window.location.origin + "/callback",
        scope: "openid profile email",
        audience: authConfig.audience
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
