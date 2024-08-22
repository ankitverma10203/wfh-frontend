import { SnackbarProp } from "../Types";
import RegistrationApprovalView from "./RegistrationApprovalView";

function ApprovalPage(prop: {
  setSnackbarProp: React.Dispatch<React.SetStateAction<SnackbarProp>>;
}) {
  return (
    <>
      <RegistrationApprovalView setSnackbarProp={prop.setSnackbarProp}/>
    </>
  );
}

export default ApprovalPage;
