import WfhDetailTable from "./WfhDetailTable";
import WfhBalanceChart from "./WfhDataChart";
import Box from "@mui/material/Box";
import WfhRequestView from "./WfhRequestView";

function UserDashboardPage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          maxWidth: "98vw",
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "column",
            sm: "column",
            xs: "column",
          },
          alignItems: {
            xl: "start",
            lg: "start",
            md: "center",
            sm: "center",
            xs: "center",
          },
          justifyContent: "space-evenly",
          paddingTop: "2rem",
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
            margin: "2rem",
            width: {
              xl: "fit-content",
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
            margin: "2rem",
            width: {
              xl: "fit-content",
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

export default UserDashboardPage;
