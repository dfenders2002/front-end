import * as React from 'react';
import { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { Box, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function TimePicker({ timeFrom, setTimeFrom, timeTo, setTimeTo, date, setDate }) {
    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={2}>
                    <Grid item>
                        <DemoContainer components={['DatePicker']} sx={{ width: '100%', paddingTop: '0px' }}>
                            <DatePicker
                                label="Select day"
                                value={date}
                                onChange={(newVal) =>  setDate(newVal)}
                            />
                        </DemoContainer>
                    </Grid>
                    <Grid item>
                        <DemoContainer components={['MobileTimePicker']} sx={{ width: '100%', paddingTop: '0px' }}>
                            <MobileTimePicker
                                label={'Time from'}
                                views={['hours', 'minutes', 'seconds']}
                                value={timeFrom}
                                onChange={(newVal) => setTimeFrom(newVal)}
                            />
                        </DemoContainer>
                    </Grid>
                    <Grid item>
                        <DemoContainer components={['MobileTimePicker']} sx={{ width: '100%', paddingTop: '0px' }}>
                            <MobileTimePicker
                                label={'Time To'}
                                views={['hours', 'minutes', 'seconds']}
                                value={timeTo}
                                onChange={(newVal) => setTimeTo(newVal)}
                            />
                        </DemoContainer>
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </Box>
    );
}