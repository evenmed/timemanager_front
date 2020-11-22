import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import PrintHeader from "./PrintHeader";
import dateObjectToString from "../../lib/dateObjectToString";

const CalendarHeader = ({ calendarApi, title, setListStart, setListEnd }) => {
  // Dont' render header until calendar is ready
  if (!calendarApi) return null;

  const updateView = ({ target }) => {
    calendarApi.changeView(target.value);
  };

  // Buttons nav for week / month views
  const datesNavButtons = (
    <>
      <div className="col-sm-4 text-left">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            onClick={() => calendarApi.prev()}
            type="button"
            className="btn btn-secondary"
          >
            <i className="fa fa-chevron-left"></i>
          </button>
          <button
            onClick={() => calendarApi.today()}
            className="btn btn-secondary"
          >
            Today
          </button>
          <button
            onClick={() => calendarApi.next()}
            type="button"
            className="btn btn-secondary"
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="col-sm-4 text-center">
        <h2>{title}</h2>
      </div>
    </>
  );

  const startDate = calendarApi.view.activeStart;
  // End date is exclusive, substract 1 day for displayed date
  const endDate = new Date(calendarApi.view.activeEnd);
  endDate.setDate(calendarApi.view.activeEnd.getDate() - 1);

  // Range nav for list view
  const datesNavRange = (
    <div className="col-sm-8 text-left">
      <div className="form-inline">
        <label className="mr-1" htmlFor="dateFrom">
          From:{" "}
        </label>
        <DatePicker
          id="dateFrom"
          className="form-control btn-secondary"
          dateFormat="MMMM d, yyyy"
          autoComplete="off"
          selected={new Date(dateObjectToString(startDate, true))}
          onChange={(date) => {
            if (date.getUTCDate() < endDate.getUTCDate()) setListStart(date);
          }}
        />
        <label className="mr-1 ml-2" htmlFor="dateTo">
          To:{" "}
        </label>
        <DatePicker
          id="dateTo"
          className="form-control btn-secondary"
          dateFormat="MMMM d, yyyy"
          autoComplete="off"
          selected={new Date(dateObjectToString(endDate, true))}
          onChange={(date) => {
            if (date.getUTCDate() > startDate.getUTCDate()) setListEnd(date);
          }}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="row fc-toolbar mb-3 print-hide">
        {calendarApi.view.type === "list" ? datesNavRange : datesNavButtons}
        <div className="col-sm-4">
          <div className="form-inline">
            <select
              onChange={updateView}
              value={calendarApi.view.type}
              className="form-control ml-auto btn-secondary"
            >
              <option value="timeGridWeek">Week</option>
              <option value="dayGridMonth">Month</option>
              <option value="list">List</option>
            </select>
          </div>
        </div>
      </div>
      <div className="print-show">
        <PrintHeader />
      </div>
    </>
  );
};

CalendarHeader.propTypes = {
  /** FullCallendar object */
  calendarApi: PropTypes.object,
};

export default CalendarHeader;
