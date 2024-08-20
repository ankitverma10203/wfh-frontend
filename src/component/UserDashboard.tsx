import WfhDetailTable from "./WfhDetailTable";
import { UserDashboardProp } from "../Types";
import WfhBalanceChart from "./WfhDataChart";
import Box from "@mui/material/Box";

function UserDashboard(prop: UserDashboardProp) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          maxWidth: "90vw",
          width: "100%",
          flexDirection: { lg: "row", md: "column", sm: "column" },
          justifyContent: { lg: "space-between", md: "center", sm: "column" },
        }}
      >
        <WfhDetailTable setSnackbarProp={prop.setSnackbarProp} />
        <WfhBalanceChart />
      </Box>
    </>
  );
}

export default UserDashboard;
