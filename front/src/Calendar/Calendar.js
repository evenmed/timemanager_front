import React, { useContext, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import momentPlugin from "@fullcalendar/moment";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { useQuery } from "@apollo/client";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

import CalendarBgStyles from "./CalendarBgStyles";
import CalendarHeader from "./CalendarHeader";
import Error from "../helpers/Error";
import Loading from "../helpers/Loading";
import parseEvents from "../../lib/parseEvents";
import dateObjectToString from "../../lib/dateObjectToString";
import minutesToHours from "../../lib/minutesToHours";
import EditEventModal from "../Modals/EditEventModal";
import { UserContext } from "../User/User";
// We load this query from another file bc Calendar is dynamically rendered
// and the query needs to be imported by more components
import EVENTS_QUERY from "./EventsQuery";

function Calendar() {
  const { _id, preferredWorkTime } = useContext(UserContext); // minutes (8 hours)
  const { loading, error, data } = useQuery(EVENTS_QUERY, {
    variables: {
      user: _id,
    },
  });

  const today = new Date();
  const threeDaysAgo = new Date(today).setDate(today.getDate() - 3);
  const inThreeDays = new Date(today).setDate(today.getDate() + 3);

  // Range of dates to display on list view
  const [listStart, setListStart] = useState(new Date(threeDaysAgo));
  const [listEnd, setListEnd] = useState(new Date(inThreeDays));

  // Calendar ref to control it with our custom header
  // We use a callback to toggle a re-render on ref change
  const [calendarRef, setCalendarRef] = useState(null);
  const onRefChange = useCallback((node) => {
    setCalendarRef(node);
  });

  // We use the datesRender callback to manually toggle a re-render
  // of our custom header whenever the displayed dates change
  const [datesTitle, setDatesTitle] = useState("");
  const onDatesChange = useCallback(({ view }) => {
    setDatesTitle(view.title);
  });

  if (loading || typeof window === "undefined") return <Loading />;
  if (error) return <Error error={error} />;

  const [events, minutesByDate] = parseEvents(data ? data.events : undefined);

  return (
    <div className="col-12">
      {/* Inline style to set rows / days background color */}
      <CalendarBgStyles
        minutesByDate={minutesByDate}
        preferredWorkTime={preferredWorkTime}
      />

      <CalendarHeader
        calendarApi={calendarRef ? calendarRef.getApi() : null}
        title={datesTitle}
        setListStart={setListStart}
        setListEnd={setListEnd}
      />

      <EditEventModal>
        {(showModal) => (
          <FullCalendar
            ref={onRefChange}
            defaultView="list"
            visibleRange={{ start: listStart, end: listEnd }}
            header={false}
            plugins={[
              dayGridPlugin,
              listPlugin,
              bootstrapPlugin,
              timeGridPlugin,
              momentPlugin,
            ]}
            eventClick={({ event }) => {
              showModal(event.id);
            }}
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
            datesRender={onDatesChange}
          />
        )}
      </EditEventModal>
    </div>
  );
}

export default Calendar;
