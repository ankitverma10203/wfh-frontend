import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { WfhDetailData } from "../Types";
import { getWfhDetail } from "../service/WfhDetailService";
import { Box, IconButton, Typography } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";

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
                    {wfhDetailData.requestedWfhDate.toString()}
                  </TableCell>
                  <TableCell align="center">
                    {wfhDetailData.status.toString()}
                  </TableCell>
                  <TableCell align="center">
                    {wfhDetailData.createdTimestamp.toString()}
                  </TableCell>
                  <TableCell align="center">
                    {wfhDetailData.updatedTimestamp.toString()}
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
