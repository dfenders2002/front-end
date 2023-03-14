import React from "react";
import { Box,  } from '@mui/material';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";



export default function Schedule({activityEvents}) {
  return (
    <Box sx={{ padding: '16px' }}>
      <Box>
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"timeGridWeek"}
          headerToolbar={{
            start: "today prev,next", 
            center: "title",
          }}
          events={activityEvents}
          height={"60vh"}
        />
      </Box>
    </Box>
  )
}

