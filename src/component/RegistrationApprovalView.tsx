import { useEffect, useState } from "react";
import { EmployeeDetailData } from "../Types";
import {
  fetchAdminDetails,
  fetchManagerDetails,
  fetchPendingRegistrationData,
  updateEmployeeData,
} from "../service/EmployeeDetailService";
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
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { EmployeeStatus, RoleOptions } from "../Constants";
import { useAuth0 } from "@auth0/auth0-react";

function RegistrationApprovalView() {
  const [pendingEmployeeRegistrationData, setPendingEmployeeRegistrationData] =
    useState<EmployeeDetailData[]>([]);
  const [managerDetails, setManagerDetails] = useState<EmployeeDetailData[]>(
    []
  );
  const [adminDetails, setAdminDetails] = useState<EmployeeDetailData[]>([]);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetchPendingRegistrations();
    fetchManagersData();
    fetchAdminsData();
  };

  const fetchPendingRegistrations = async () => {
    const token = await getAccessTokenSilently();
    const pendingRegistrationDataList = await fetchPendingRegistrationData(
      token
    );

    setPendingEmployeeRegistrationData(pendingRegistrationDataList);
  };

  const fetchManagersData = async () => {
    const token = await getAccessTokenSilently();
    setManagerDetails(await fetchManagerDetails(token));
  };

  const fetchAdminsData = async () => {
    const token = await getAccessTokenSilently();
    setAdminDetails(await fetchAdminDetails(token));
  };

  function handleChange(
    e: SelectChangeEvent<string | number>,
    pendingEmployeeDetail: EmployeeDetailData
  ): void {
    const newPendingEmployeeRegistrationData =
      pendingEmployeeRegistrationData.map((pendingEmployeeData) => {
        if (
          pendingEmployeeData.employeeId === pendingEmployeeDetail.employeeId
        ) {
          return { ...pendingEmployeeData, [e.target.name]: e.target.value };
        }
        return pendingEmployeeData;
      });

    setPendingEmployeeRegistrationData(newPendingEmployeeRegistrationData);
  }

  const updateEmployeeInfo = async (
    pendingEmployeeDetail: EmployeeDetailData
  ) => {
    if (pendingEmployeeDetail.managerId === "0") {
      pendingEmployeeDetail.managerId = user?.sub || "0";
    }
    const token = await getAccessTokenSilently();
    await updateEmployeeData(pendingEmployeeDetail, token);
    loadData();
  };

  return (
    <>
      <Box sx={{ minWidth: "50vw", maxWidth: "90vw", marginTop: "5vh" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component={"span"} variant="h5">
            Pending Registrations
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
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Manager</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingEmployeeRegistrationData.map((pendingEmployeeDetail) => (
                <TableRow key={pendingEmployeeDetail.employeeId}>
                  <TableCell align="center">
                    {pendingEmployeeDetail.employeeId}
                  </TableCell>
                  <TableCell align="center">
                    {pendingEmployeeDetail.name}
                  </TableCell>
                  <TableCell align="center">
                    {pendingEmployeeDetail.email}
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      required
                      id="role"
                      name="role"
                      value={pendingEmployeeDetail.role}
                      onChange={(e) => {
                        handleChange(e, pendingEmployeeDetail);
                      }}
                    >
                      {Object.values(RoleOptions).map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      required
                      id="managerId"
                      name="managerId"
                      value={pendingEmployeeDetail.managerId}
                      onChange={(e) => {
                        handleChange(e, pendingEmployeeDetail);
                      }}
                    >
                      {Object.values(adminDetails).map((adminDetail) => (
                        <MenuItem
                          key={adminDetail.employeeId}
                          value={adminDetail.employeeId}
                        >
                          {`${adminDetail.employeeId} - ${adminDetail.name}`}
                        </MenuItem>
                      ))}
                      {Object.values(managerDetails).map((managerDetail) => (
                        <MenuItem
                          key={managerDetail.employeeId}
                          value={managerDetail.employeeId}
                        >
                          {`${managerDetail.employeeId} - ${managerDetail.name}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      required
                      id="employeeStatus"
                      name="employeeStatus"
                      value={pendingEmployeeDetail.employeeStatus}
                      onChange={(e) => {
                        handleChange(e, pendingEmployeeDetail);
                      }}
                    >
                      {Object.values(EmployeeStatus).map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => updateEmployeeInfo(pendingEmployeeDetail)}
                    >
                      Update
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

export default RegistrationApprovalView;
