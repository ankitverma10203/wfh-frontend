import { useAuth0 } from "@auth0/auth0-react";
import { Refresh } from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  Button,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, ChangeEvent } from "react";
import { WfhTypeDescription, WfhType } from "../../Constants";
import {
  fetchWfhRefQuantityData,
  updateWfhRefQuantityData,
} from "../../service/WfhRefQuantityService";

function WfhAllotmentPage() {
  type WfhReqQuantityDataType = {
    id: WfhType;
    value: number;
  };

  const [isEditing, setIsEditing] = useState<boolean>();
  const [rowData, setRowData] = useState<WfhReqQuantityDataType[]>([]);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchWfhRefQuantityDetail();
  }, []);

  const { getAccessTokenSilently } = useAuth0();

  const fetchWfhRefQuantityDetail = async () => {
    const token = await getAccessTokenSilently();
    setIsLoading(true);
    const wfhRefQuantityData = await fetchWfhRefQuantityData(token);
    setIsLoading(false);

    const rowDataObject: WfhReqQuantityDataType[] = [];
    for (const [key, value] of Object.entries(wfhRefQuantityData)) {
      rowDataObject.push({ id: key as WfhType, value: value });
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
      const token = await getAccessTokenSilently();
      const updateRespone = await updateWfhRefQuantityData(
        wfhRefQuantity,
        token
      );
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

  return (
    <>
      <Box
        sx={{
          marginTop: "5vh",
          maxWidth: { lg: "55vw", md: "90vw", sm: "90vw", xs: "90vw" },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component={"span"} variant="h5">
            WFH Quantity Reference
          </Typography>
          <IconButton onClick={fetchWfhRefQuantityDetail}>
            <Refresh />
          </IconButton>
        </Box>

        <Box>
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
              color="success"
              sx={{ width: "100%", height: "80%", margin: "10px 5px 10px 0" }}
              onClick={() => handleEdit()}
            >
              Edit
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                color="success"
                sx={{ width: "100%", height: "80%", margin: "10px 5px 10px 0" }}
                onClick={() => handleUpdate()}
                hidden={!isEditing}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ width: "100%", height: "80%", margin: "10px 0 10px 5px" }}
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
    </>
  );
}

export default WfhAllotmentPage;
