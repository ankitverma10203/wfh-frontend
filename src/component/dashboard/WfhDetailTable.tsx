import { useEffect, useState } from "react";
import { WfhDetailData } from "../../Types";
import { getWfhDetail } from "../../service/WfhDetailService";
import { Box, IconButton, Typography } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { WfhRequestStatus } from "../../Constants";

function WfhDetailTable() {
  const [wfhDetailDataList, setWfhDetailDataList] = useState<WfhDetailData[]>(
    []
  );

  useEffect(() => {
    fetchWfhDetail();
  }, []);

  const { getAccessTokenSilently } = useAuth0();

  const fetchWfhDetail = async () => {
    const token = await getAccessTokenSilently();
    var wfhDataList: WfhDetailData[] = await getWfhDetail(token);
    setWfhDetailDataList(wfhDataList);
  };

  const columns: GridColDef<(typeof wfhDetailDataList)[number]>[] = [
    {
      field: "wfhType",
      headerName: "WFH Type",
      description: "This is the type of WFH which was requested",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "requestedWfhDate",
      headerName: "Requested WFH Date",
      description: "This is the date for which the WFH was requested",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "status",
      headerName: "Status",
      description: "This is the status of the WFH Request",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        let color = "red";
        switch (params.value) {
          case WfhRequestStatus.APPROVED:
            color = "green";
            break;
          case WfhRequestStatus.PENDING_APPROVAL:
            color = "rgb(204, 153, 0)";
            break;
          default:
            color = "red";
        }

        return <span style={{ color }}>{params.value}</span>;
      },
    },
    {
      field: "createdTimestamp",
      headerName: "Requested on",
      description: "This is the date on which the request was created",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "updatedTimestamp",
      headerName: "Updated On",
      description: "This is the date on which the request was last updated",
      flex: 1,
      minWidth: 200,
    },
  ];

  return (
    <>
      <Box sx={{ minWidth: "50vw", maxWidth: "90vw", marginTop: "5vh" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component={"span"} variant="h5">
            WFH Details
          </Typography>
          <IconButton onClick={fetchWfhDetail}>
            <Refresh />
          </IconButton>
        </Box>

        <Box sx={{ width: "100%" }}>
          <DataGrid
            rows={wfhDetailDataList}
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
    </>
  );
}

export default WfhDetailTable;
