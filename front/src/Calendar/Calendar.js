import React, { useContext } from "react";
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

import CalendarBgStyles from "./CalendarBgStyles";
import Error from "../helpers/Error";
import Loading from "../helpers/Loading";
import parseEvents from "../../lib/parseEvents";
import dateObjectToString from "../../lib/dateObjectToString";
import minutesToHours from "../../lib/minutesToHours";
import EditEventModal from "../Modals/EditEventModal";
import { UserContext } from "../User/User";

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

function Calendar() {
  const { _id, preferredWorkTime } = useContext(UserContext); // minutes (8 hours)
  const { loading, error, data } = useQuery(EVENTS_QUERY, {
    variables: {
      user: _id,
    },
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const [events, minutesByDate] = parseEvents(data ? data.events : undefined);

  return (
    <div className="col-12">
      {/* Inline style to set rows / days background color */}
      <CalendarBgStyles
        minutesByDate={minutesByDate}
        preferredWorkTime={preferredWorkTime}
      />

      <EditEventModal>
        {(showModal) => (
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
          />
        )}
      </EditEventModal>
    </div>
  );
}

export default Calendar;
