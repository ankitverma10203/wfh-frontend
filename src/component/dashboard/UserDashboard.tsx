import WfhDetailTable from "./WfhDetailTable";
import WfhBalanceChart from "./WfhDataChart";
import Box from "@mui/material/Box";
import WfhRequestView from "../request-wfh/WfhRequestView";

function UserDashboard() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          maxWidth: "98vw",
          flexDirection: {
            lg: "row",
            md: "column",
            sm: "column",
            xs: "column",
          },
          alignItems: { lg: "start", md: "center", sm: "center", xs: "center" },
          justifyContent: "space-evenly",
          paddingTop: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              lg: "column",
              md: "row",
              sm: "row",
              xs: "column",
            },
            justifyContent: "space-evenly",
            margin: "10px",
            width: {
              lg: "40vw",
              md: "80vw",
              sm: "80vw",
              xs: "90vw",
            },
          }}
        >
          <WfhRequestView />
          <WfhBalanceChart />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: {
              lg: "row",
              md: "row",
              sm: "row",
              xs: "column",
            },
            margin: "10px",
            width: {
              lg: "60vw",
              md: "90vw",
              sm: "90vw",
              xs: "90vw",
            },
          }}
        >
          <WfhDetailTable />
        </Box>
      </Box>
    </>
  );
}

export default UserDashboard;
