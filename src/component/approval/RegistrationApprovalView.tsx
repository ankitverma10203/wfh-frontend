import { useEffect, useState } from "react";
import { EmployeeDetailData } from "../../Types";
import {
  fetchAdminDetails,
  fetchManagerDetails,
  fetchPendingRegistrationData,
  updateEmployeeData,
} from "../../service/EmployeeDetailService";
import { Refresh } from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Snackbar,
} from "@mui/material";
import { EmployeeStatus, RoleOptions } from "../../Constants";
import { useAuth0 } from "@auth0/auth0-react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function getStylingForSelectInsideAtableCell() {
  return {
    width: "100%",
    height: "100%",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };
}

function RegistrationApprovalView() {
  const [pendingEmployeeRegistrationData, setPendingEmployeeRegistrationData] =
    useState<EmployeeDetailData[]>([]);
  const [managerDetails, setManagerDetails] = useState<EmployeeDetailData[]>(
    []
  );
  const [adminDetails, setAdminDetails] = useState<EmployeeDetailData[]>([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const [isEmpDetailUpdtSuccessful, setIsEmpDetailUpdtSuccessful] =
    useState<boolean>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

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
        if (pendingEmployeeData.id === pendingEmployeeDetail.id) {
          return { ...pendingEmployeeData, [e.target.name]: e.target.value };
        }
        return pendingEmployeeData;
      });

    setPendingEmployeeRegistrationData(newPendingEmployeeRegistrationData);
  }

  const updateEmployeeInfo = async (
    pendingEmployeeDetail: EmployeeDetailData,
    employeeStatus: EmployeeStatus
  ) => {
    if (pendingEmployeeDetail.managerId === "0") {
      pendingEmployeeDetail.managerId = user?.sub || "0";
    }
    pendingEmployeeDetail.employeeStatus = employeeStatus;
    const token = await getAccessTokenSilently();
    const isEmployeeDetailUpdateSuccessful: boolean = await updateEmployeeData(
      pendingEmployeeDetail,
      token
    );
    setIsEmpDetailUpdtSuccessful(isEmployeeDetailUpdateSuccessful);
    setShowSnackbar(true);
    loadData();
  };

  const columns: GridColDef<
    (typeof pendingEmployeeRegistrationData)[number]
  >[] = [
    {
      field: "id",
      headerName: "Empolyee Id",
      description: "This is employeeId of the user who is registering",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "name",
      headerName: "Name",
      description: "This is name of the user who is registering",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "email",
      headerName: "Email",
      description: "This is email of the user who is registering",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "role",
      headerName: "Role",
      description: "Select the Role that needs to be assigned to this user",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <Select
            required
            id="role"
            name="role"
            value={params.value}
            sx={getStylingForSelectInsideAtableCell()}
            onChange={(e) => {
              handleChange(e, params.row);
            }}
          >
            {Object.values(RoleOptions).map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      field: "managerId",
      headerName: "Manager",
      description:
        "Select the Manager Id that this user needs to be assigned to",
      flex: 1,
      minWidth: 300,
      renderCell: (params) => {
        return (
          <Select
            required
            id="managerId"
            name="managerId"
            value={params.value}
            sx={getStylingForSelectInsideAtableCell()}
            onChange={(e) => {
              handleChange(e, params.row);
            }}
          >
            {Object.values(adminDetails).map((adminDetail) => (
              <MenuItem key={adminDetail.id} value={adminDetail.id}>
                {`${adminDetail.id} - ${adminDetail.name}`}
              </MenuItem>
            ))}
            {Object.values(managerDetails).map((managerDetail) => (
              <MenuItem key={managerDetail.id} value={managerDetail.id}>
                {`${managerDetail.id} - ${managerDetail.name}`}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      field: "approveButton",
      headerName: "",
      flex: 1,
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            color="success"
            sx={{ width: "100%", height: "80%" }}
            onClick={() =>
              updateEmployeeInfo(params.row, EmployeeStatus.ACTIVE)
            }
          >
            Approve
          </Button>
        );
      },
    },
    {
      field: "rejectButton",
      headerName: "",
      flex: 1,
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            color="error"
            sx={{ width: "100%", height: "80%" }}
            onClick={() =>
              updateEmployeeInfo(params.row, EmployeeStatus.INACTIVE)
            }
          >
            Reject
          </Button>
        );
      },
    },
  ];

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

        <Box sx={{ width: "100%" }}>
          <DataGrid
            rows={pendingEmployeeRegistrationData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </Box>
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message={
          isEmpDetailUpdtSuccessful
            ? "Employee Details updated successfully"
            : "Failed to update the Employee Details"
        }
      />
    </>
  );
}

export default RegistrationApprovalView;
