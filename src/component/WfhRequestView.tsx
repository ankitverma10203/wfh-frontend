import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { WfhRequest, WfhRequestViewProp, WfhResponse } from "../Types";
import { ID_KEY, WfhType } from "../Constants";
import { requestWfh } from "../service/WfhRequestService";
import { format } from "date-fns/format";

function WfhRequestView(prop: WfhRequestViewProp) {

    const defaultWfhRequest: WfhRequest = {
        employeeId: Number.parseInt(localStorage.getItem(ID_KEY) || '0'),
        wfhType: WfhType.PWFH,
        requestedWfhDate: new Date(),
        requestedAt: new Date()
    };


    const [wfhRequest, setWfhRequest] = useState<WfhRequest>(defaultWfhRequest);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name, " => ", e.target.value)
        setWfhRequest({ ...wfhRequest, [e.target.name]: e.target.value, requestedAt: new Date() });
    }

    const handleWfhRequest = async () => {

        console.log(wfhRequest)

        var wfhResponse: WfhResponse = await requestWfh(wfhRequest);
        prop.setSnackbarProp({
            open: true,
            message: wfhResponse.successFlg ? `Request Successful, Status:${wfhResponse.status}` : `Request Unsuccessful, Status:${wfhResponse.status}`
        });
        setWfhRequest(defaultWfhRequest);
    };

    return (
        <>
            <Box
                my={4}
                display="flex"
                flexDirection={'column'}
                gap={2}
                p={4}
                sx={{ border: '2px solid grey', backgroundColor: "white", minWidth: '30vw', maxWidth: '60vw' }}
            >
                <Typography variant="h5">
                    Request WFH
                </Typography>
                <TextField
                    required
                    id="wfhType"
                    label="WFH Type:"
                    select
                    name='wfhType'
                    value={wfhRequest.wfhType}
                    onChange={handleChange}
                >
                    {Object.values(WfhType)
                        .map(type => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                </TextField>

                <TextField
                    required
                    id="wfhRequestDate"
                    label="wfhRequestDate"
                    type="date"
                    name='requestedWfhDate'
                    defaultValue={format(new Date(), 'yyyy-MM-dd')}
                    onChange={handleChange}
                />

                <Button variant="outlined" type='submit' onClick={handleWfhRequest}>Submit Request</Button>
            </Box>

        </>
    );
}

export default WfhRequestView