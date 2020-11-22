import React from "react";
import PropTypes from "prop-types";

const CalendarBgStyles = ({ minutesByDate, preferredWorkTime }) => {
  // This is so ugly that every keystroke hurts my heart
  // However, given fullcalendar's nature, it's the cleanest way to do it
  return (
    <style>
      {Object.keys(minutesByDate).map((date) => {
        // Make dates were time > pwt green
        if (minutesByDate[date] >= preferredWorkTime)
          return `.fc [data-date="${date}"] {background: var(--bgGreen)}`;

        return ``;
      })}
      @media print {"{"}
      {Object.keys(minutesByDate).map((date) => {
        // Use solid green on print
        if (minutesByDate[date] >= preferredWorkTime)
          return `.fc [data-date="${date}"] {background: var(--green)}`;

        return ``;
      })}
      {"}"}
    </style>
  );
};

CalendarBgStyles.propTypes = {
  /** Object of total minutes worked by date */
  minutesByDate: PropTypes.object.isRequired,
  /** Daily work goal in minutes */
  preferredWorkTime: PropTypes.number.isRequired,
};

export default CalendarBgStyles;
