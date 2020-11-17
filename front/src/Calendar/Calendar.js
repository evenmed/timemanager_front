import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import momentPlugin from "@fullcalendar/moment";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { useQuery, gql } from "@apollo/client";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import Error from "../helpers/Error";
import parseEvents from "../../lib/parseEvents";
import dateObjectToString from "../../lib/dateObjectToString";
import minutesToHours from "../../lib/minutesToHours";

const EVENTS_QUERY = gql`
  query events($user: ID) {
    events(user: $user) {
      _id
      date
      time
      title
      notes
    }
  }
`;

const preferredWorkTime = 480; // minutes (8 hours)

function Calendar() {
  const { loading, error, data } = useQuery(EVENTS_QUERY);

  if (loading) return <p>Loading events...</p>;
  if (error) return <Error error={error} />;

  const [events, minutesByDate] = parseEvents(data ? data.events : undefined);

  return (
    <div className="col-12">
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
        editable={false}
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
