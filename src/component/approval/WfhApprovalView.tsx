import { useEffect, useState } from "react";
import { EmployeeWfhDetailData } from "../../Types";
import { Refresh } from "@mui/icons-material";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Snackbar,
  CircularProgress,
} from "@mui/material";
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
import DraggableDialog from "../common/DraggableDialog";

function WfhApprovalView() {
  const defaultEmployeeWfhStatus = WfhRequestStatus.PENDING_APPROVAL;
  const defaultEmployeeUpdateId = 0;

  const [pendingWfhRequestData, setPendingWfhRequestData] = useState<
    EmployeeWfhDetailData[]
  >([]);

  const { getAccessTokenSilently } = useAuth0();
  const [wfhReqStatus, setWfhReqStatus] = useState<WfhRequestStatus>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [employeeUpdateId, setEmployeeUpdateId] = useState<number>(
    defaultEmployeeUpdateId
  );
  const [employeeUpdateWfhStatus, setEmployeeUpdateWfhStatus] =
    useState<WfhRequestStatus>(defaultEmployeeWfhStatus);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isRejecting, setIsRejecting] = useState<boolean>(false);

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
    status === WfhRequestStatus.APPROVED
      ? setIsApproving(true)
      : setIsRejecting(true);

    const token = await getAccessTokenSilently();
    const wfhRequestStatus: WfhRequestStatus = await updateWfhRequestStatus(
      token,
      wfhRequestId,
      status
    );
    setWfhReqStatus(wfhRequestStatus);
    setShowSnackbar(true);
    setIsApproving(false);
    setIsRejecting(false);
    loadData();
  };

  function handleConfirmChoice(id: number, status: WfhRequestStatus) {
    setEmployeeUpdateId(id);
    setEmployeeUpdateWfhStatus(status);
    setShowDialog(true);
  }

  const toggleShowDialog = async (confirmation: boolean) => {
    setShowDialog(false);
    if (confirmation) {
      await handleWfhRequestApproval(employeeUpdateId, employeeUpdateWfhStatus);
    }
    setEmployeeUpdateId(defaultEmployeeUpdateId);
    setEmployeeUpdateWfhStatus(defaultEmployeeWfhStatus);
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
            startIcon={
              employeeUpdateId === params.row.id && isApproving ? (
                <CircularProgress size={20} />
              ) : (
                <DoneTwoToneIcon />
              )
            }
            disabled={
              employeeUpdateId === params.row.id && (isApproving || isRejecting)
            }
            sx={{ width: "100%", height: "80%" }}
            onClick={() =>
              handleConfirmChoice(params.row.id, WfhRequestStatus.APPROVED)
            }
          >
            {employeeUpdateId === params.row.id && isApproving
              ? "Approving..."
              : "Approve"}
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
            startIcon={
              employeeUpdateId === params.row.id && isRejecting ? (
                <CircularProgress size={20} />
              ) : (
                <ClearTwoToneIcon />
              )
            }
            disabled={
              employeeUpdateId === params.row.id && (isApproving || isRejecting)
            }
            sx={{ width: "100%", height: "80%" }}
            onClick={() =>
              handleConfirmChoice(params.row.id, WfhRequestStatus.REJECTED)
            }
          >
            {employeeUpdateId === params.row.id && isRejecting
              ? "Rejecting..."
              : "Reject"}
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
          <IconButton aria-label="refresh" onClick={loadData}>
            <Refresh />
          </IconButton>
        </Box>

        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
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
      <DraggableDialog
        message="Do you want to proceed with the Update?"
        showDialog={showDialog}
        title="Confirmation"
        toggleShowDialog={toggleShowDialog}
      />
    </>
  );
}

export default WfhApprovalView;
