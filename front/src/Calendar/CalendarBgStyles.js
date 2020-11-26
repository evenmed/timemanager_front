import React from "react";
import PropTypes from "prop-types";

/**
 * Inline styles to give each date the right background color (red / green)
 * based on whether the user worked over the preferredWorkTime or not.
 */
const CalendarBgStyles = ({ minutesByDate, preferredWorkTime }) => {
  /**
   * This is so ugly that every keystroke hurts my heart
   * However, given fullcalendar's nature, it's the cleanest way to do it
   * (Otherwise, we'd have to call a bunch of callbacks everytime the
   * calendar is re-rendered).
   */
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
