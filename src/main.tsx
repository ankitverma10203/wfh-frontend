import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENTID}
      authorizationParams={{
        redirect_uri: window.location.origin + "/callback",
        scope: import.meta.env.VITE_SCOPE,
        audience: import.meta.env.VITE_AUDIENCE
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
