import WfhDetailTable from "./WfhDetailTable";
import WfhBalanceChart from "./WfhDataChart";
import Box from "@mui/material/Box";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {navigate("/dashboard")}, [isAuthenticated]);

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
        <WfhDetailTable />
        <WfhBalanceChart />
      </Box>
    </>
  );
}

export default UserDashboard;
