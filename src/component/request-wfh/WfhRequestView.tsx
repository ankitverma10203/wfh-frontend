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
import {
  WFH_REQUEST_EVENT_NAME,
  WfhRequestStatus,
  WfhType,
  WfhTypeDescription,
} from "../../Constants";
import { requestWfh } from "../../service/WfhRequestService";
import { format } from "date-fns/format";
import { useAuth0 } from "@auth0/auth0-react";
import wfhEventEmitter from "../../utility/EventEmitter";

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
    wfhEventEmitter.emit(WFH_REQUEST_EVENT_NAME);
  };

  return (
    <>
      <Box
        sx={{
          margin: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Request WFH</Typography>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: {xs: "50vw"}
          }}
        >
          <Box
            my={1}
            gap={2}
            p={3}
            sx={{
              display: "flex",
              flexDirection: {
                lg: "row",
                md: "column",
                sm: "column",
                xs: "column",
              },
              alignItems: {
                lg: "center",
              },
              border: "1px solid lightgrey",
              borderRadius: "5px",
              backgroundColor: "white",
              width: {xs: "100%"}
            }}
          >
            <TextField
              required
              id="wfhType"
              label="WFH Type:"
              select
              name="wfhType"
              value={wfhRequest.wfhType}
              onChange={handleChange}
              sx={{ minWidth: "fit-content" }}
            >
              {Object.values(WfhType).map((type) => (
                <MenuItem key={type} value={type}>
                  {WfhTypeDescription[type]}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              id="wfhRequestDate"
              label="WFH Request Date"
              type="date"
              name="requestedWfhDate"
              defaultValue={format(new Date(), "yyyy-MM-dd")}
              inputProps={{
                min: format(new Date(), "yyyy-MM-dd"),
              }}
              onChange={handleChange}
              sx={{ minWidth: "fit-content" }}
            />

            <Button
              variant="outlined"
              type="submit"
              onClick={handleWfhRequest}
              sx={{
                whiteSpace: "nowrap",
                padding: "5px",
                minWidth: "fit-content",
              }}
            >
              Submit
            </Button>
          </Box>
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

export default WfhRequestView;
