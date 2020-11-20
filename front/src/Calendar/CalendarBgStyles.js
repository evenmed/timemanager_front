import React from "react";
import PropTypes from "prop-types";

const CalendarBgStyles = ({ minutesByDate, preferredWorkTime }) => {
  // This is so ugly that every keystroke hurts my heart
  // However, given fullcalendar's nature, it's the cleanest way to do it
  return (
    <style>
      {/* Give all dates a red bg by default */}
      [data-date] {"{"}background: var(--bgRed);{"}"}
      {Object.keys(minutesByDate).map((date) => {
        // Make dates were time > pwt green
        if (minutesByDate[date] >= preferredWorkTime)
          return `[data-date="${date}"] {background: var(--bgGreen)}`;

        return ``;
      })}
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
