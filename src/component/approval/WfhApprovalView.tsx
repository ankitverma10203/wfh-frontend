import { useEffect, useState } from "react";
import { EmployeeWfhDetailData } from "../../Types";
import { Refresh } from "@mui/icons-material";
import { Box, Typography, IconButton, Button, Snackbar } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import {
  fetchPendingWfhData,
  updateWfhRequestStatus,
} from "../../service/WfhDetailService";
import {
  APPROVAL_NOTIFICATION_EVENT_NAME,
  WfhRequestStatus,
  WfhTypeDescription,
} from "../../Constants";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import wfhEventEmitter from "../../utility/EventEmitter";

function WfhApprovalView() {
  const [pendingWfhRequestData, setPendingWfhRequestData] = useState<
    EmployeeWfhDetailData[]
  >([]);

  const { getAccessTokenSilently } = useAuth0();
  const [wfhReqStatus, setWfhReqStatus] = useState<WfhRequestStatus>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetchPendingWfhRequest();
  };

  const fetchPendingWfhRequest = async () => {
    const token = await getAccessTokenSilently();
    setIsLoading(true);
    const pendingWfhRequestList = await fetchPendingWfhData(token);
    setIsLoading(false);
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
    setWfhReqStatus(wfhRequestStatus);
    setShowSnackbar(true);
    loadData();
  };

  useEffect(() => {
    const handleMyEvent = () => {
      loadData();
    };

    wfhEventEmitter.on(APPROVAL_NOTIFICATION_EVENT_NAME, handleMyEvent);

    return () => {
      wfhEventEmitter.off(APPROVAL_NOTIFICATION_EVENT_NAME, handleMyEvent);
    };
  }, []);

  const columns: GridColDef<(typeof pendingWfhRequestData)[number]>[] = [
    {
      field: "employeeId",
      headerName: "Empolyee Id",
      description: "This is employeeId of the user reqesting for WFH",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "name",
      headerName: "Name",
      description: "This is name of the user reqesting for WFH",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "email",
      headerName: "Email",
      description: "This is email of the user reqesting for WFH",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "requestType",
      headerName: "Request Type",
      description: "This is the type of WFH which was requested",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <span>
            {
              WfhTypeDescription[
                params.value as keyof typeof WfhTypeDescription
              ]
            }
          </span>
        );
      },
    },
    {
      field: "requestDate",
      headerName: "Requested WFH Date",
      description: "This is the date for which the WFH was requested",
      flex: 1,
      minWidth: 250,
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
              handleWfhRequestApproval(params.row.id, WfhRequestStatus.APPROVED)
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
              handleWfhRequestApproval(params.row.id, WfhRequestStatus.REJECTED)
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
            Pending WFH Requests
          </Typography>
          <IconButton onClick={loadData}>
            <Refresh />
          </IconButton>
        </Box>

        <Box sx={{ width: "100%" }}>
          <DataGrid
            rows={pendingWfhRequestData}
            columns={columns}
            loading={isLoading}
            slotProps={{
              loadingOverlay: {
                variant: "skeleton",
                noRowsVariant: "skeleton",
              },
            }}
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
        message={`WFH Request Status: ${wfhReqStatus}`}
      />
    </>
  );
}

export default WfhApprovalView;
