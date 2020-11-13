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
import dateObjectToString from "../../lib/dateObjectToString";
import minutesToHours from "../../lib/minutesToHours";

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
    time: "210", // minutes
    title: "Went climbing",
    notes: "Managed to send 2 V8's in a single day whoop whoop!",
  },
  {
    date: "2020-11-11",
    time: "900", // minutes
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

  return (
    <div>
      <FullCalendar
        defaultView="listWeek"
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
        timeZone="UTC"
        listDayFormat="ddd, MMM D, YYYY"
        listDayAltFormat={(date) => {
          // Add total hours to day heading in list view
          const dateString = dateObjectToString(date.date.marker);
          const hours = minutesToHours(minutesByDate[dateString] || 0);

          return `(${hours} hours total)`;
        }}
        scrollTime="00:00:00"
        dayRender={({ date, el }) => {
          // Remove default background color
          el.classList.remove("alert-info");
          el.classList.remove("alert");

          // Get mins worked on date
          const dateString = dateObjectToString(date);
          const totalMins = minutesByDate[dateString] || 0;

          // Set bg color based on if worked over preferred work time
          if (totalMins >= preferredWorkTime) el.classList.add("bg-success");
          else el.classList.add("bg-danger");

          el.classList.add("op-5");

          return el;
        }}
        datesRender={({ el, view }) => {
          // List view doesn't call dayRender, so we need to use this
          if (view.type !== "listWeek") return;

          el.querySelectorAll(".fc-list-heading").forEach((dateHeading) => {
            const dateString = dateHeading.dataset.date;
            const totalMins = minutesByDate[dateString] || 0;

            // Set bg color based on if worked over preferred work time
            if (totalMins >= preferredWorkTime)
              dateHeading.classList.add("bg-success");
            else dateHeading.classList.add("bg-danger");
          });

          return el;
        }}
      />
    </div>
  );
}

export default Calendar;
