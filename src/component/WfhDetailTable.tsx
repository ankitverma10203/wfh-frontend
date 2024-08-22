import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { WfhDetailData, WfhDetailTableProp } from "../Types";
import { getWfhDetail } from "../service/WfhDetailService";
import { DATE_FORMAT, DATE_TIME_FORMAT, ID_KEY } from "../Constants";
import { Box, IconButton, Typography } from "@mui/material";
import { format } from "date-fns";
import { Refresh } from "@mui/icons-material";

function WfhDetailTable(prop: WfhDetailTableProp) {
  const [wfhDetailDataList, setWfhDetailDataList] = useState<WfhDetailData[]>(
    []
  );

  useEffect(() => {
    fetchWfhDetail();
  }, []);

  const fetchWfhDetail = async () => {
    console.log("fetching wfhDetailData");
    const loggedInId: string = sessionStorage.getItem(ID_KEY) || "";
    var wfhDataList: WfhDetailData[] = await getWfhDetail(loggedInId);
    setWfhDetailDataList(wfhDataList);
    prop.setSnackbarProp({
      open: true,
      message: "WFH Details Loaded",
    });
  };

  return (
    <>
      <Box sx={{ minWidth: "50vw", maxWidth: "90vw", marginTop: "5vh",}}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component={"span"} variant="h5">
            WFH Details
          </Typography>
          <IconButton onClick={fetchWfhDetail}>
            <Refresh />
          </IconButton>
        </Box>

        <TableContainer component={Paper} sx={{ minWidth: "50%" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">WFH Type</TableCell>
                <TableCell align="center">Requested WFH Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Created Timestamp</TableCell>
                <TableCell align="center">Updated Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wfhDetailDataList.map((wfhDetailData) => (
                <TableRow key={wfhDetailData.createdTimestamp.toLocaleString()}>
                  <TableCell align="center">{wfhDetailData.wfhType}</TableCell>
                  <TableCell align="center">
                    {format(wfhDetailData.requestedWfhDate, DATE_FORMAT)}
                  </TableCell>
                  <TableCell align="center">
                    {wfhDetailData.status.toString()}
                  </TableCell>
                  <TableCell align="center">
                    {format(wfhDetailData.createdTimestamp, DATE_TIME_FORMAT)}
                  </TableCell>
                  <TableCell align="center">
                    {format(wfhDetailData.updatedTimestamp, DATE_TIME_FORMAT)}
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

export default WfhDetailTable;
