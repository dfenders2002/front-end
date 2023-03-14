import React from 'react';

import { Grid, Card, CardContent, Typography } from '@mui/material';

export default function AllUsers({ users }) {
    return (
        <div style={{ margin: '70px', marginTop: '20px' }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
                All Users
            </Typography>
            <Grid container spacing={2}>
                {users.map((user) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" component="h3" sx={{  }}>
                                    {user.name} - {user.email}
                                </Typography>
                                <hr></hr>
                                <Typography variant="subtitle1" sx={{ fontSize: '22px' }}>
                                    Activities from this week:
                                </Typography>
                                {user.activities?.map((activity) => (
                                    <div key={activity.id} style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Typography key={activity.description} variant="subtitle1" sx={{ fontsize: '14px' }}>
                                            Taak: {activity.description}
                                        </Typography>
                                        <Typography key={activity.totalTime} variant="subtitle1" sx={{ marginLeft: 'auto',  marginRight: '20px' ,fontsize: '14px' }}>
                                        Datum: {activity.date} - Tijd: {activity.totalTime}
                                        </Typography>
                                    </div>
                                ))}
                                <hr></hr>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="subtitle1" sx={{ fontSize: '22px' }}>
                                        Worktime: {user.workTime}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontSize: '22px' }}>
                                        Total Hours Worked: {user.totalWorkedHours}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
