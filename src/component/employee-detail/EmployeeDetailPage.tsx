import { useAuth0 } from "@auth0/auth0-react";
import { Refresh } from "@mui/icons-material";
import {
  SelectChangeEvent,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  IconButton,
  Snackbar,
} from "@mui/material";
import {
  GridColDef,
  DataGrid,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { EmployeeStatus, RoleOptions } from "../../Constants";
import {
  fetchManagerDetails,
  fetchAdminDetails,
  updateEmployeeData,
  fetchAllEmployeesData,
} from "../../service/EmployeeDetailService";
import { EmployeeDetailData } from "../../Types";

function EmployeeDetailPage() {
  const [allEmployeesData, setAllEmployeeData] = useState<EmployeeDetailData[]>(
    []
  );
  const [managerDetails, setManagerDetails] = useState<EmployeeDetailData[]>(
    []
  );
  const [adminDetails, setAdminDetails] = useState<EmployeeDetailData[]>([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const [isEmpDetailUpdtSuccessful, setIsEmpDetailUpdtSuccessful] =
    useState<boolean>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [employeeDetailGettingUpdated, setEmpDetailGettingUpdated] =
    useState<String | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<String>("");
  const [prevEmployeeDetail, setPrevEmployeeDetail] =
    useState<EmployeeDetailData | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetchAllEmployeesDetail();
    fetchManagersData();
    fetchAdminsData();
  };

  const fetchAllEmployeesDetail = async () => {
    const token = await getAccessTokenSilently();
    const allEmployeesDataList = await fetchAllEmployeesData(token);
    setAllEmployeeData(allEmployeesDataList);
  };

  const fetchManagersData = async () => {
    const token = await getAccessTokenSilently();
    setManagerDetails(await fetchManagerDetails(token));
  };

  const fetchAdminsData = async () => {
    const token = await getAccessTokenSilently();
    setAdminDetails(await fetchAdminDetails(token));
  };

  function getStylingForSelectInsideAtableCell() {
    return {
      width: "100%",
      height: "100%",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    };
  }

  function handleChange(
    e: SelectChangeEvent<string | number>,
    employeeDetail: EmployeeDetailData
  ): void {
    const newEmployeeData = allEmployeesData.map((employeeData) => {
      if (employeeData.id === employeeDetail.id) {
        return { ...employeeData, [e.target.name]: e.target.value };
      }
      return employeeData;
    });

    setAllEmployeeData(newEmployeeData);
  }

  const updateEmployeeInfo = async (
    employeeDetail: EmployeeDetailData,
    employeeStatus: EmployeeStatus
  ) => {
    if (employeeDetail.managerId === "0") {
      employeeDetail.managerId = user?.sub || "0";
    }
    employeeDetail.employeeStatus = employeeStatus;
    const token = await getAccessTokenSilently();
    const isEmployeeDetailUpdateSuccessful: boolean = await updateEmployeeData(
      employeeDetail,
      token
    );
    setIsEmpDetailUpdtSuccessful(isEmployeeDetailUpdateSuccessful);
    setSnackbarMessage(
      isEmpDetailUpdtSuccessful
        ? "Employee Details updated successfully"
        : "Failed to update the Employee Details"
    );
    setEmpDetailGettingUpdated(null);
    setShowSnackbar(true);
    loadData();
  };

  function handleEmployeeDetailEdit(row: EmployeeDetailData): void {
    setPrevEmployeeDetail(row);
    setEmpDetailGettingUpdated(row.id);
  }

  function handleUpdateOrEdit(row: EmployeeDetailData): void {
    employeeDetailGettingUpdated && employeeDetailGettingUpdated === row.id
      ? updateEmployeeInfo(row, EmployeeStatus.ACTIVE)
      : !employeeDetailGettingUpdated
      ? handleEmployeeDetailEdit(row)
      : (() => {
          setSnackbarMessage("Please update the record before switching");
          setShowSnackbar(true);
        })();
  }

  function handleDiscardChange(row: EmployeeDetailData) {
    setEmpDetailGettingUpdated(null);
    if (prevEmployeeDetail) {
      const employeeDataListBeforeEdit: EmployeeDetailData[] =
        allEmployeesData.map((employeeData) => {
          if (employeeData.id === row.id) {
            return prevEmployeeDetail;
          }
          return employeeData;
        });
      setAllEmployeeData(employeeDataListBeforeEdit);
      setPrevEmployeeDetail(null);
    }
  }

  const columns: GridColDef<(typeof allEmployeesData)[number]>[] = [
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
        return employeeDetailGettingUpdated &&
          employeeDetailGettingUpdated === params.row.id ? (
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
        ) : (
          <span>{params.value}</span>
        );
      },
    },
    {
      field: "employeeStatus",
      headerName: "Status",
      description: "Select the Status that needs to be assigned to this user",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return employeeDetailGettingUpdated &&
          employeeDetailGettingUpdated === params.row.id ? (
          <Select
            required
            id="status"
            name="status"
            value={params.value}
            sx={getStylingForSelectInsideAtableCell()}
            onChange={(e) => {
              handleChange(e, params.row);
            }}
          >
            {Object.values(EmployeeStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <span>{params.value}</span>
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
        return employeeDetailGettingUpdated &&
          employeeDetailGettingUpdated === params.row.id ? (
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
        ) : (
          <span>{params.value}</span>
        );
      },
    },
    {
      field: "editOrUpdateButton",
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
            onClick={() => handleUpdateOrEdit(params.row)}
          >
            {employeeDetailGettingUpdated &&
            employeeDetailGettingUpdated === params.row.id
              ? "Update"
              : "Edit"}
          </Button>
        );
      },
    },
    {
      field: "discardButton",
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
            onClick={() => handleDiscardChange(params.row)}
            disabled={
              employeeDetailGettingUpdated === null ||
              employeeDetailGettingUpdated !== params.row.id
            }
          >
            Discard
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
            rows={allEmployeesData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            disableRowSelectionOnClick
          />
        </Box>
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </>
  );
}

export default EmployeeDetailPage;
