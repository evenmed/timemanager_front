import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import momentPlugin from "@fullcalendar/moment";
import bootstrapPlugin from "@fullcalendar/bootstrap";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import parseEvents from "../../lib/parseEvents";
import maybeAddTrailingZero from "../../lib/maybeAddTrailingZero";

// Sample API response
const sampleData = [
  {
    date: "2020-11-10",
    time: "120", // minutes
    title: "Designed a beautiful logo for Toptal",
    notes:
      "As part of the Toptal screening process, I designed a new logo for them. It took me 2 hours.",
  },
  {
    date: "2020-11-09",
    time: "210", // minutes
    title: "Drank a big jug of coffee",
    notes: "",
  },
  {
    date: "2020-11-10",
    time: "150", // minutes
    title: "Made breakfast and also ate it",
    notes: "I cooked up an omelet with cheese, ham, and some tomato sauce 😋",
  },
  {
    date: "2020-11-10",
    time: "300", // minutes
    title: "Went climbing",
    notes: "Managed to send 2 V8's in a single day whoop whoop!",
  },
  {
    date: "2020-11-11",
    time: "90", // minutes
    title: "Ran 15 km",
    notes: "",
  },
  {
    date: "2020-11-09",
    time: "240", // minutes
    title: "Went snowboarding",
    notes: "",
  },
];

const preferredWorkTime = 480; // minutes (8 hours)

function Calendar() {
  const [events, minutesByDate] = parseEvents(sampleData);

  console.log(minutesByDate);

  return (
    <div>
      <FullCalendar
        defaultView="timeGridWeek"
        header={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek, dayGridMonth, listWeek",
        }}
        plugins={[
          dayGridPlugin,
          listPlugin,
          bootstrapPlugin,
          timeGridPlugin,
          momentPlugin,
        ]}
        themeSystem="bootstrap"
        events={events}
        allDaySlot={false}
        slotLabelFormat="H [h]"
        displayEventTime={false}
        scrollTime="00:00:00"
        dayRender={({ date, el }) => {
          // Remove default background color
          el.classList.remove("alert-info");
          el.classList.remove("alert");

          // Format date
          const year = date.getFullYear();
          const month = maybeAddTrailingZero(date.getMonth() + 1);
          const day = maybeAddTrailingZero(date.getDate());

          console.log(`${year}-${month}-${day}`);
          console.log(minutesByDate[`${year}-${month}-${day}`]);

          // Set bg color based on if worked over preferred work time
          if (minutesByDate[`${year}-${month}-${day}`] > preferredWorkTime)
            el.classList.add("bg-success");
          else el.classList.add("bg-danger");

          el.classList.add("op-5");

          return el;
        }}
      />
    </div>
  );
}

export default Calendar;
