import React, { useState } from "react";
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import TimePicker from './timePicker';
import { createTimeObjects } from "../Services/HelperFunctions";




export default function AddActivity({ onAddActivity }) {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');

    const context = JSON.parse(window.sessionStorage.getItem('context'));
    const userId = context.userId;

    const handleButtonClick = async () => {
        const timeObj = createTimeObjects(date, timeFrom, timeTo);
        const activityObj = {
            'userId': userId,
            'description': description,
            'startTime': timeObj.timeFrom,
            'endTime': timeObj.timeTo,
        }
        await onAddActivity(activityObj)
    }


    return (
        <div>
            <Box sx={{ padding: '16px', paddingBottom: '20px' }}>
                <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', paddingBottom: '40px', textAlign:'center' }}>
                    User Panel
                </Typography>
                <Grid container alignItems="center">
                    <Grid item>
                        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', paddingBottom: '20px' }}>
                            Add Activity
                        </Typography>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item>
                            <TextField id="description" label="Description" onChange={(event) => setDescription(event.target.value)}></TextField>
                        </Grid>
                        <Grid item>
                            <TimePicker timeFrom={timeFrom} setTimeFrom={setTimeFrom} timeTo={timeTo} setTimeTo={setTimeTo} date={date} setDate={setDate}  />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={handleButtonClick}>Add Activity</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}