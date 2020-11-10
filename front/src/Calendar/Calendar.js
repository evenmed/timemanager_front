import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";

import "@fullcalendar/core/main.css";

function Calendar() {
  return (
    <div>
      <FullCalendar
        defaultView="dayGridWeek"
        header={{
          left: "prev,next today",
          center: "title",
          right: "dayGridWeek, dayGridMonth, listWeek",
        }}
        plugins={[dayGridPlugin, listPlugin, bootstrapPlugin]}
        themeSystem="bootstrap"
      />
    </div>
  );
}

export default Calendar;
