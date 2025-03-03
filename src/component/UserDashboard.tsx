import WfhDetailTable from "./WfhDetailTable";
import WfhBalanceChart from "./WfhDataChart";
import Box from "@mui/material/Box";

function UserDashboard() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          maxWidth: "90vw",
          width: "100%",
          flexDirection: {
            lg: "row",
            md: "column",
            sm: "column",
            xs: "column",
          },
          justifyContent: {
            lg: "space-between",
            md: "center",
            sm: "center",
            xs: "center",
          },
        }}
      >
        <WfhDetailTable />
        <WfhBalanceChart />
      </Box>
    </>
  );
}

export default UserDashboard;
