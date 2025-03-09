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
import { useAuth0 } from "@auth0/auth0-react";
import wfhEventEmitter from "../../utility/EventEmitter";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

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

  const handleRequestTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWfhRequest({
      ...wfhRequest,
      [e.target.name]: e.target.value,
      requestedAt: new Date(),
    });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setWfhRequest({
      ...wfhRequest,
      requestedWfhDate: date?.toDate() || new Date(),
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
            minWidth: {
              lg: "fit-content",
              md: "fit-content",
              sm: "fit-content",
              xs: "50vw",
            },
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
              width: {
                lg: "fit-content",
                md: "fit-content",
                sm: "fit-content",
                xs: "100%",
              },
            }}
          >
            <TextField
              required
              id="wfhType"
              label="WFH Type:"
              select
              name="wfhType"
              value={wfhRequest.wfhType}
              onChange={handleRequestTypeChange}
              sx={{ minWidth: "fit-content" }}
            >
              {Object.values(WfhType).map((type) => (
                <MenuItem key={type} value={type}>
                  {WfhTypeDescription[type]}
                </MenuItem>
              ))}
            </TextField>

            <Box
              sx={{
                maxWidth: { lg: "160px" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <DatePicker
                label="WFH Request Date"
                name="requestedWfhDate"
                defaultValue={dayjs(new Date())}
                minDate={dayjs(new Date())}
                onChange={handleDateChange}
                format="YYYY/MM/DD"
                sx={{ width: "100%" }}
                slotProps={{
                  textField: {
                    required: true,
                  },
                }}
              />
            </Box>

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
