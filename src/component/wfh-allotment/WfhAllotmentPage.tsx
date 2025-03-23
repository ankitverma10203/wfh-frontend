import { useAuth0 } from "@auth0/auth0-react";
import { Refresh } from "@mui/icons-material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import {
  Box,
  Typography,
  IconButton,
  Button,
  OutlinedInput,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, ChangeEvent } from "react";
import { WfhTypeDescription, WfhType } from "../../Constants";
import {
  fetchWfhRefQuantityData,
  updateWfhRefQuantityData,
} from "../../service/WfhRefQuantityService";
import DraggableDialog from "../common/DraggableDialog";

function WfhAllotmentPage() {
  type WfhReqQuantityDataType = {
    id: WfhType;
    value: number;
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [rowData, setRowData] = useState<WfhReqQuantityDataType[]>([]);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    fetchWfhRefQuantityDetail();
  }, []);

  const { getAccessTokenSilently } = useAuth0();

  const fetchWfhRefQuantityDetail = async () => {
    const token = await getAccessTokenSilently();
    setIsLoading(true);
    const wfhRefQuantityData: Map<WfhType, number> = new Map(
      Object.entries(await fetchWfhRefQuantityData(token)).map(
        ([key, value]) => [key as WfhType, value as number]
      )
    );
    setIsLoading(false);

    const rowDataObject: WfhReqQuantityDataType[] = [];
    for (const [key] of Object.entries(WfhType)) {
      rowDataObject.push({
        id: key as WfhType,
        value: wfhRefQuantityData.get(key as WfhType) || 0,
      });
    }
    setRowData(rowDataObject);
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

  function handleValueChange(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    row: WfhReqQuantityDataType
  ): void {
    const newRowData = rowData.map((data) => {
      if (row.id === data.id) {
        const updatedValue = parseInt(e.target.value);
        return {
          id: row.id,
          value: isNaN(updatedValue) ? 0 : updatedValue,
        };
      }
      return data;
    });
    setRowData(newRowData);
  }

  const columns: GridColDef<WfhReqQuantityDataType>[] = [
    {
      field: "id",
      headerName: "WFH Type",
      description: "This is the type of WFH.",
      flex: 1,
      minWidth: 150,
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
      field: "value",
      headerName: "Quantity",
      description: "Quantity of the max number of WFH available of each type",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <OutlinedInput
            id="wfh-quantity"
            aria-label="wfh quantity"
            sx={getStylingForSelectInsideAtableCell()}
            disabled={!isEditing}
            value={params.value}
            onChange={(e) => handleValueChange(e, params.row)}
          />
        );
      },
    },
  ];

  async function handleUpdate(): Promise<void> {
    try {
      const wfhRefQuantity: Map<WfhType, number> = new Map();
      rowData.forEach((data) => {
        wfhRefQuantity.set(data.id as WfhType, data.value);
      });
      setIsUpdating(true);
      const token = await getAccessTokenSilently();
      const updateRespone = await updateWfhRefQuantityData(
        wfhRefQuantity,
        token
      );
      setIsUpdating(false);
      setSnackbarMsg(
        updateRespone
          ? "WFH Allocation Updated Successfully"
          : "WFH Allocation Updated Failed"
      );
      setShowSnackbar(true);
      fetchWfhRefQuantityDetail();
    } catch (error) {
      console.error("Failed to update WFH quantity data", error);
    } finally {
      setIsEditing(false);
    }
  }

  async function handleEdit(): Promise<void> {
    setIsEditing(true);
  }

  function handleDecline(): void {
    setIsEditing(false);
    fetchWfhRefQuantityDetail();
  }

  const toggleShowDialog = (confirmation: boolean) => {
    setShowDialog(false);
    if (confirmation) {
      handleUpdate();
    } else {
      handleDecline();
    }
  };

  return (
    <Box
      sx={{
        marginTop: "5vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ maxWidth: { lg: "55vw", md: "90vw", sm: "90vw", xs: "90vw" } }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component={"span"} variant="h5">
            WFH Quantity Reference
          </Typography>
          <IconButton aria-label="refresh" onClick={fetchWfhRefQuantityDetail}>
            <Refresh />
          </IconButton>
        </Box>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <DataGrid
            rows={rowData}
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

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {!isEditing ? (
            <Button
              variant="outlined"
              startIcon={<EditTwoToneIcon />}
              sx={{ width: "100%", height: "80%", margin: "10px 0 10px 0" }}
              onClick={() => handleEdit()}
            >
              Edit
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                color="success"
                startIcon={
                  isUpdating ? (
                    <CircularProgress size={20} />
                  ) : (
                    <DoneTwoToneIcon />
                  )
                }
                disabled={isUpdating}
                sx={{
                  width: "100%",
                  height: "80%",
                  margin: "10px 5px 10px 0",
                }}
                onClick={() => setShowDialog(true)}
                hidden={!isEditing}
              >
                {isUpdating ? "Updating..." : "Update"}
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<ClearTwoToneIcon />}
                disabled={isUpdating}
                sx={{
                  width: "100%",
                  height: "80%",
                  margin: "10px 0 10px 5px",
                }}
                onClick={() => handleDecline()}
              >
                Discard
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMsg}
      />
      <DraggableDialog
        message="Do you want to proceed with the Update?"
        showDialog={showDialog}
        title="Confirmation"
        toggleShowDialog={toggleShowDialog}
      />
    </Box>
  );
}

export default WfhAllotmentPage;
