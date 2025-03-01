import { useEffect, useState } from "react";
import { EmployeeWfhDetailData } from "../Types";
import { Refresh } from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import {
  fetchPendingWfhData,
  updateWfhRequestStatus,
} from "../service/WfhDetailService";
import { WfhRequestStatus } from "../Constants";

function WfhApprovalView() {
  const [pendingWfhRequestData, setPendingWfhRequestData] = useState<
    EmployeeWfhDetailData[]
  >([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetchPendingWfhRequest();
  };

  const fetchPendingWfhRequest = async () => {
    const token = await getAccessTokenSilently();
    const pendingWfhRequestList = await fetchPendingWfhData(token);

    setPendingWfhRequestData(pendingWfhRequestList);
  };

  const handleWfhRequestApproval = async (
    wfhRequestId: number,
    status: WfhRequestStatus
  ): Promise<void> => {
    const token = await getAccessTokenSilently();
    const wfhRequestStatus: WfhRequestStatus = await updateWfhRequestStatus(
      token,
      wfhRequestId,
      status
    );

    loadData();
  };

  return (
    <>
      <Box sx={{ minWidth: "50vw", maxWidth: "90vw", marginTop: "5vh" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component={"span"} variant="h5">
            Pending WFH Requests
          </Typography>
          <IconButton onClick={loadData}>
            <Refresh />
          </IconButton>
        </Box>

        <TableContainer component={Paper} sx={{ minWidth: "50%" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Employee Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Request Type</TableCell>
                <TableCell align="center">Requested WFH Date</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingWfhRequestData.map((pendingWfhRequestDetail) => (
                <TableRow key={pendingWfhRequestDetail.wfhRequestId}>
                  <TableCell align="center">
                    {pendingWfhRequestDetail.employeeId}
                  </TableCell>
                  <TableCell align="center">
                    {pendingWfhRequestDetail.name}
                  </TableCell>
                  <TableCell align="center">
                    {pendingWfhRequestDetail.email}
                  </TableCell>
                  <TableCell align="center">
                    {pendingWfhRequestDetail.requestType}
                  </TableCell>
                  <TableCell align="center">
                    {pendingWfhRequestDetail.requestDate}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() =>
                        handleWfhRequestApproval(
                          pendingWfhRequestDetail.wfhRequestId,
                          WfhRequestStatus.APPROVED
                        )
                      }
                    >
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() =>
                        handleWfhRequestApproval(
                          pendingWfhRequestDetail.wfhRequestId,
                          WfhRequestStatus.REJECTED
                        )
                      }
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default WfhApprovalView;
