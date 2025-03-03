import {
  Box,
  Button,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { WfhRequest, WfhResponse } from "../../Types";
import { WfhRequestStatus, WfhType } from "../../Constants";
import { requestWfh } from "../../service/WfhRequestService";
import { format } from "date-fns/format";
import { useAuth0 } from "@auth0/auth0-react";

function WfhRequestView() {
  const defaultWfhRequest: WfhRequest = {
    wfhType: WfhType.PWFH,
    requestedWfhDate: new Date(),
    requestedAt: new Date(),
  };

  const [wfhRequest, setWfhRequest] = useState<WfhRequest>(defaultWfhRequest);
  const { getAccessTokenSilently } = useAuth0();
  const [wfhReqStatus, setWfhReqStatus] = useState<WfhRequestStatus>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWfhRequest({
      ...wfhRequest,
      [e.target.name]: e.target.value,
      requestedAt: new Date(),
    });
  };

  const handleWfhRequest = async () => {
    const token = await getAccessTokenSilently();
    const wfhResponse: WfhResponse = await requestWfh(wfhRequest, token);
    setWfhReqStatus(wfhResponse.status);
    setShowSnackbar(true);
    setWfhRequest(defaultWfhRequest);
  };

  return (
    <>
      <Box
        my={4}
        display="flex"
        flexDirection={"column"}
        gap={2}
        p={4}
        sx={{
          border: "1px solid lightgrey",
          borderRadius: "5px",
          backgroundColor: "white",
          minWidth: "30vw",
          maxWidth: "60vw",
        }}
      >
        <Typography variant="h5">Request WFH</Typography>
        <TextField
          required
          id="wfhType"
          label="WFH Type:"
          select
          name="wfhType"
          value={wfhRequest.wfhType}
          onChange={handleChange}
        >
          {Object.values(WfhType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          id="wfhRequestDate"
          label="wfhRequestDate"
          type="date"
          name="requestedWfhDate"
          defaultValue={format(new Date(), "yyyy-MM-dd")}
          inputProps={{
            min: format(new Date(), "yyyy-MM-dd"),
          }}
          onChange={handleChange}
        />

        <Button variant="outlined" type="submit" onClick={handleWfhRequest}>
          Submit Request
        </Button>
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

export default WfhRequestView;
