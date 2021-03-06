import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import PrintHeader from "./PrintHeader";
import dateObjectToString from "../../lib/dateObjectToString";
import AddEntryModal from "../Modals/AddEntryModal";
import ExportEventsModal from "../Modals/ExportEventsModal";

/**
 * Dynamic calendar header that changes based on the current
 * calendar view.
 * Controls the date range for the list view via the functions
 * passed through the `setListStart`  and `setListEnd` props.
 */
const CalendarHeader = ({
  calendarApi,
  updateProp,
  setListStart,
  setListEnd,
}) => {
  // Dont' render header until calendar is ready
  if (!calendarApi) return null;

  const updateView = (view) => {
    calendarApi.changeView(view);
  };

  const startDate = calendarApi.view.activeStart;
  // End date is exclusive, substract 1 day for displayed date
  const endDate = new Date(calendarApi.view.activeEnd);
  endDate.setDate(calendarApi.view.activeEnd.getDate() - 1);

  const maybeSetStartDate = (date) => {
    if (date.getUTCDate() < endDate.getUTCDate()) {
      setListStart(date);
      return true;
    }
    return false;
  };
  const maybeSetEndDate = (date) => {
    if (date.getUTCDate() > startDate.getUTCDate()) {
      setListEnd(date);
      return true;
    }
    return false;
  };

  // Buttons nav for week / month views
  const datesNavButtons = (
    <>
      <div className="col col-sm-4 text-left order-2 order-sm-1">
        <div className="btn-group " role="group" aria-label="Basic example">
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
      <div className="col-12 col-sm-4 text-center order-1 order-sm-2 mb-2 mb-sm-0">
        <h2>{calendarApi.view.title}</h2>
      </div>
    </>
  );

  // Range nav for list view
  const datesNavRange = (
    <div className="col col-sm-8 text-left justify-content-start order-1">
      <div className="form-inline">
        <div className="form-group text-nowrap mb-2 mr-1">
          <label className="mr-1" htmlFor="dateFrom">
            From:{" "}
          </label>
          <DatePicker
            id="dateFrom"
            className="form-control btn-secondary"
            dateFormat="MMMM d, yyyy"
            autoComplete="off"
            selected={new Date(dateObjectToString(startDate, true))}
            onChange={maybeSetStartDate}
          />
        </div>
        <div className="form-group text-nowrap mb-2">
          <label className="mr-1" htmlFor="dateTo">
            To:{" "}
          </label>
          <DatePicker
            id="dateTo"
            className="form-control btn-secondary"
            dateFormat="MMMM d, yyyy"
            autoComplete="off"
            selected={new Date(dateObjectToString(endDate, true))}
            onChange={maybeSetEndDate}
          />
        </div>
      </div>
    </div>
  );

  const exportEvents = (from, to) => {
    if (from.getUTCDate() < to.getUTCDate()) {
      updateView("list");
      setListStart(from);
      setListEnd(to);
      window.print();
    }
  };

  return (
    <>
      <div
        data-super-important-prop={updateProp}
        className="mb-3 row justify-content-between print-hide"
      >
        <div className="col-auto">
          <ExportEventsModal exportEvents={exportEvents} />
        </div>
        <div className="col-auto">
          <AddEntryModal onSubmit={() => calendarApi.render()} />
        </div>
      </div>
      <div className="row fc-toolbar mb-3 print-hide justify-content-end">
        {calendarApi.view.type === "list" ? datesNavRange : datesNavButtons}
        <div className="col-auto col-sm-4 order-3">
          <div className="form-inline">
            <select
              onChange={({ target }) => updateView(target.value)}
              value={calendarApi.view.type}
              className="form-control ml-auto btn-secondary"
            >
              <option value="list">List</option>
              <option value="timeGridWeek">Week</option>
              <option value="dayGridMonth">Month</option>
            </select>
          </div>
        </div>
      </div>
      <div className="print-show">
        <PrintHeader startDate={startDate} endDate={endDate} />
      </div>
    </>
  );
};

CalendarHeader.propTypes = {
  /** FullCallendar object */
  calendarApi: PropTypes.object,
  /** prop to manually toggle a re-render of the hedader */
  updateProp: PropTypes.number.isRequired,
  /** Function to set the "from" date for the list view */
  setListStart: PropTypes.func.isRequired,
  /** Function to set the "to" date for the list view */
  setListEnd: PropTypes.func.isRequired,
};

export default CalendarHeader;
