import { withAuthenticationRequired } from "@auth0/auth0-react";
import PageLoader from "./PageLoader";
import { ComponentType } from "react";

export const AuthenticationGuard = (prop: {
  component: ComponentType<object>;
}) => {
  const Component = withAuthenticationRequired(prop.component, {
    onRedirecting: () => (
      <div>
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};
